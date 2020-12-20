import Chart from 'chart.js';
import './char.plugin'
import { MONTHS, DATA_TIPE_FOR_PRINT, DATA_TIPE_COLORS_HEX, DATA_TIPE_COLORS_RGB, DATA_TIPE_ID, DATA_TIPE_CLASSES } from './const';
import { getCountPer100th } from './util';

const graficTemplate = document.querySelector('.grafic__template');

const chartsField = document.querySelector('#charts-field');

const graficLinePanel = document.querySelector('.grafic__line-panel');
const listOfDays = document.getElementById('list-of-days');
const changeTypeBox = document.querySelector('#line');

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

    // timeline
    this.timeline = [];

    this.timelineLabels = [];
    this.timelineDatatets = [];

    this.lineColor = '';

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
    this.datasets = this.listOfData;
    this.createChartConfig();
    this.addChart();
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

  createChartConfig() {
    this.chartConfig = {
      type: this.type,
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

  setPeriodData(data) {
    this.data = data;
    if (data.country) {
      this.timeline = data.timeline
    } else {
      this.timeline = data
    }
    this.type = 'line';
    this.createTimelineLabels();
    this.getLineColor();
    this.createTimelineDatasets();
    this.createLineConfig();
  }

  changeTypeOfChart() {
    if (this.type === 'doughnut') {
      this.type = 'line';
    } else {
      this.type = 'doughnut';
    }
  }

  createTimelineLabels() {
    if (this.mood === 'casesPer100th' || this.mood === 'deathsPer100th' || this.mood === 'recoveredPer100th') {
      this.timelineLabels = Object.keys(this.timeline[this.mood.replace('Per100th', '')]);
    } else {
      this.timelineLabels = Object.keys(this.timeline[this.mood]);
    }
  }

  getLineColor() {
    this.lineColor = DATA_TIPE_COLORS_RGB[this.mood];
  }

  createTimelineDatasets() {
    let magnitudes;
    if (this.mood === 'casesPer100th' || this.mood === 'deathsPer100th' || this.mood === 'recoveredPer100th') {
      magnitudes = Object.values(this.timeline[this.mood.replace('Per100th', '')]).map((el) => getCountPer100th(el, this.config.population));
    } else {
      magnitudes = Object.values(this.timeline[this.mood]);
    }

    const newData = {
        label: DATA_TIPE_FOR_PRINT[this.mood],
        data: magnitudes,
        pointColor: `rgba(${this.lineColor}, 1)`,
        pointStrokeColor: '#202b33',
        pointHighlightStroke: 'rgba(225,225,225,0.9)',
        backgroundColor: `rgba(${this.lineColor}, 0.2)`,
        borderColor: `rgba(${this.lineColor}, 0.7)`,
        borderWidth: 1,
        pointRadius: 2,
        pointStyle: 'circle',
      };
    this.timelineDatatets = [];
    this.timelineDatatets.push(newData);
  }

  createLineConfig() {
    this.chartConfig = {
      type: this.type,
      data: {
        labels: this.timelineLabels,
        datasets: this.timelineDatatets,
      },
      options: {
        title: {
          display: true,
          text: this.iso,
          fontColor,
          fontSize,
        },
        legend: {
          labels: {
            fontColor,
            fontSize,
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
              fontSize,
            },
            ticks: {
              beginAtZero: false,
              maxTicksLimit: listOfDays.value === '360' ? 12 : listOfDays.value === '180' ? 12 : listOfDays.value === '90' ? 8 : 7,
              ...commonOptions,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Dates',
              padding: 5,
              fontColor,
              fontSize,
            },
            ticks: {
              ...commonOptions,
              maxTicksLimit: listOfDays.value === '360' ? 11 : listOfDays.value === '180' ? 11 : listOfDays.value === '90' ? 22 : 22,
              callback(value) {
                let date;
                const monthIndex = value.replace(/\/[0-9]*\/[0-9]*/, '');
                const month = MONTHS[monthIndex - 1];
                const day = value.replace(/[0-9]*\//, '').replace(/\/[0-9]*/, '');
                switch (listOfDays.value) {
                  case '360':
                    if (day === '1') {
                      date = month;
                    } else {
                      date = month;
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
  }

  addChart() {
    this.createChartTemplate();
    graficTemplate.innerHTML = '&nbsp;';
    graficTemplate.append(this.chartField);
    var ctx = document.querySelector('#charts-field').getContext("2d");
    this.chart = new Chart(ctx, this.chartConfig);
  }

  changeMood(mood) {
    this.mood = mood;
  }

  resetLineChart() {
    this.createTimelineLabels();
    this.getLineColor();
    this.createTimelineDatasets();
    this.createLineConfig();
    this.addChart();
  }
}




