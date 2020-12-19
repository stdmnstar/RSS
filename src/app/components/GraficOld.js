import Chart from 'chart.js';
import './char.plugin'
import { MONTHS, DATA_TIPE_FOR_PRINT, DATA_TIPE_COLORS_HEX, DATA_TIPE_ID, DATA_TIPE_CLASSES } from './const';
import { getCountPer100th } from './util';

const graficTemplate = document.querySelector('.grafic__template');

const chartsField = document.querySelector('#charts-field');

const graficLinePanel = document.querySelector('.grafic__line-panel');
const listOfDays = document.getElementById('list-of-days');

const fontFamily = 'Montserrat, sans-serif';
const fontSize = 14;
const fontWeight = 400;
const fontColor = 'black';

const commonOptions = {
  fontFamily,
  fontSize: fontSize - 2,
  fontWeight,
  fontColor,
};

export default class Grafic {
  constructor(config) {
    this.config = config;

    this.cases = config.cases;
    this.deaths = config.deaths;
    this.recovered = config.recovered;
    this.todayCases = config.todayCases;
    this.todayDeaths = config.todayDeaths;
    this.todayRecovered = config.todayRecovered;

    // params
    this.iso = null; // Name of Country
    this.labels = []; 
    this.data = [];
    this.dataSetIn = [];
    this.dataSetOut = [];
    this.datasets = [];

    // options
    this.type = 'doughnut';
    this.mood = 'cases';
    this.listOfData = [];
    this.activeLabel = '';
    this.labelsID = 0;

    // elements
    this.el = null;

    if (config.country) {
      this.iso = config.country;
    } else {
      this.iso = 'All World';
    }
  }

  test() {
    console.log(this.config)
  }

  initChartConfig(mood = 'cases') {
    switch(mood) {
      case 'cases':
        this.labelsID = 0;
        break;
      case 'deaths':
        this.labelsID = 0; 
        break;
      case 'recovered':
        this.labelsID = 0; 
        break;
      case 'todayCases':
        this.labelsID = 1; 
        break;
      case 'todayDeaths':
        this.labelsID = 1; 
        break;
      case 'todayRecovered':
        this.labelsID = 1; 
        break;
      case 'casesPer100th':
        this.labelsID = 2; 
        break;
      case 'deathsPer100th':
        this.labelsID = 2; 
        break;
      case 'recoveredPer100th':
        this.labelsID = 2; 
        break;
      case 'todayCasesPer100th':
        this.labelsID = 3; 
        break;
      case 'todayDeathsPer100th':
        this.labelsID = 3; 
        break;
      default:
        this.labelsID = 3; 
        break;
    };
    this.mood = mood;
    this.createChartLabels();
    this.initDatasets();
    this.initChartDatasets();
    this.createDataSetIn();
    this.createDataSetOut();
    this.createChartDatasets();
    this.createChartConfig();

    this.createChartTemplate();
    graficTemplate.innerHTML = '&nbsp;';
    graficTemplate.append(this.chartField);

    var ctx = document.querySelector('#charts-field').getContext("2d");
    this.chart = new Chart(ctx, this.chartConfig);
    this.chart;
  }

  createChartLabels() {
    this.activeLabel = DATA_TIPE_FOR_PRINT[this.mood];
    this.labelsKeys = DATA_TIPE_CLASSES[this.labelsID];
    this.labels = this.labelsKeys.map((el) => DATA_TIPE_FOR_PRINT[el]);
  }

  initDatasets() {
    if (this.labelsID === 0 || this.labelsID === 1) {
      this.labelsValues = this.labelsKeys.map((el) => this.config[el]);
    } else {
      let keysValue = this.labelsKeys.map((el) => el.replace('Per100th', ''))
      this.labelsValues = keysValue.map((el) => this.config[el]);
    }
    this.listOfData = this.labelsValues;

  }

  initChartDatasets() {
    if (this.labelsID === 0 || this.labelsID === 1) {
      this.data = this.listOfData;
    } else {
      this.data = this.listOfData.map((el) => getCountPer100th(el, this.config.population))
    }
    this.activeNumber = this.data[this.labelsKeys.indexOf(this.mood)]
  }

  createDataSetIn() {
    let backgroundIn = this.labelsKeys.map((el) => DATA_TIPE_COLORS_HEX[el])
    this.dataSetIn = {
      data: this.data,
      backgroundColor: backgroundIn,
    }
  }

  createDataSetOut() {
    let background = this.labelsKeys.map((el) => DATA_TIPE_COLORS_HEX[el]);
    let activeColor = background[this.labelsKeys.indexOf(this.mood)]
    let backgroundOut = background.map((el) => el !== activeColor ? DATA_TIPE_COLORS_HEX.deafult : el);
    this.dataSetOut = {
      data: this.data,
      backgroundColor: backgroundOut,
    }
  }

  createChartDatasets() {
    if (this.type === 'doughnut') {
      this.datasets = this.listOfData;
    } else {
      console.log('anouther type')
    }
  }

