var ctc2=0, crc2=0,cd2=0, ctc3=0, crc3=0,cd3=0;

function commas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
var api6 = `https://api.covid19api.com/summary`;



const proxy = "https://cors-anywhere.herokuapp.com/";
const api1 = `https://api.thevirustracker.com/free-api?global=stats`;
fetch(api1)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        
        //console.log(data);
        document.getElementById('gtc2').textContent = commas(data.results[0].total_cases);
        document.getElementById('gd2').textContent = commas(data.results[0].total_deaths);
        document.getElementById('grc2').textContent = commas(data.results[0].total_recovered);        
        document.getElementById('gcc2').textContent = commas((data.results[0].total_deaths + data.results[0].total_recovered));        
        document.getElementById('gac2').textContent = commas((data.results[0].total_cases - data.results[0].total_deaths - data.results[0].total_recovered));        
});   

api6 = `https://api.covid19api.com/summary`;
    fetch(api6)
        .then(response =>{
            return response.json();
        })
        .then(data=>{
            //console.log(data);
            document.getElementById('gtc3').textContent = '+' + commas(data.Global.NewConfirmed);
            document.getElementById('gd3').textContent = '+' + commas(data.Global.NewDeaths);
            document.getElementById('grc3').textContent = '+' + commas(data.Global.NewRecovered);        
            document.getElementById('gcc3').textContent = '+' + commas((data.Global.NewDeaths+data.Global.NewRecovered));    
            if((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered)>=0){
            document.getElementById('gac3').textContent = '+' + commas((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered));        
            }
            else{  
                document.getElementById('gac3').textContent = commas((data.Global.NewConfirmed - data.Global.NewDeaths - data.Global.NewRecovered));        
            }
        
        });

function count (country){
    
    const api3 = `https://api.covid19api.com/total/country/${country}`;
    document.getElementById('country').textContent = country;

                  
                fetch(api3)
                .then(response =>{
                        return response.json();
                })
                .then(data=>{
                    var n = data.length;
                    
                    ctc2 = data[n-1].Confirmed;
                    ctc3 = data[n-1].Confirmed-data[n-2].Confirmed; 
                    document.getElementById('ctc2').textContent = commas(ctc2);
                    document.getElementById('ctc3').textContent = '+' + commas(ctc3);   

                    cd2 = data[n-1].Deaths;
                    cd3 = data[n-1].Deaths - data[n-2].Deaths;
                    document.getElementById('cd2').textContent = commas(cd2);
                    document.getElementById('cd3').textContent = '+' + commas(cd3);   
                        
                    crc2 = data[n-1].Recovered;
                    crc3 = data[n-1].Recovered - data[n-2].Recovered;
                    document.getElementById('crc2').textContent = commas(crc2);
                    document.getElementById('crc3').textContent = '+' + commas(crc3);   
                            
                            
                    document.getElementById('ccc2').textContent = commas((cd2 + crc2));        
                    document.getElementById('ccc3').textContent = '+' + commas((cd3 + crc3));    
                    document.getElementById('cac2').textContent = commas(data[n-1].Active);        
                            
                    if((data[n-1].Active - data[n-2].Active)>=0){
                        document.getElementById('cac3').textContent = '+' + commas((data[n-1].Active - data[n-2].Active));        
                    }
                    else{  
                        document.getElementById('cac3').textContent = commas((data[n-1].Active - data[n-2].Active));        
                    } 
                        
    });           
}

const api2 = `https://ipapi.co/json/`;
                  
    fetch(api2)
        .then(response =>{
                return response.json();
        })
        .then(data=>{
            //console.log(data);
            var region = data.region;
            var country = data.country_name;
            count(country);
             
});


fetch(api6)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        var list = document.getElementById("options");
        var n = data.Countries.length;
        var option = document.createElement("option");
        var i=0;

        for(i=0;i<n;i++){
            var option = document.createElement("option");
            option.text = data.Countries[i].Country;
            list.add(option, list[i+1]);
        } 

});

function serach_country(){
    var sel = document.getElementById("options");

    if(sel.options[sel.selectedIndex].value == "--Select Country--"){
        //alert("Select a Country");
    }else{
        count(sel.options[sel.selectedIndex].value);
    }
}


const api911 = `https://newsapi.org/v2/everything?q=coronavirus&apiKey=bd7fac69b8024aa0bbe249febd34525e`;
fetch(api911)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        
        console.log(data);
});   
