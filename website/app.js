/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=bcee34ae9d55c65f70a923b779252ff8&units=imperial"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
async function generate() {
    const fullUrl = baseUrl + document.getElementById('zip').value + key;
    getApiData(fullUrl)
    .then(function(data) {
        postToServer("/add", {
            temperature: data.main.temp,
            date: newDate,
            userInput: document.getElementById('feelings').value
        })
        updateUi();
    })
}

/* Function to GET Web API Data*/
const getApiData = async (url = '') => {
    const response = await fetch(url);
    try {
        const responseData = await response.json();
        return responseData;
    }
    catch(error) {
        console.log("error: ", error);
    }
}

/* Function to POST data */
const postToServer = async (url = '', apiData = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    });
    try {
        const responseData = await response.json();
        return responseData;
    }
    catch(error) {
        console.log("error: ", error);
    }
}


/* Function to GET Project Data */
const updateUi = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temperature: " + allData.temperature;
        document.getElementById('content').innerHTML = "Feelings: " + allData.userInput;
    }
    catch(error) {
        console.log("error: ", error);
    }
}