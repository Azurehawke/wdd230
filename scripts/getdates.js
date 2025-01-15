const options = {day: 'numeric', month: 'long', year: 'numeric'};
const year = {year: 'numeric'};
document.getElementById('currentdate').textContent = new Date().toLocaleDateString('en-US', options);
document.getElementById('currentyear').textContent = new Date().toLocaleDateString('en-US', year);

