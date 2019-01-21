// Drop-down animation
const dropDown = document.querySelector('.drop-down');
const wrapper = document.querySelector('.wrapper');
const footer = document.querySelector('footer');

document.getElementById('change-location').addEventListener('click', () => {
    dropDown.classList.remove('hide');
    dropDown.style.height = 'auto';
    dropDown.classList += ' show';

        setTimeout(() => {
        wrapper.style.opacity = '0.6';
        footer.style.opacity = '0.6';
    }, 200);
});

// Drop down close
document.getElementById('close').addEventListener('click', () => {
    dropDown.classList.remove('show');
        dropDown.style.height = '0';
    setTimeout(() => {
        wrapper.style.opacity = '1';
        footer.style.opacity = '1';
    }, 150);
});


// Weather api
const newRequest = new WeatherData;
const newUi = new Ui;

document.querySelector('form').addEventListener('submit', (e)=>{
    // Weather
    const place = document.getElementById('place-name');
    const zip = document.getElementById('zip');
    
    newRequest.gettingData(zip.value)
    .then((response) => {
        newUi.displayingData(response);

        // Drop down animation continued
        dropDown.classList.remove('show');
        dropDown.style.height = '0';
    setTimeout(() => {
        wrapper.style.opacity = '1';
        footer.style.opacity = '1';
    }, 150);
    })
    .catch((error) => {
        newUi.displayingError(error);
        console.log(error);
    });
    
    place.value = '';
    zip.value = '';

    e.preventDefault();
});

// Persisting to local storage
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('zip') === null){
        document.querySelector('.main-info').innerHTML = `
        <h1>Please enter a location</h1>
        `;
    }else{
        newRequest.gettingData(localStorage.getItem('zip'))
        .then((response) => {
            newUi.displayingData(response);
        })
        .catch((error) => {
            newUi.displayingError(error);
        });
    }
});
