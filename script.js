const appid = "27dcb84a7e6b6b32417aa1b357774ec8"
const unsplashKey = "_xN4jP8MLVPXHWagwY-tcLcVA2mEdJGavPhMSroU9RI"
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");

const TempE = document.querySelector("#temp span");
const CityE = document.querySelector("#city");
const UmidityE = document.querySelector("#umidity span");
const DescriptionE = document.querySelector("#description");
const WindE = document.querySelector("#wind span");

function search() {
    const city = document.getElementById("input-name").value;
    showWeatherData(city);

}

const showWeatherData = async (city) => {
    const data = await getWeather(city);

    CityE.innerText = data.name;
    TempE.innerText = parseInt(data.main.temp);
    DescriptionE.innerText = data.weather[0].description;
    UmidityE.innerText = `${data.main.humidity}%`;
    WindE.innerText = `${data.wind.speed}km/h`;
        showImage(city);
}

// function api collect

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric&lang=pt_br`;
    const res = await fetch(url);
    const data = await res.json();
    return data; 
}

async function getImage(city) {
    const urlUnsplash = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(city)}&client_id=${unsplashKey}&count=3`;
    const res = await fetch(urlUnsplash);
    const data = await res.json();
    return data;
}

async function showImage(city) {
    const photos = await getImage(city);
    carousel(photos);
}

function carousel(photos) {
    const carousel = document.getElementById("carouselExampleControls");
    const inner = carousel.querySelector(".carousel-inner");
    inner.innerHTML = "";

    photos.forEach((p, idx) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (idx === 0) item.classList.add("active");

        const img = document.createElement("img");
        img.className = "d-block w-100";
        img.src = p.urls.regular || p.urls.small;
        img.alt = p.alt_description || p.description || "Imagem da cidade";
        img.style.objectFit = "cover";
        img.style.height = "260px"; 

        item.appendChild(img);
        inner.appendChild(item);
    });
}