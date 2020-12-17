import Chart from 'chart.js';
import { MONTHS, DATA_TIPE_FOR_PRINT, DATA_TIPE_COLORS } from '../constans/categories';

const graficLinePanel = document.querySelector('.grafic__line-panel');
const listOfDays = document.getElementById('list-of-days');

export default class Grafic {
  constructor(config, mood) {
    this.config = config;
    this.mood = mood;
    this.labels = null;
    this.datasets = null;

    this.name = null;
    this.color = null;
    this.type = 'bar';

    this.el = this.createChartTemplate();
  }

  init() {
    const changeTypeBox = document.querySelector('#line');
    if (changeTypeBox.checked) {
      this.type = 'line';
    } else {
      this.type = 'bar';
    }

    this.addDataToChart(this.config);

    const fontFamily = 'Montserrat, sans-serif';
    const fontSize = 12;
    const fontWeight = 400;
    const fontColor = 'black';

    const commonOptions = {
      titleFontFamily: fontFamily,
      titleFontSize: fontSize + 2,
      titleFontWeight: fontWeight,
    };

    this.chartConfig = {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        title: {
          display: true,
          text: this.name,
          fontColor,
          fontSize: 16,
        },
        legend: {
          labels: {
            fontColor,
            fontSize: 16,
          },
        },
        tooltips: {
          mode: 'nearest',
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Number of people',
              padding: 5,
              fontColor,
              fontSize: 16,
            },
            ticks: {
              beginAtZero: false,
              fontColor,
              fontSize: 16,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Dates',
              padding: 5,
              fontColor,
              fontSize: 16,
            },
            ticks: {
              fontColor,
              fontSize: 12,
              callback(value, index, values) {
                let date;
                const monthIndex = value.replace(/\/[0-9]*\/[0-9]*/, '');
                const month = MONTHS[monthIndex - 1];
                const day = value.replace(/[0-9]*\//, '').replace(/\/[0-9]*/, '');
                switch (listOfDays.value) {
                  case '366':
                    if (day === '1') {
                      date = month;
                    } else {
                      date = '';
                    }
                    break;
                  case '30':
                    if (day === '1') {
                      date = month;
                    } else {
                      date = day;
                    }
                    break;
                  default:
                    date = `${month} ${day}`;
                    break;
                }
                return date;
              },
            },
          }],
        },
        animation: {
          easing: 'easeInOutElastic',
          duration: 1200,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        showLines: true,
      },
    };

    this.el = this.el.getContext('2d');
    this.chart = new Chart(this.el, this.chartConfig);

    changeTypeBox.onclick = () => {
      this.changeTypeBox();
      this.chart.update();
    };

    // graficLinePanel.onclick = (e) => {
    //   if (e.target.closest('#cases-line')) {
    //     console.log('cases-line');
    //   } else if (e.target.closest('#deaths-line')) {
    //     console.log('deaths-line');
    //   } else {
    //     console.log('recovered-line');
    //   }
    // };
  }

  createChartTemplate() {
    const chartWrapper = document.createElement('canvas');
    chartWrapper.setAttribute('id', 'chart');
    chartWrapper.setAttribute('width', '200');
    chartWrapper.setAttribute('height', '70');
    return chartWrapper;
  }

  addDataToChart(config) {
    this.getName();
    this.getColor(this.mood);
    let obj;
    if (config[this.mood]) {
      obj = this.config[this.mood];
    } else {
      obj = this.config.timeline[this.mood];
    }
    this.labels = Object.keys(obj);
    const magnitudes = Object.values(obj);
    const newData = {
      label: DATA_TIPE_FOR_PRINT[this.mood],
      data: magnitudes,
      pointColor: `rgba(${this.color}, 1)`,
      pointStrokeColor: '#202b33',
      pointHighlightStroke: 'rgba(225,225,225,0.9)',
      backgroundColor: `rgba(${this.color}, 0.2)`,
      borderColor: `rgba(${this.color}, 0.7)`,
      borderWidth: 1,
      pointRadius: 2,
      pointStyle: 'circle',
    };
    this.datasets = [];
    this.datasets.push(newData);
  }

  getName() {
    if (this.config.country) {
      this.name = this.config.country;
    } else {
      this.name = 'All World';
    }
  }

  getColor(mood) {
    this.color = DATA_TIPE_COLORS[mood];
  }

  changeTypeBox() {
    if (this.type === 'line') {
      this.type = 'bar';
      graficLinePanel.classList.add('hidden');
    } else {
      this.type = 'line';
      graficLinePanel.classList.remove('hidden');
    }
    this.chartConfig.type = this.type;
  }
}
