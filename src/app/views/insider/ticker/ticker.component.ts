import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TickerService } from '../ticker/service/ticker.service';
import { PagesModule } from '../../pages/pages.module';
import { IconDirective } from '@coreui/icons-angular';
import { cilCash, cilUser, cilClipboard } from '@coreui/icons';
import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import Chart from 'chart.js/auto';
import { Subject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  standalone: true,
  imports: [PagesModule, RowComponent, ColComponent, WidgetStatFComponent, TemplateIdDirective, IconDirective],
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements OnInit, AfterViewInit, OnDestroy {
  ticker = '';
  insiders: any[] = [];
  icons = { cilCash, cilUser, cilClipboard };
  totalValue = 0;
  interesados = 0;
  accionesCompradas = 0;
  displayedColumns: string[] = ['operador', 'activo', 'cantidad', 'value', 'movimiento', 'tipo', 'fecha'];
  loading = false;

  @ViewChild('buySellChart') buySellChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('amountChart') amountChartRef!: ElementRef<HTMLCanvasElement>;

  private buySellChart: Chart | null = null;
  private amountChart: Chart | null = null;
  private pendingCounts: { buy: number; sell: number } | null = null;
  private pendingAmounts: { buyAmount: number; sellAmount: number } | null = null;
  private viewInitialized = false;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private service: TickerService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(pm => (pm.get('ticker') || '').toUpperCase()),
        distinctUntilChanged(),
        debounceTime(50),
        takeUntil(this.destroy$),
        switchMap(ticker => {
          // limpiar UI inmediatamente para evitar mostrar datos antiguos
          this.ticker = ticker;
          this.resetearDatos();
          this.insiders = [];                       // vaciar tabla
          this.updateOrCreateBuySellChart(0, 0);    // poner charts en 0 mientras carga
          this.updateOrCreateAmountChart(0, 0);
          this.loading = true;                      // mostrar spinner/skeleton si quieres
          return this.service.getData(ticker);
        })
      )
      .subscribe({
        next: response => {
          this.loading = false;
          const items = Array.isArray(response.data) ? response.data : [];
          console.debug('raw response.data sample', items.slice(0, 5));

          // procesar datos (misma lógica que tenías en obtenerDatosTkt)
          let buyCount = 0;
          let sellCount = 0;
          let buyAmount = 0;
          let sellAmount = 0;

          items.forEach((item: any) => {
            this.interesados++;
            if (item.cantidad) {
              this.accionesCompradas += parseInt(String(item.cantidad).replace(/,/g, '')) || 0;
            }

            let rawMove = '';
            if (typeof item === 'string') rawMove = item;
            else if (item?.movimiento) rawMove = typeof item.movimiento === 'string' ? item.movimiento : (item.movimiento?.nombre ?? '');
            else if (item?.movement) rawMove = typeof item.movement === 'string' ? item.movement : (item.movement?.name ?? '');
            rawMove = (rawMove ?? '').toString().toLowerCase().trim();

            const qty = Number(String(item.cantidad ?? 0).replace(/[,]/g, '')) || 0;
            let unit = 0;
            try {
              const rawVal = (item.value ?? item.monto ?? '').toString();
              const cleaned = rawVal.replace(/[^0-9\.,\-]/g, '').replace(/\.(?=.*\.)/g, '').replace(/,/g, '');
              unit = Number(cleaned) || 0;
            } catch {
              unit = Number(item.value) || 0;
            }

            const amount = qty && unit ? Math.abs(qty * unit) : Math.abs(unit || 0);

            if (rawMove.includes('buy') || rawMove.includes('compra')) {
              buyCount++; buyAmount += amount;
            } else if (rawMove.includes('sell') || rawMove.includes('venta')) {
              sellCount++; sellAmount += amount;
            } else {
              if (rawMove.startsWith('c')) { buyCount++; buyAmount += amount; }
              else if (rawMove.startsWith('v') || rawMove.startsWith('s')) { sellCount++; sellAmount += amount; }
              else { if (unit < 0) { sellCount++; sellAmount += amount; } else { buyCount++; buyAmount += amount; } }
            }
          });

          // actualizar UI / charts / tabla
          this.totalValue = Number.isFinite(buyAmount) ? buyAmount : Number(buyAmount) || 0;
          this.insiders = items.map((item: any) => ({
            operador: { nombre: item.operador, tipo: 'texto' },
            activo: { nombre: item.activo, tipo: 'texto' },
            cantidad: { nombre: item.cantidad, tipo: 'texto' },
            value: { nombre: item.value, tipo: 'texto' },
            movimiento: { nombre: item.movimiento, tipo: 'texto' },
            tipo: { nombre: item.tipo_investor, tipo: 'texto' },
            fecha: { nombre: item.fecha, tipo: 'texto' }
          }));

          console.debug('counts/amounts', { buyCount, sellCount, buyAmount, sellAmount });
          this.updateOrCreateBuySellChart(buyCount, sellCount);
          this.updateOrCreateAmountChart(buyAmount, sellAmount);
        },
        error: err => {
          this.loading = false;
          console.error('Error fetching data:', err);
        }
      });
  }

  ngAfterViewInit(): void {
    try {
      const ctx = this.buySellChartRef?.nativeElement?.getContext('2d') ?? null;
      const ctxAmount = this.amountChartRef?.nativeElement?.getContext('2d') ?? null;

      if (ctx && !this.buySellChart) {
        this.buySellChart = new Chart(ctx, {
          type: 'bar',
          data: { labels: ['Compras', 'Ventas'], datasets: [{ label: 'Cantidad de operaciones', data: [0, 0], backgroundColor: ['#0d6efd', '#dc3545'], borderColor: ['#0b5ed7', '#bb2d3b'], borderWidth: 1 }] },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }, plugins: { legend: { display: false } } }
        });
      } else if (!ctx) {
        console.warn('ngAfterViewInit: buySell canvas context not available yet');
      }

      if (ctxAmount && !this.amountChart) {
        this.amountChart = new Chart(ctxAmount, {
          type: 'bar',
          data: { labels: ['Monto comprado', 'Monto vendido'], datasets: [{ label: 'Monto (moneda local)', data: [0, 0], backgroundColor: ['#198754', '#ffc107'], borderColor: ['#146c43', '#cc9a06'], borderWidth: 1 }] },
          options: {
            responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => { const v = Number((ctx as any).raw || 0); return v.toLocaleString(); } } } }
          }
        });
      } else if (!ctxAmount) {
        console.warn('ngAfterViewInit: amount canvas context not available yet');
      }

      this.viewInitialized = true;

      if (this.pendingCounts) {
        const { buy, sell } = this.pendingCounts;
        this.pendingCounts = null;
        this.updateOrCreateBuySellChart(buy, sell);
      }
      if (this.pendingAmounts) {
        const { buyAmount, sellAmount } = this.pendingAmounts;
        this.pendingAmounts = null;
        this.updateOrCreateAmountChart(buyAmount, sellAmount);
      }
    } catch (e) {
      console.error('Error building initial charts', e);
    }
  }

  // Nota: la petición trae los datos. Se suma aquí compra/venta y monto total comprado/vendido
  obtenerDatosTkt(): void {
    this.resetearDatos();
    const param = this.route.snapshot.paramMap.get('ticker');
    if (param) this.ticker = param.toUpperCase();

    this.service.getData(this.ticker).subscribe(
      response => {
        const items = Array.isArray(response.data) ? response.data : [];
        console.debug('raw response.data sample', items.slice(0, 5));

        // reset counters localmente
        let buyCount = 0;
        let sellCount = 0;
        let buyAmount = 0;
        let sellAmount = 0;

        // tambien actualizar métricas generales (accionesCompradas, interesados)
        items.forEach((item: any) => {
          // interesados y acciones compradas (mantener comportamiento previo)
          this.interesados++;
          if (item.cantidad) {
            this.accionesCompradas += parseInt(String(item.cantidad).replace(/,/g, '')) || 0;
          }

          // extraer movimiento
          const rawMove = this.normalizeMovement(item);

          // cantidad y unitario/monto
          const qty = this.parseQuantity(item.cantidad);
          const unit = this.parseValueNumber(item.value ?? item.monto);

          const amount = qty && unit ? Math.abs(qty * unit) : Math.abs(unit || 0);

          // sumar según movimiento
          if (rawMove === 'COMPRA') {
            buyCount++; buyAmount += amount;
          } else if (rawMove === 'VENTA') {
            sellCount++; sellAmount += amount;
          } else {
            // heurística
            if (String(item.movimiento ?? '').toLowerCase().startsWith('c')) {
              buyCount++; buyAmount += amount;
            } else if (String(item.movimiento ?? '').toLowerCase().startsWith('v') || String(item.movimiento ?? '').toLowerCase().startsWith('s')) {
              sellCount++; sellAmount += amount;
            } else {
              if (unit < 0) { sellCount++; sellAmount += amount; }
              else { buyCount++; buyAmount += amount; }
            }
          }
        });

        // totalValue ahora muestra únicamente el dinero total comprado
        this.totalValue = Number.isFinite(buyAmount) ? buyAmount : Number(buyAmount) || 0;

        // actualizar tabla (mapeo) — normalizamos los campos
        const nf = new Intl.NumberFormat('en-US');
        this.insiders = items.map((item: any) => {
          const qtyRaw = this.parseQuantity(item.cantidad);
          const valueRaw = this.parseValueNumber(item.value ?? item.monto);
          const move = this.normalizeMovement(item).toUpperCase(); // FORZAR UPPERCASE
          const tipoNorm = this.normalizeTipo(item.tipo_investor ?? item.tipo);
          const dateFormatted = this.formatDateString(item.fecha);
          const nf = new Intl.NumberFormat('en-US');

          return {
            operador: { nombre: String(item.operador ?? '').trim(), tipo: 'texto' },
            activo: { nombre: String(item.activo ?? '').trim(), tipo: 'texto' },
            cantidad: { nombre: qtyRaw > 0 ? nf.format(qtyRaw) : '0', tipo: 'texto', cantidad_raw: qtyRaw },
            // Mostrar siempre sin símbolo y sin signo (valor absoluto formateado)
            value: { nombre: nf.format(Math.abs(valueRaw)), tipo: 'texto', value_raw: valueRaw },
            // agrego propiedad class para facilitar el styling desde el renderer de la tabla
            movimiento: { nombre: move, tipo: 'texto', movimiento_raw: String(item.movimiento ?? item.movement ?? ''), class: move === 'VENTA' ? 'movimiento-venta' : (move === 'COMPRA' ? 'movimiento-compra' : '') },
            tipo: { nombre: tipoNorm, tipo: 'texto' },
            fecha: { nombre: dateFormatted, tipo: 'texto', fecha_raw: item.fecha }
          };
        });

        console.debug('obtenerDatosTkt counts/amounts', { buyCount, sellCount, buyAmount, sellAmount });

        // actualizar/crear charts con los totales calculados
        this.updateOrCreateBuySellChart(buyCount, sellCount);
        this.updateOrCreateAmountChart(buyAmount, sellAmount);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  updatedData(_: any): void {
    // opcional: mantener si hay otras transformaciones; ahora el conteo/montos se hace en obtenerDatosTkt
  }

  resetearDatos(): void {
    this.totalValue = 0;
    this.interesados = 0;
    this.accionesCompradas = 0;
  }

  private updateOrCreateBuySellChart(buyCount: number, sellCount: number): void {
    buyCount = Number.isFinite(buyCount) ? buyCount : Number(buyCount) || 0;
    sellCount = Number.isFinite(sellCount) ? sellCount : Number(sellCount) || 0;

    try {
      const ctxAvailable = !!this.buySellChartRef?.nativeElement?.getContext;
      const ctx = ctxAvailable ? this.buySellChartRef.nativeElement.getContext('2d') : null;
      if (!ctx) {
        this.pendingCounts = { buy: buyCount, sell: sellCount };
        return;
      }

      if (this.buySellChart) {
        const ds = this.buySellChart.data.datasets?.[0];
        if (ds) ds.data = [buyCount, sellCount] as any;
        else {
          this.buySellChart.data = { labels: ['Compras', 'Ventas'], datasets: [{ label: 'Cantidad de operaciones', data: [buyCount, sellCount], backgroundColor: ['#0d6efd', '#dc3545'], borderColor: ['#0b5ed7', '#bb2d3b'], borderWidth: 1 }] };
        }
        this.buySellChart.update();
        return;
      }

      this.buySellChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: ['Compras', 'Ventas'], datasets: [{ label: 'Cantidad de operaciones', data: [buyCount, sellCount], backgroundColor: ['#0d6efd', '#dc3545'], borderColor: ['#0b5ed7', '#bb2d3b'], borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }, plugins: { legend: { display: false } } }
      });
    } catch (e) {
      console.error('Error updating/creating chart', e);
    }
  }

  private updateOrCreateAmountChart(buyAmount: number, sellAmount: number): void {
    buyAmount = Number(buyAmount) || 0;
    sellAmount = Number(sellAmount) || 0;

    try {
      const ctxAvailable = !!this.amountChartRef?.nativeElement?.getContext;
      const ctx = ctxAvailable ? this.amountChartRef.nativeElement.getContext('2d') : null;
      if (!ctx) {
        this.pendingAmounts = { buyAmount, sellAmount };
        return;
      }

      if (this.amountChart) {
        const ds = this.amountChart.data.datasets?.[0];
        if (ds) ds.data = [buyAmount, sellAmount] as any;
        else {
          this.amountChart.data = { labels: ['Monto comprado', 'Monto vendido'], datasets: [{ label: 'Monto', data: [buyAmount, sellAmount], backgroundColor: ['#198754', '#ffc107'], borderColor: ['#146c43', '#cc9a06'], borderWidth: 1 }] };
        }
        this.amountChart.update();
        return;
      }

      this.amountChart = new Chart(ctx, {
        type: 'bar',
        data: { labels: ['Monto comprado', 'Monto vendido'], datasets: [{ label: 'Monto (moneda local)', data: [buyAmount, sellAmount], backgroundColor: ['#198754', '#ffc107'], borderColor: ['#146c43', '#cc9a06'], borderWidth: 1 }] },
        options: {
          responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } },
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => { const v = Number((ctx as any).raw || 0); return v.toLocaleString(); } } } }
        }
      });
    } catch (e) {
      console.error('Error updating/creating amount chart', e);
    }
  }

  ngOnDestroy(): void {
    // cancelar suscripciones reactivas
    this.destroy$.next();
    this.destroy$.complete();
    if (this.buySellChart) { this.buySellChart.destroy(); this.buySellChart = null; }
    if (this.amountChart) { this.amountChart.destroy(); this.amountChart = null; }
  }

  // ... add these helper methods inside the same class ...
  private parseQuantity(q: any): number {
    try {
      if (q == null) return 0;
      const s = String(q).replace(/[^\d\-]/g, ''); // keep digits and minus
      return Number(s) || 0;
    } catch {
      return 0;
    }
  }

  private parseValueNumber(v: any): number {
    try {
      if (v == null) return 0;
      // examples: "-$1,670,688", "$1234", "1000", "-842"
      const s = String(v).replace(/[^\d\.\-]/g, ''); // keep digits, dot, minus
      // If more than one dot, remove all except last:
      const parts = s.split('.');
      const cleaned = parts.length > 1 ? parts.slice(0, -1).join('') + '.' + parts.slice(-1) : s;
      return Number(cleaned) || 0;
    } catch {
      return 0;
    }
  }

  private normalizeMovement(item: any): 'COMPRA' | 'VENTA' | 'OTRO' {
    const raw = (item?.movimiento ?? item?.movement ?? '').toString().toLowerCase().trim();
    if (!raw) return 'OTRO';
    if (raw.includes('buy') || raw.includes('compra')) return 'COMPRA';
    if (raw.includes('sell') || raw.includes('venta')) return 'VENTA';
    if (raw.startsWith('c')) return 'COMPRA';
    if (raw.startsWith('v') || raw.startsWith('s')) return 'VENTA';
    return 'OTRO';
  }

  private normalizeTipo(t: any): string {
    if (!t) return '';
    const s = String(t).toLowerCase().trim();
    if (s.includes('polit')) return 'politician';
    if (s.includes('fund')) return 'fund';
    if (s.includes('insider')) return 'insider';
    return s;
  }

  private formatDateString(d: any): string {
    try {
      if (!d) return '';
      const date = new Date(String(d));
      if (isNaN(date.getTime())) {
        // try parsing 'YYYY-MM-DD HH:mm:ss' already — return as-is trimmed
        return String(d).trim();
      }
      const y = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const mi = String(date.getMinutes()).padStart(2, '0');
      const ss = String(date.getSeconds()).padStart(2, '0');
      return `${y}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    } catch {
      return String(d).trim();
    }
  }
}
