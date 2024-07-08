function createChart(canvas){}
var areaChartData = {
  labels  : ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
  datasets: [
    {
      label               : 'Masa grasa',
      backgroundColor     : 'rgba(63,134,203,1)',
      borderColor         : 'rgba(63,134,203,1)',
      data                : [38, 37.6, 34.4, 32.8, 29.3, 55, 40],
      order               : 2,
    },
    {
      label               : 'Circ cintura',
      backgroundColor     : '#a6bcdf',
      borderColor         : '#a6bcdf',
      data                : [0, 121, 40, 43, 32, 27, 90],
      order               : 1,
    },
    {
      label               : 'Circ cintura',
      backgroundColor     : '#a6bcdf',
      borderColor         : 'rgba(33,104,163,1)',
      data                : [0, 121, 40, 43, 32, 27, 90],
      type                : 'line',
      order               : 0,
    },
  ],
};
var barChartCanvas =canvas.getContext('2d');


var barChart = new Chart(barChartCanvas, {
  type: 'bar',
  data: areaChartData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  }
});

agregar.addEventListener("click", (e) => {
  /* Solo agregamos una única vez la nueva serie */
  e.target.disabled = "disabled";
  /* Agregamos la nueva serie a los datasets previos */
  barChart.data.datasets.push({
    label               : 'Masa grasa',
    backgroundColor     : 'rgba(63,134,203,1)',
    borderColor         : 'rgba(63,134,203,1)',
    data                : [38, 37.6, 34.4, 32.8, 29.3, 55, 40],
    type                : 'line',
  });
  /* Actualizamos la gráfica */
  barChart.update();
});
