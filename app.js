userName = document.getElementById("usernameBox")
phoneNum = document.getElementById("phoneBox")
logInName = (document.cookie).slice(9) //remove the "username=" part of the cookie
console.log(logInName)

IP = "http://127.0.0.1:5000"
function post(url,content) {
    fetch(IP + url, {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify(content)
	}).then(response => response.json()).then(data => {
		return (data)
	})
}
function get(url,user) {
    fetch(IP + url, {
		method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
	}).then(response => response.json()).then(data => {
        button = document.getElementById("logInButton")
        console.log(data)
        if(data['status'] == "success")  {
            document.cookie = "username=" + userName.value + "; path=/";
            window.location.assign("http://127.0.0.1:5500/scare.html")
        } 
    })
}
function openBar(){
    // document.getElementById("navBar").style.width = "250px";
    document.getElementById("navBar").classList.add("open");
}

function closeBar(){
    // document.getElementById("navBar").style.width = "0";
    document.getElementById("navBar").classList.remove("open");
}


function log() {
    button = document.getElementById("logInButton")
    user = userName.value
    phone = phoneNum.value
    get(`/login?total=${encodeURIComponent(userName.value + "," + phone,(user))}`)
}