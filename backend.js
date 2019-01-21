// Unsecure javascript
// VOBFSebdrZuI5IrJqs4duKMUTUvXYNjO
// I would never do this in a real application

class WeatherData{
    async gettingData(zip){
        localStorage.setItem('zip', zip);
        // Fetching background information
        const fetching = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=%09VOBFSebdrZuI5IrJqs4duKMUTUvXYNjO&q=${zip}`);
        const data = await fetching.json();

        const locationKey = data[0].Key;
        const latitude = data[0].GeoPosition.Latitude;
        const longitude = data[0].GeoPosition.Longitude;
        const name = data[0].EnglishName;
        const region = data[0].AdministrativeArea.ID;
        
        // Fetching current conditioms
        const currentConditions = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=VOBFSebdrZuI5IrJqs4duKMUTUvXYNjO&details=true`);
        const currentConditionsJSON = await currentConditions.json();

        const realFeel = currentConditionsJSON[0].RealFeelTemperature.Imperial.Value;
        let relativeHumidity = currentConditionsJSON[0].RelativeHumidity;
        if(relativeHumidity === null){
            relativeHumidity = 'No humidity currently available';
        }else{
            relativeHumidity = currentConditionsJSON[0].RelativeHumidity;
        }
        console.log(currentConditionsJSON[0]);
        let windSpeed = currentConditionsJSON[0].Wind.Speed.Imperial.Value;
        if(windSpeed === 0){
            windSpeed = 'No wind';
        }else{
            windSpeed ='Wind ' + currentConditionsJSON[0].Wind.Speed.Imperial.Value + ' MPH from';
        }

        let windDirection = currentConditionsJSON[0].Wind.Direction.English;
        // making wind direction readable
        function readable(){
            if(windDirection.length === 3){
                windDirection = Array.from(currentConditionsJSON[0].Wind.Direction.English);
                windDirection.shift();
                const readableWindDirection = windDirection.join("");
                return readableWindDirection;
            }else{
                const readableWindDirection = windDirection;
                return readableWindDirection;
            }
        }
        let windCondition = readable();

        // checking wind speed and direction
        if(windSpeed === 'No wind'){
            windCondition = '';
        }
     
        const visibility = currentConditionsJSON[0].Visibility.Imperial.Value;
        const cloudCeiling = currentConditionsJSON[0].Ceiling.Imperial.Value; 
        let temperature = currentConditionsJSON[0].Temperature.Imperial.Value;
        if(temperature === null){
            temperature = 'No temperature currently available';
        }else{
           temperature = currentConditionsJSON[0].Temperature.Imperial.Value;
        }
        const weatherText = currentConditionsJSON[0].WeatherText;
        let currentIcon = currentConditionsJSON[0].WeatherIcon;
        const currentIconLength = Math.log(currentIcon) * Math.LOG10E + 1 | 0;
        // checking if current icon has one, two, or zero digits
        if(currentIconLength === null){
            currentIcon = '';
        }else if(currentIconLength === 1){
            currentIcon = '0' + currentConditionsJSON[0].WeatherIcon;
        }else{
            currentIcon = currentConditionsJSON[0].WeatherIcon;
        }

        // Fetching forecast
        const forecast = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=VOBFSebdrZuI5IrJqs4duKMUTUvXYNjO`);
        const forecastJSON = await forecast.json();

        let low = forecastJSON.DailyForecasts[0].Temperature.Minimum.Value;
        let high = forecastJSON.DailyForecasts[0].Temperature.Maximum.Value;
        if(low === null){
            low = 'No low temperature currently available';
        }else{
            low = forecastJSON.DailyForecasts[0].Temperature.Minimum.Value;
        }
        if(high === null){
            high = 'No high temperature currently available';
        }else{
            high = forecastJSON.DailyForecasts[0].Temperature.Maximum.Value;
        }
        const futureDayPhrase = forecastJSON.DailyForecasts[0].Day.IconPhrase;
        let futureDayIcon = forecastJSON.DailyForecasts[0].Day.Icon;
        const futureIconLength = Math.log(futureDayIcon) * Math.LOG10E + 1 | 0;
        // checking if future day icon has one, two, or zero digits
        if(futureIconLength === null){
            futureDayIcon = '';
        }else if(futureIconLength === 1){
            futureDayIcon = '0' + forecastJSON.DailyForecasts[0].Day.Icon;
        }else{
            futureDayIcon = forecastJSON.DailyForecasts[0].Day.Icon;
        }
        const futureNightPhrase = forecastJSON.DailyForecasts[0].Night.IconPhrase;
        let futureNightIcon = forecastJSON.DailyForecasts[0].Night.Icon;
        const futureNightLength = Math.log(futureNightIcon) * Math.LOG10E + 1 | 0;
        // checking if future night icon has one, two, or zero digits
        if(futureNightLength === null){
            futureNightIcon = '';
        }else if(futureNightLength === 1){
            futureNightIcon = '0' + forecastJSON.DailyForecasts[0].Night.Icon;
        }else{
            futureNightIcon = forecastJSON.DailyForecasts[0].Night.Icon;
        }

        return{
            locationKey,
            latitude,
            longitude,
            name,
            region,
            currentIcon,
            realFeel,
            relativeHumidity,
            windSpeed,
            windCondition,
            visibility,
            cloudCeiling,
            temperature,
            weatherText, 
            low,
            high,
            futureDayPhrase,
            futureDayIcon,
            futureNightPhrase,
            futureNightIcon
        }
    }
        
}