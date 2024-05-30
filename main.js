var apiKey = "a48c5a8cecfd41951d52b2504d2430bf"; // Replace with your API key

// video animation


function changeVideoWithFade() {
  var videoElement = document.getElementById("backgroundVideo");
  var backgroundVideos = [
    './assets/clouds.mp4',
    'https://cdn.pixabay.com/video/2024/02/24/201766-916357972_large.mp4',
    'https://cdn.pixabay.com/video/2023/10/08/184069-872413642_large.mp4',
    'https://cdn.pixabay.com/video/2023/06/25/168787-839864519_large.mp4',
    'https://cdn.pixabay.com/video/2023/07/27/173522-849651812_large.mp4',
    'https://cdn.pixabay.com/video/2023/04/30/161071-822582138_large.mp4',
    'https://cdn.pixabay.com/video/2022/04/04/112957-696336342_large.mp4',
    'https://cdn.pixabay.com/video/2021/10/05/90877-629483574_large.mp4'
  ];

  let currentVideoIndex = 0;

  function changeVideo() {
    // Update video source
    console.log("videoElement")
    console.log(videoElement)
    console.log(videoElement.src)
    videoElement.src = backgroundVideos[currentVideoIndex];

    // Fade out current video
    videoElement.style.opacity = 0;

    // Set timeout to fade in new video after 1 second (adjust as needed)
    setTimeout(() => {
      videoElement.play();
      videoElement.style.opacity = 1;
      currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    }, 1000);
  }

  // Call changeVideo initially
  changeVideo();

  // Set interval to change video every 3 sec (3000 milliseconds)
  setInterval(changeVideo, 3000);
  console.log("backgroundVideos");
}


function handleButtonClick(idNumber) {
  idNumber = String(idNumber);
  console.log("elementId: ", idNumber);      
  var elementId = `city-input${idNumber}`;
  var cityInput = document.getElementById(elementId);
  var cityValue = cityInput.value;
  var card = document.getElementById(`card${idNumber}`);
  var cardFront = document.getElementById(`card-front${idNumber}`);
  var cardBack = document.getElementById(`card-back${idNumber}`);

  var cityName = document.getElementById(`city-name${idNumber}`);
  var weatherIcon = document.getElementById(`weather-icon${idNumber}`);
  var weatherDescription = document.getElementById(`weather-description${idNumber}`);
  var weatherTemp = document.getElementById(`weather-temp${idNumber}`); 
  var weatherHumidity = document.getElementById(`weather-humidity${idNumber}`);
  var weatherWindSpeed = document.getElementById(`weather-wind-speed${idNumber}`);
  var weather = document.getElementById(`weather${idNumber}`);  


  fetchWeatherData(cityValue)
    .then(data => {
      if (data) {
        console.log("data: ", data);
        var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temperature = Math.round(data.main.temp);
        var weatherMain = data.weather[0].main;
        var weatherDesc = data.weather[0].description;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;

        cityName.textContent = cityValue;
        weatherIcon.src = iconurl;
        weatherTemp.textContent = temperature + "°C";
        weather.textContent = weatherMain;
        weatherDescription.textContent = weatherDesc;
        weatherHumidity.textContent = humidity;
        weatherWindSpeed.textContent = windSpeed;

      } else {
        console.error("Error fetching weather data");
        cityOutput.textContent = "Error: City not found";
      }
      startFlipAnimation(card, cardFront, cardBack);
    })
    .catch(error => {
      console.error("Error:", error);
      cityOutput.textContent = "Error: Failed to fetch data";
    });
}

async function fetchWeatherData(city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units

  try {
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status}`);
    }
    var data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Indicate error
  }
}

// ======================== flip animation =======================

function startFlipAnimation(card,cardFront, cardBack){
  console.log("card: ", card);
  console.log("cardFront: ", cardFront);
  console.log("cardBack: ", cardBack);

  var removeCardFront = new Promise((resolve, reject) => {
    cardFront.classList.toggle("fade-out");
    setTimeout(function(){
      cardFront.classList.toggle("hide-card");
      resolve("Card hidden");
    }, 1000);
  });

  removeCardFront.then(function(){
    card.classList.toggle("card-flip");
  });

  removeCardFront.then(function(){
    cardBack.classList.toggle("hide-card");
    setTimeout(function(){
      cardBack.classList.toggle("fade-in");
      cardBack.style.opacity = 1;
    }, 1000);
  });
}
