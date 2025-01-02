import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },

  },
  {
    name: 'Mi perfil',
    url: '/perfil/miPerfil',
    iconComponent: { name: 'cil-user' }
  },

  {
    name: 'Finanzas',
    url: '/finanzas/cargaDeDatos',
    iconComponent: { name: 'cil-calculator' }
  },

  {
    name: 'Insiders',
    url: '/insider/insider-list',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Políticos',
    url: '/politician/politician-list',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Fondos de inversion',
    url: '/founds/founds-list/',
    iconComponent: { name: 'cil-description' }
  },

];
