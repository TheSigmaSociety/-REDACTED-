import requests
if __name__ == "__main__":
    print(requests.get("http://127.0.0.1:5000/scare",json={"name":"david lin"}).content)
    #print(requests.post("http://localhost:5000/savedata", json={"david lin": {"age": 1, "steps": 0, "location": "13410 ne 80th st, redmond, wa 98052"}}).content)
    