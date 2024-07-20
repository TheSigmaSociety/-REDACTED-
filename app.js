function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/scare')
        .then(response => response.json())
        .then(data => {
            document.getElementById('textbox').textContent = data.message; 
        })
});