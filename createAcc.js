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
console.log(document.cookie)

ageOut.innerHTML = 50;

ageInput.oninput = function() {
    ageOut.innerHTML = this.value;
}

function post(url,content) {
    fetch(IP + url, {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(content)
	}).then(response => response.json()).then(data => {
		return (data)
	})
}
function get(url,content) {
    fetch(IP + url, {
		method: "GET",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(content)
	}).then(response => response.json()).then(data => {
		return (data)
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
    if(nam.value == "") result.innerHTML += "No name inputted<br>";
    if(age == -1) result.innerHTML += "No age inputted<br>";
    if(Address == "") result.innerHTML += "No address inputted<br>";
    if(phoneNumber == "") result.innerHTML += "No phone number imputted<br>";
    if(step == "") result.innerHTML += "Step amount not imputted <br>";
    
    if(result.innerHTML != "") return;
    x = {}
    x[nam.value] = {"age": age, "steps": step, "location": Address, "heartdisease": hasHeartDisease,"lat":latitude,"long":longitude,"phone":phoneNumber};
    res = post("/savedata",x)
    result.innerHTML = ""
    // post(IP + "/savedata",{n:{}})
}