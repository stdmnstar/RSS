import Chart from 'chart.js';
import { DATA_TIPE_COLORS } from '../constans/categories'

const graficLinePanel = document.querySelector('.grafic__line-panel');

export default class Grafic{
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
          fontColor: 'black',
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontSize: 16,
          fontStyle: 'normal',
        },
        legend: {
          labels: {
            fontColor: 'black',
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize: 16,
            fontStyle: 'normal',
          }
        },
        tooltips: {
          mode: 'nearest',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fontColor: 'black',
              fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize: 16,
              fontStyle: 'normal',
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize: 16,
              fontStyle: 'normal',
            }
          }],
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        showLines: true 
      }
    }
    
    this.el = this.el.getContext('2d')
    this.chart = new Chart(this.el, this.chartConfig);

    changeTypeBox.onclick = () => {
      this.changeTypeBox();
      this.chart.update();
    };

    graficLinePanel.onclick = (e) => {
      if (e.target.closest('#cases-line')) {
        console.log('cases-line')
      }else if(e.target.closest('#deaths-line')) {
        console.log('deaths-line')
      } else {
        console.log('recovered-line')
      }
    }
  }

  createChartTemplate() {
    const chartWrapper = document.createElement('canvas');
    chartWrapper.setAttribute("id", "chart")
    chartWrapper.setAttribute("width", "200")
    chartWrapper.setAttribute("height", "70")
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
      label: this.mood,
      data: magnitudes,
      backgroundColor: `${this.color}`,
      borderColor: `${this.color}`,
      borderWidth: 1,
      fill: false,
    }
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
    this.color = DATA_TIPE_COLORS[mood]
  }

  changeTypeBox() {
    if (this.type === 'line') {
      this.type = 'bar';
      graficLinePanel.classList.add('hidden')
    } else {
      this.type = 'line';
      graficLinePanel.classList.remove('hidden')
    }
    this.chartConfig.type = this.type;
  }

  // addUserToChart = (config, setName) => {
  //   const name = setName || generateRandomName();
  //   const data = Array(10).fill(0).map(() => generateRandomTime());
  //   let randomColor;
  //   do {
  //     randomColor = generateRandomColor();
  //   } while (colorSet.has(randomColor));
  //   colorSet.add(randomColor);
  //   const newUser = {
  //     label: name,
  //     data: data,
  //     backgroundColor: randomColor,
  //     borderColor: randomColor,
  //     borderWidth: 2,
  //     fill: false,
  //   }
  //   config.data.datasets.push(newUser);
  //   chart.update();
  // }

}
