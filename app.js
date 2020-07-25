var ctc2=0, crc2=0,cd2=0, ctc3=0, crc3=0,cd3=0;

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
        //console.log(data);
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



const api2 = `https://ipapi.co/json/`;
                  
    fetch(api2)
        .then(response =>{
                return response.json();
        })
        .then(data=>{
            //console.log(data);
            var region = data.region;
            var country = data.country_name;

            const api3 = `https://api.covid19api.com/country/${country}/status/confirmed/live`;
            const api4 = `https://api.covid19api.com/country/${country}/status/deaths/live`;
            const api5 = `https://api.covid19api.com/country/${country}/status/recovered/live`;

                  
            fetch(api3)
                .then(response =>{
                        return response.json();
                })
                .then(data=>{
                    var n = data.length;
                    //console.log(data);
                    //console.log(data[n-1].Cases);

                    document.getElementById('ctc2').textContent = (commas(data[n-1].Cases));
                    document.getElementById('ctc3').textContent = '+' + commas((data[n-1].Cases - data[n-2].Cases));   
                    ctc2 = parseInt(data[n-1].Cases)
                    ctc3 = parseInt((data[n-1].Cases - data[n-2].Cases)); 
                    
                    fetch(api4)
                    .then(response =>{
                            return response.json();
                    })
                    .then(data=>{
                        var n = data.length;
                        document.getElementById('cd2').textContent = commas(data[n-1].Cases);
                        document.getElementById('cd3').textContent = '+' + commas((data[n-1].Cases - data[n-2].Cases));   
                        cd2 = parseInt(data[n-1].Cases)
                        cd3 = parseInt(data[n-1].Cases - data[n-2].Cases);

                        fetch(api5)
                        .then(response =>{
                                return response.json();
                        })
                        .then(data=>{
                            var n = data.length;
                            document.getElementById('crc2').textContent = (commas(data[n-1].Cases));
                            document.getElementById('crc3').textContent = '+' + commas((data[n-1].Cases - data[n-2].Cases));   
                            crc2 = parseInt(data[n-1].Cases)
                            crc3 = parseInt(data[n-1].Cases - data[n-2].Cases);
                            
                            document.getElementById('ccc2').textContent = commas((cd2 + crc2));        
                            document.getElementById('ccc3').textContent = '+' + commas((cd3 + crc3));    
                            document.getElementById('cac2').textContent = commas((ctc2 - cd2 - crc2));        
                            
                            if((ctc3 - cd3 - crc3)>=0){
                                document.getElementById('cac3').textContent = '+' + commas((ctc3 - cd3 - crc3));        
                            }
                            else{  
                                document.getElementById('cac3').textContent = commas((ctc3 - cd3 - crc3));        
                            } 
                        });  
                    });    
                });            
});
