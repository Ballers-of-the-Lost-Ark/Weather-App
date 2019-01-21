class Ui{
    displayingData(response){
        console.log(response);

        const fahrenheit = '°F';

        const mainInfo = document.querySelector('.main-info');
        mainInfo.innerHTML = `
        <h1>${response.name}, ${response.region}</h1>
        <h3>Latitude: ${response.latitude}</h3>
        <h3>Longitude: ${response.longitude}</h3>
        <img src="https://developer.accuweather.com/sites/default/files/${response.currentIcon}-s.png" alt="Current weather icon">
        <h2>${response.weatherText}</h2>
        <h2>Cloud Ceiling ${response.cloudCeiling} feet</h2>
        <h2>Temperature: ${response.temperature} ${fahrenheit}</h2>
        <h2>Real Feel: ${response.realFeel} ${fahrenheit}</h2>
        <h2>Humidity: ${response.relativeHumidity}%</h2>
        <h2>${response.windSpeed} ${response.windCondition}</h2>
        <h2>Visibility: ${response.visibility} miles</h2>
        `;

        document.querySelector('.secondary-info').innerHTML = `
        <h1>Tomorrows Daily Forecast</h1>
        <img src="https://developer.accuweather.com/sites/default/files/${response.futureDayIcon}-s.png" alt="Future day weather icon">
        <h2>${response.futureDayPhrase}</h2>
        <h2>High: ${response.high} ${fahrenheit}</h2>
        <h2>Low: ${response.low} ${fahrenheit}</h2>

        <h1>Tomorrows Nightly Forecast</h1>
        <img src="https://developer.accuweather.com/sites/default/files/${response.futureNightIcon}-s.png" alt="Future day weather icon">
        <h2>${response.futureNightPhrase}</h2>
        `;
    }

    displayingError(error) {
            const container = document.querySelector('.container');
            const dropDown = document.querySelector('.drop-down');
    
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-div';

            container.insertBefore(errorDiv, dropDown);
            
            setTimeout(() => {
                errorDiv.innerHTML = `
                <h2>${error}</h2>
                `;
            }, 100);

            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3500);
            
    }
}