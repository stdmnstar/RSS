import './scss/index.scss';

class ApiAll{
  constructor(){
    this.country;
  }
  async globalInfo(){
      let response = await fetch('https://disease.sh/v3/covid-19/all');
      return await response.json()
  }
  async countryInfo(iso2){
    let response = await fetch(`https://disease.sh/v3/covid-19/countries/${iso2}`);
    return await response.json()
  }
  async countrysInfo(){
    let response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    return await response.json()
  }  
  async countryPeriod(iso2, day){
    let response = await fetch(`https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=${day}`);
    return await response.json()
  }  

}
let obj = new ApiAll();
obj.globalInfo().then(data => console.log(data));
