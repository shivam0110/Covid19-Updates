
function count (country){
    
    const api3 = `https://api.covid19api.com/total/country/${country}`;
    document.getElementById('country').textContent = country;                  
                fetch(api3)
                .then(response =>{
                        return response.json();
                })
                .then(data=>{
                    var n = data.length;
                    //console.log(data);

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
                     
                    
                    //---------Pie Graphs--------
                    //fatality
                    var fatality = {
                        type: 'pie',
                        data: {
                        labels: [
                            "Fatality",
                            "Recovered/Active"
                        ],
                        datasets: [{
                            data: [
                                (cd2/ctc2*100).toFixed(2), (100-(cd2/ctc2*100).toFixed(2))
                            ],
                            backgroundColor: [
                            "#ff0000",
                            "#2c2828"        ]
                        }]
                        },
                        options: {
                            legend: {
                                display: false
                            }
                        }
                    };
                    
                    var ctx = document.getElementById("cfchart").getContext("2d");
                    var myChart = new Chart(ctx, fatality);

                    //recovery
                    var config = {
                        type: 'pie',
                        data: {
                        labels: [
                            "Recovered",
                            "Active/Dead"
                        ],
                        datasets: [{
                            data: [
                            (crc2/ctc2*100).toFixed(2), (100-(crc2/ctc2*100)).toFixed(2)
                            ],
                            backgroundColor: [
                            "#32b419",
                            "#2c2828"
                            ]
                        }]
                        },
                        options: {
                            legend: {
                                display: false
                            }
                        }
                    };
                    
                    var ctx = document.getElementById("crchart").getContext("2d");
                    var myChart = new Chart(ctx, config);

                    document.getElementById('crrh1').innerHTML = `Recovery Rate: ${(crc2/ctc2*100).toFixed(2)}`;
                    document.getElementById('cfrh1').innerHTML = `Fatality Rate: ${(cd2/ctc2*100).toFixed(2)}`;


        

                    //------- line graph -------

                    var condata = [];
                    var label = [];
                    var recdata = [];
                    var deathdata = [];

                    var x=0;
                    for(var i=0 ; i<n; i+=10){
                        label[x] = data[i].Date;
                        condata[x] = data[i].Confirmed;
                        //recdata[x] = data[i].Recovered;
                        deathdata[x] = data[i].Deaths;
                        x++;
                    }

                    var ctx = document.getElementById('cngraph')
                    // eslint-disable-next-line no-unused-vars
                    var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: label,
                        datasets: [{
                        data: condata,
                        label: 'Confirmed' ,
                        lineTension: 0.3,
                        borderColor: '#2c2828',
                        }],
                        options: {
                            scales: {
                                xAxes: [{
                                    label: {
                                        display: false //this will remove only the label
                                    }
                                }]
                            }
                        }
                    }
                })
              
                    var ctx = document.getElementById('cdgraph')
                    // eslint-disable-next-line no-unused-vars
                    var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: label,
                        datasets: [{
                        data: deathdata,
                        label: 'Deaths' ,
                        lineTension: 0.3,
                        borderColor: '#ff0000',
                        }],
                        options: {
                            legend: {
                                display: false
                            }
                        }
                    }
                })
    });           
}

// Driver Code 

const api3 = `https://ipapi.co/json/`;
                  
    fetch(api3)
        .then(response =>{
                return response.json();
        })
        .then(data=>{
            //console.log(data);
            var region = data.region;
            var country = data.country_name;
            count(country);
             
});

function serach_country(){
    var sel = document.getElementById("search-box");
    count(sel.value);
}

function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        serach_country();
    }
}
