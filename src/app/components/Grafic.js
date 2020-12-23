import Chart from 'chart.js';
import './char.plugin';
import {
  MONTHS, DATA_TIPE_FOR_PRINT, DATA_TIPE_COLORS_HEX, DATA_TIPE_COLORS_RGB, DATA_TIPE_CLASSES,
} from './const';
import { getCountPer100th } from './util';

const graficTemplate = document.querySelector('.grafic__template');

const listOfDays = document.getElementById('list-of-days');

const fontFamily = "Roboto', sans-serif";
let fontSize = 12;
const fontWeight = 200;
const fontColor = '#DDDDDD';

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
    this.lastTikcsLimitY = 8;
    this.maxTikcsLimitY = 4;

    // elements
    this.el = null;

    if (config.country) {
      this.iso = config.country;
    } else {
      this.iso = 'All World';
    }

    window.onresize = () => {
      this.getWindowParams();
      if (this.lastTikcsLimitY !== this.maxTikcsLimitY) {
        if (this.type === 'line') {
          this.createLineConfig();
        } else {
          this.createChartConfig();
        }
        this.addChart();
        this.lastTikcsLimitY = this.maxTikcsLimitY;
      }
    }
  }

  getWindowParams() {
    if (window.innerWidth < 1260 && window.innerWidth >= 1023) {
      this.maxTikcsLimitY = 4;
      fontSize = 10;
    } else {
      this.maxTikcsLimitY = 8;
      fontSize = 12;
    }
  }

  initChartConfig(mood = 'cases') {
    switch (mood) {
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
    }
    this.mood = mood;
    this.createChartLabels();
    this.initDatasets();
    this.initChartDatasets();
    this.createDataSetIn();
    this.createDataSetOut();
    this.datasets = this.listOfData;
    this.getWindowParams();
    this.createChartConfig();
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
      const keysValue = this.labelsKeys.map((el) => el.replace('Per100th', ''));
      this.labelsValues = keysValue.map((el) => this.config[el]);
    }
    this.listOfData = this.labelsValues;
  }

  initChartDatasets() {
    if (this.labelsID === 0 || this.labelsID === 1) {
      this.data = this.listOfData;
    } else {
      this.data = this.listOfData.map((el) => getCountPer100th(el, this.config.population));
    }
    this.activeNumber = this.data[this.labelsKeys.indexOf(this.mood)];
  }

  createDataSetIn() {
    const backgroundIn = this.labelsKeys.map((el) => DATA_TIPE_COLORS_HEX[el]);
    this.dataSetIn = {
      data: this.data,
      backgroundColor: backgroundIn,
    };
  }

  createDataSetOut() {
    const background = this.labelsKeys.map((el) => DATA_TIPE_COLORS_HEX[el]);
    const activeColor = background[this.labelsKeys.indexOf(this.mood)];
    const bgOut = background.map((el) => (el !== activeColor ? DATA_TIPE_COLORS_HEX.deafult : el));
    this.dataSetOut = {
      data: this.data,
      backgroundColor: bgOut,
    };
  }

  createChartConfig() {
    this.chartConfig = {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [
          this.dataSetOut,
          {
            weight: 0,
          },
          this.dataSetIn,
        ],
      },
      options: {
        title: {
          display: true,
          text: `Ratio of basic values in ${this.iso}`,
          fontColor,
        },
        legend: {
          labels: {
            fontColor,
            fontSize: fontSize,
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 10,
            top: 0,
            bottom: 0,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 80,
        elements: {
          center: {
            text: `Common ${this.activeLabel} in ${this.iso} ${this.activeNumber}`,
            color: fontColor,
            fontStyle: 'Arial',
            sidePadding: 10,
            minFontSize: fontSize - 2,
            lineHeight: fontSize,
          },
        },
      },
    };
  }

  createChartTemplate() {
    const chartWrapper = document.createElement('canvas');
    chartWrapper.setAttribute('id', 'charts-field');
    chartWrapper.setAttribute('width', '200');
    // chartWrapper.setAttribute('height', '95');
    this.chartField = chartWrapper;
  }

  setPeriodData(data) {
    this.data = data;
    if (data.country) {
      this.timeline = data.timeline;
    } else {
      this.timeline = data;
    }
    this.type = 'line';
    this.createTimelineLabels();
    this.getLineColor();
    this.getPointRadious();
    this.getMaxTikcsLimitX();
    this.createTimelineDatasets();
    this.getWindowParams();
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
    if (!this.mood) {
      setTimeout(this.createTimelineLabels, 2000)
    } else {
      if (this.mood === 'casesPer100th' || this.mood === 'deathsPer100th' || this.mood === 'recoveredPer100th') {
        this.timelineLabels = Object.keys(this.timeline[this.mood.replace('Per100th', '')]);
      } else if (this.mood === 'todayCases' || this.mood === 'todayDeaths' || this.mood === 'todayRecovered') {
        this.timelineLabels = Object.keys(this.timeline[this.mood.toLowerCase().replace('today', '')]);
      } else if (this.mood === 'todayCasesPer100th' || this.mood === 'todayDeathsPer100th' || this.mood === 'todayRecoveredPer100th') {
        this.timelineLabels = Object.keys(this.timeline[this.mood.replace('Per100th', '').toLowerCase().replace('today', '')]);
      } else {
        this.timelineLabels = Object.keys(this.timeline[this.mood]);
      }
    }
  }

  getLineColor() {
    this.lineColor = DATA_TIPE_COLORS_RGB[this.mood];
  }

  getPointRadious() {
    let radious;
    switch (listOfDays.value) {
      case '361':
        radious = 0.5;
        break;
      case '181':
        radious = 1;
        break;
      case '91':
        radious = 1.5;
        break;
      case '31':
        radious = 2;
        break;
      default:
        radious = 3;
        break;
    }
    this.pointRadious = radious;
  }

  getMaxTikcsLimitX() {
    let tikcsLimitX;
    switch (listOfDays.value) {
      case '361':
      case '181':
        tikcsLimitX = 11;
        break;
      default:
        tikcsLimitX = 11;
        break;
    }
    this.maxTikcsLimitX = tikcsLimitX;
  }

  createTimelineDatasets() {
    let magnitudes;
    if (this.mood === 'casesPer100th' || this.mood === 'deathsPer100th' || this.mood === 'recoveredPer100th') {
      magnitudes = Object.values(this.timeline[this.mood.replace('Per100th', '')]).map((el) => getCountPer100th(el, this.config.population));
    } else if (this.mood === 'todayCases' || this.mood === 'todayDeaths' || this.mood === 'todayRecovered') {
      const result = [];
      magnitudes = Object.values(this.timeline[this.mood.toLowerCase().replace('today', '')]);
      for (let i = 0; i < magnitudes.length; i += 1) {
        if (i === 0) {
          result.push(magnitudes[i]);
        } else {
          result.push(magnitudes[i] - magnitudes[i - 1]);
        }
      }
      magnitudes = result;
    } else if (this.mood === 'todayCasesPer100th' || this.mood === 'todayDeathsPer100th' || this.mood === 'todayRecoveredPer100th') {
      const result = [];
      magnitudes = Object.values(this.timeline[this.mood.replace('Per100th', '').toLowerCase().replace('today', '')]);
      for (let i = 0; i < magnitudes.length; i += 1) {
        if (i === 0) {
          result.push(magnitudes[i]);
        } else {
          result.push(magnitudes[i] - magnitudes[i - 1]);
        }
      }
      magnitudes = result.map((el) => getCountPer100th(el, this.config.population));
    } else {
      magnitudes = Object.values(this.timeline[this.mood]);
    }

    this.timelineLabels = this.timelineLabels.slice(1);
    magnitudes = magnitudes.slice(1);

    const newData = {
      label: DATA_TIPE_FOR_PRINT[this.mood],
      data: magnitudes,
      pointColor: `rgba(${this.lineColor}, 1)`,
      pointStrokeColor: '#202b33',
      pointHighlightStroke: 'rgba(225,225,225,0.9)',
      backgroundColor: `rgba(${this.lineColor}, 0.2)`,
      borderColor: `rgba(${this.lineColor}, 0.7)`,
      borderWidth: 0,
      pointRadius: this.pointRadious,
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
          padding: 0,
        },
        legend: {
          labels: {
            fontColor,
            fontSize: fontSize + 2,
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
              padding: 10,
              fontColor,
              fontSize: fontSize + 4,
            },
            ticks: {
              beginAtZero: false,
              maxTicksLimit: this.maxTikcsLimitY,
              ...commonOptions,
              callback(value) {
                let number = String(value);
                if (number.length > 6) {
                  number = `${number.slice(0, -6)}M`;
                } else if (number.length > 3) {
                  number = `${number.slice(0, -3)}K`;
                } else {
                  number = number;
                }
                return number;
              },
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Dates',
              padding: 0,
              fontColor,
              fontSize: fontSize + 2,
            },
            ticks: {
              ...commonOptions,
              maxTicksLimit: this.maxTikcsLimitX,
              callback(value) {
                let date;
                const monthIndex = value.replace(/\/[0-9]*\/[0-9]*/, '');
                const month = MONTHS[monthIndex - 1];
                const day = value.replace(/[0-9]*\//, '').replace(/\/[0-9]*/, '');
                switch (listOfDays.value) {
                  case '361':
                    date = month;
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
            right: 10,
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
    const ctx = document.querySelector('#charts-field').getContext('2d');
    this.chart = new Chart(ctx, this.chartConfig);
  }

  changeMood(mood) {
    this.mood = mood;
  }

  resetLineChart() {
    this.createTimelineLabels();
    this.getLineColor();
    this.getPointRadious();
    this.getMaxTikcsLimitX();
    this.createTimelineDatasets();
    this.getWindowParams();
    this.createLineConfig();
  }
}

