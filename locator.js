logInName = (document.cookie).slice(9) //remove the "username=" part of the cookie
console.log(logInName)
IP = "http://127.0.0.1:5000"
function get(url) {
    fetch(IP + url, {
		method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
	}).then(response => response.json()).then(data => {
        leo = document.getElementById("leoLocator")
        leo.innerHTML = "";
        for (const leoKey in data) {
            const location = data[leoKey]
            city = (location[1].split(",").slice(2))
            leo.innerHTML += location[0] + " is living in: " + city +  "<br> <br>"
        }
    })
}
function getNear() {

    get(`/leoLianLocator?name=${logInName}`)
}

function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}