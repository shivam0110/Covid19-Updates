
function commas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const proxy = "https://cors-anywhere.herokuapp.com/";
const api1 = `https://api.covid19api.com/summary`;
fetch(api1)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        console.log(data);
        console.log();
        document.getElementById('gtc2').textContent = commas(data.Global.TotalConfirmed);
        document.getElementById('gtc3').textContent = '+' + commas(data.Global.NewConfirmed);
        document.getElementById('gd2').textContent = commas(data.Global.TotalDeaths);
        document.getElementById('gd3').textContent = '+' + commas(data.Global.NewDeaths);
        document.getElementById('gac2').textContent = commas((data.Global.TotalConfirmed - data.Global.TotalDeaths - data.Global.TotalRecovered));        
        document.getElementById('grc2').textContent = commas(data.Global.TotalRecovered);        
        document.getElementById('grc3').textContent = '+' + commas(data.Global.NewRecovered);        
        document.getElementById('gcc2').textContent = commas((data.Global.TotalDeaths+data.Global.TotalRecovered));        
        document.getElementById('gcc3').textContent = '+' + commas((data.Global.NewDeaths+data.Global.NewRecovered));    
        
        if((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered)>=0){
            document.getElementById('gac3').textContent = '+' + commas((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered));        
        }
        else{  
            document.getElementById('gac3').textContent = commas((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered));        
        }
});   
