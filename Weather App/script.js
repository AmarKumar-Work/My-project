const API_KEY = "4a1184104c89ba476f3fe833ca4e7e52";
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

// const API = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&unit=metric`;
// const IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

form.addEventListener("submit",function(event){
    event.preventDefault();
    getWeather(search.value);

})

const getWeather = async(city)=>{

    weather.innerHTML = `<h2>Loading....</h2>`


    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);

    const  lat = data[0].lat;
    const  lon = data[0].lon;
    const local_names = data[0].local_names;
    

    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${local_names.en},lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const resp = await fetch(weatherurl);
    console.log(resp);

    const maindata = await resp.json();
    console.log(maindata);

    return showWeather(maindata);
}


const showWeather = (maindata)=>{
    if(maindata.cod=="404"){
        weather.innerHTML =`<h2>City Not Found!</h2>`;
    }
    weather.innerHTML = `
    
            <div>
                <img src="https://openweathermap.org/img/wn/${maindata.weather[0].icon}@2x.png" alt="">
            </div>
            <div>
                <h2>${maindata.main.temp}&deg; C</h2>
                <h4>${maindata.weather[0].main}</h4>
            </div>`
}