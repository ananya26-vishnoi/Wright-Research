let darkMode = false;

function applyLightMode() {
    document.body.style.backgroundColor = '#f4f4f4';
    document.body.style.color = '#333';
    document.getElementById('container').style.backgroundColor = '#fff';
    document.getElementById('heading').style.color = 'black';
    document.getElementById('stockData').style.backgroundColor = '#f4f4f4';
    document.getElementById('toggle').src = '/static/images/dark.png';
}

function applyDarkMode() {
    document.body.style.backgroundColor = '#1f1f1f';
    document.body.style.color = '#fff';
    document.getElementById('container').style.backgroundColor = '#333';
    document.getElementById('heading').style.color = 'white';
    document.getElementById('stockData').style.backgroundColor = '#f4f4f4';
    document.getElementById('toggle').src = '/static/images/light.png';
}

function toggleMode() {
    darkMode = !darkMode;
    if (darkMode) {
        applyDarkMode();
    } else {
        applyLightMode();
    }
}
