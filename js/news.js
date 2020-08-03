/*const proxy1 = "https://cors-anywhere.herokuapp.com/";

const api33 = `https://newsapi.org/v2/everything?q=coronavirus&apiKey=bd7fac69b8024aa0bbe249febd34525e`;
fetch(api33)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        
        console.log(data);
});   */
/*
fetch(`${proxy1}https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
		"x-rapidapi-key": "a2fdc7b36amsh8b3c6e47c61fd2fp1a0a6djsn0d460a558f11",
		"x-bingapis-sdk": "true"
	}
})
.then(data => {
	console.log(data);
})*/
/*
const api3 = `https://gnews.io/api/v3/search?q=coronavirus%20India%20cases%20deaths%20health&token=9268d968a668c63873eb9d000960e3b1`;
fetch(api3)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        
        console.log(data);
});  
*/
var myHeaders = new Headers();
myHeaders.append("Subscription-Key", "3009d4ccc29e4808af1ccc25c69b4d5d");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.smartable.ai/coronavirus/news/global", requestOptions)
  .then(response => response.json())
  .then(data => {
        console.log(data);
        document.getElementById('news-section').innerHTML = data.news.map(news => 
        `<div class="news">
        <a href="${news.webUrl}"> 
            <h2 id="news-title">
                ${news.title}
            </h2>
            <h3 id="news-excerpt">
                ${news.excerpt}
            </h3>
        </a>
        <br><br>
        <hr>
        <br>
        </div>`
    ).join('')

});