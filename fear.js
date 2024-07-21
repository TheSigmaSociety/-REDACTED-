document.addEventListener('DOMContentLoaded', function() {
    const name = 'david lin';
     
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