  createChartConfig() {
    this.chartConfig = {
      type: 'doughnut',
      data: {
      labels: this.labels,
      datasets: [
        this.dataSetOut, 
      { 
        weight: 0.1
      },
      this.dataSetIn
      ]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: true,
        cutoutPercentage: 60,
        elements: {
          center: {
            text: `Common ${this.activeLabel} in ${this.iso} equals ${this.activeNumber}`,
            color: '#000', 
            fontStyle: 'Arial', 
            sidePadding: 20, 
            minFontSize: 25, 
            lineHeight: 25, 
          }
        }
      },
    }
  }

  createChartTemplate() {
    const chartWrapper = document.createElement('canvas');
    chartWrapper.setAttribute('id', 'charts-field');
    chartWrapper.setAttribute('width', '200');
    chartWrapper.setAttribute('height', '100');
    this.chartField = chartWrapper;
  }
}



// export default class GraficOld {
//   constructor(config, mood) {
//     this.config = config;
//     this.mood = mood;
//     this.labels = null;
//     this.datasets = null;

//     this.name = null;
//     this.color = null;
//     this.type = 'bar';

//     this.el = this.createChartTemplate();
//   }

//   init() {
//     if (changeTypeBox.checked) {
//       this.type = 'line';
//     } else {
//       this.type = 'bar';
//     }

//     this.addDataToChart(this.config);

//     const fontFamily = 'Montserrat, sans-serif';
//     const fontSize = 14;
//     const fontWeight = 400;
//     const fontColor = 'black';

//     const commonOptions = {
//       fontFamily,
//       fontSize: fontSize - 2,
//       fontWeight,
//       fontColor,
//     };

//     this.chartConfig = {
//       type: this.type,
//       data: {
//         labels: this.labels,
//         datasets: this.datasets,
//       },
//       options: {
//         title: {
//           display: true,
//           text: this.name,
//           fontColor,
//           fontSize,
//         },
//         legend: {
//           labels: {
//             fontColor,
//             fontSize,
//           },
//         },
//         tooltips: {
//           mode: 'nearest',
//         },
//         scales: {
//           yAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'Number of people',
//               padding: 5,
//               fontColor,
//               fontSize,
//             },
//             ticks: {
//               beginAtZero: false,
//               ...commonOptions,
//             },
//           }],
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'Dates',
//               padding: 5,
//               fontColor,
//               fontSize,
//             },
//             ticks: {
//               ...commonOptions,
//               callback(value) {
//                 let date;
//                 const monthIndex = value.replace(/\/[0-9]*\/[0-9]*/, '');
//                 const month = MONTHS[monthIndex - 1];
//                 const day = value.replace(/[0-9]*\//, '').replace(/\/[0-9]*/, '');
//                 switch (listOfDays.value) {
//                   case '366':
//                     if (day === '1') {
//                       date = month;
//                     } else {
//                       date = '';
//                     }
//                     break;
//                   case '30':
//                     if (day === '1') {
//                       date = month;
//                     } else {
//                       date = day;
//                     }
//                     break;
//                   default:
//                     date = `${month} ${day}`;
//                     break;
//                 }
//                 return date;
//               },
//             },
//           }],
//         },
//         animation: {
//           easing: 'easeInOutElastic',
//           duration: 1200,
//         },
//         layout: {
//           padding: {
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//           },
//         },
//         showLines: true,
//       },
//     };

//     this.el = this.el.getContext('2d');
//     this.chart = new Chart(this.el, this.chartConfig);

//     changeTypeBox.onclick = () => {
//       this.changeTypeBox();
//       this.chart.update();
//     };

//     graficLinePanel.onclick = (e) => {
//       if (e.target.closest('#cases-line')) {
//         console.log('cases-line');
//       } else if (e.target.closest('#deaths-line')) {
//         console.log('deaths-line');
//       } else {
//         console.log('recovered-line');
//       }
//     };
//   }

//   createChartTemplate() {
//     const chartWrapper = document.createElement('canvas');
//     chartWrapper.setAttribute('id', 'chart');
//     chartWrapper.setAttribute('width', '200');
//     chartWrapper.setAttribute('height', '100');
//     return chartWrapper;
//   }

//   addDataToChart(config) {
//     this.getName();
//     this.getColor(this.mood);
//     let obj;
//     if (config[this.mood]) {
//       obj = this.config[this.mood];
//     } else {
//       obj = this.config.timeline[this.mood];
//     }
//     this.labels = Object.keys(obj);
//     const magnitudes = Object.values(obj);
//     const newData = {
//       label: DATA_TIPE_FOR_PRINT[this.mood],
//       data: magnitudes,
//       pointColor: `rgba(${this.color}, 1)`,
//       pointStrokeColor: '#202b33',
//       pointHighlightStroke: 'rgba(225,225,225,0.9)',
//       backgroundColor: `rgba(${this.color}, 0.2)`,
//       borderColor: `rgba(${this.color}, 0.7)`,
//       borderWidth: 1,
//       pointRadius: 2,
//       pointStyle: 'circle',
//     };
//     this.datasets = [];
//     this.datasets.push(newData);
//   }

//   getName() {
//     if (this.config.country) {
//       this.name = this.config.country;
//     } else {
//       this.name = 'All World';
//     }
//   }

//   getColor(mood) {
//     this.color = DATA_TIPE_COLORS[mood];
//   }

//   changeTypeBox() {
//     if (this.type === 'line') {
//       this.type = 'bar';
//     } else {
//       this.type = 'line';
//     }
//     this.chartConfig.type = this.type;
//   }
// }