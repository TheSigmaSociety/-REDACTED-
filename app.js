function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}

document.addEventListener('DOMContentLoaded', function() {
    const name = 'walter'; 
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