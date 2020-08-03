var death, tot, rec;
/*
const api3 = `https://covid-19-report-api.now.sh/api/v1/cases/brief/timeseries`;
fetch(api3)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        var bla ='7/31/20';
        console.log(data.data.bla);
});  */


function commas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

const api1 = `https://api.thevirustracker.com/free-api?global=stats`;
fetch(api1)
  .then(response =>{
      return response.json();
  })
  .then(data=>{
      death = parseInt(data.results[0].total_deaths);
      tot = parseInt(data.results[0].total_cases);
      rec = parseInt(data.results[0].total_recovered);
      //console.log(data);
      document.getElementById('gtc2').textContent = commas(data.results[0].total_cases);
      document.getElementById('gd2').textContent = commas(data.results[0].total_deaths);
      document.getElementById('grc2').textContent = commas(data.results[0].total_recovered);     
      
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
                (death/tot*100).toFixed(2), (100-(death/tot*100).toFixed(2))
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
      
      var ctx = document.getElementById("gfchart").getContext("2d");
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
              (rec/tot*100).toFixed(2), (100-(rec/tot*100).toFixed(2))
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
      
      var ctx = document.getElementById("grchart").getContext("2d");
      var myChart = new Chart(ctx, config);

      document.getElementById('grrh1').innerHTML = `Recovery Rate: ${(rec/tot*100).toFixed(2)}`;
      document.getElementById('gfrh1').innerHTML = `Fatality Rate: ${(death/tot*100).toFixed(2)}`;
});   

const api2 = `https://api.covid19api.com/summary`;
  fetch(api2)
      .then(response =>{
          return response.json();
      })
      .then(data=>{
          //console.log(data);
          document.getElementById('gtc3').textContent = '+' + commas(data.Global.NewConfirmed);
          document.getElementById('gd3').textContent = '+' + commas(data.Global.NewDeaths);
          document.getElementById('grc3').textContent = '+' + commas(data.Global.NewRecovered);        
          
          var n = data.Countries.length;
          var options = '';

          for(var i = 0; i < n; i++)
            options += '<option value="'+data.Countries[i].Country+'" />';

          document.getElementById('country-list').innerHTML = options;

      });
