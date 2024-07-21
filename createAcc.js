IP = "http://127.0.0.1:5000"
loc = document.getElementById("currentLocation");
age = 0;
Address = ""
ageInput = document.getElementById("Age");
ageOut = document.getElementById("ageOut");
steps = document.getElementById("dailySteps");
nam = document.getElementById("name");
heart = document.getElementById("heartDiseaseCheck")
phone = document.getElementById("phoneNum")
latitude = -1
longitude = -1
logInName = (document.cookie).slice(9) //remove the "username=" part of the cookie
console.log(logInName)
ageOut.innerHTML = 50;

ageInput.oninput = function() {
    ageOut.innerHTML = this.value;
}
function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}
function post(url,content) {
    fetch(IP + url, {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(content)
	}).then(response => response.json()).then(data => {
        if(data['status'] == "posted")  window.location.assign("http://127.0.0.1:5500/logIn.html")
		return (data)
	})
}
function get(url,content) {
    fetch(IP + url, {
		method: "GET",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(content)
	}).then(response => response.json()).then(data => {
		//return (data) //{'status':'posted/notposted'}
        if(data['status'] == 'posted') {
            console.log("bruh")
            window.location.assign("http://127.0.0.1:5500/logIn.html")
        }
	})
}


function getLocation() {
    loc = document.getElementById("currentLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => getAddress(position.coords.latitude,position.coords.longitude));
    } else {
        loc.innerText = "Geolocation is not supported by this browser.";
    }
}

function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}
function showPosition(position) {
    Address = position
    loc.innerText = "Address: " + (position)
}

//gets the adress based on latatude and longatude
function getAddress(lat, lon) {
    latitude = lat
    longitude = lon
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    response = ""
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                showPosition(data.display_name)
            } else {
                showPosition("No results found")
            }
        })
        .catch(error => {
            showPosition("Geocoder failed due to: " + error)
        });
    return response
}

function submitToServer() {
    function getAge() {

    }
    age = ageOut.innerHTML
    step = steps.value
    hasHeartDisease = !heart.disabled
    phoneNumber = phone.value
    result = document.getElementById("resp")
    result.innerHTML = "";
    if(nam.value == "") return;
    if(age == -1) return;
    if(Address == "") return;
    if(phoneNumber == "") return;
    if(step == "") return;
    
    x = {}
    x[nam.value] = {"age": age, "steps": step, "location": Address, "heartdisease": hasHeartDisease,"lat":latitude,"long":longitude,"phone":phoneNumber};
    res = post("/savedata",x)
    result.innerHTML = ""

    // post(IP + "/savedata",{n:{}})
}