logInName = (document.cookie).slice(9) //remove the "username=" part of the cookie
console.log(logInName)

document.addEventListener('DOMContentLoaded', function() {
    const name = logInName;
     
    fetch(`http://localhost:5000/scare?name=${encodeURIComponent(name)}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('textbox').textContent = data.response; 
    })
    .catch(error => console.error('Error:', error));
});