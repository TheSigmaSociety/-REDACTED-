from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
app = Flask(__name__)
CORS(app)
load_dotenv()
url = "localhost:5000"
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY") 
)
userdataPath = "data.json" #wait what isint it data.json or am i high

def openAiRequest(prompt, input):
    chat_completion = client.chat.completions.create(
    model="gpt-4o-mini", #hugo add model
    messages=[{"role":"system","content":prompt},
        {"role": "user", "content": input}]
    )
    return chat_completion.choices[0].message.content

@app.route('/savedata', methods=['POST'])
def saveData(): # {"name": {"age": n, "steps": n, "location": n, "heartdisease": bool,"lat":n,"long":n}}
    send = request.get_json()
    with open(userdataPath, 'r') as f:
        filedata = json.load(f)
    filedata.update(send)
    with open(userdataPath, 'w') as f:
        json.dump(filedata, f)
    return jsonify({"status":"posted"})

    
@app.route('/scare', methods=['GET'])
def scareSeniors():
    name = request.args.get('name')  # {"name":"walter"}
    with open(userdataPath,'r') as file:
        data = json.load(file)
    healthOfPerson = json.dumps(data[name])
    prompt = "The user input consists of a JSON with different health indicators for a senior citizen, such as age, amount of exercise (steps) per day, and heart disease history. Your goal is to provide a grave and serious warning to the user senior citizen about future threats to their health and potentially life IF their excersize quantity (>6500 a day is considered healthy) could lead health complications (such as only a small amount of steps per day). compliment the user if they are doing well in a category, but the goal is to induce fear into the senior citizens that have bad habits or prior health complications so that they will resume their excersizing and activities in order to improve their health overall. additionally, state how much exersice is healthy. Limit your response to 500 characters ONLY. DO NOT GO ABOVE 500 CHARACTERS and USE BULLET POINTS instead of a long paragraph and DO NOT use any form of text formatting such as bold or italics."
    return jsonify({"response": openAiRequest(prompt, healthOfPerson)})

@app.route('/login', methods=['GET'])
def login():
    result = request.args.get('total').split(",")  # "name,phone"
    with open(userdataPath,'r') as file:
        data = json.load(file)
    if result[0] in data:
        if result[1] == data[result[0]]['phone']:
            print("har har har har har har har har har har har har")
            return jsonify({"status":"success"})
        return jsonify({"status":"wrong phone number"})
    return jsonify({"status":"wrong name"})




@app.route('/leoLianLocator',methods=['GET'])
def leoLianNeedsYourLocaitonForYourSaftey():
    result = request.args.get('name')
    with open(userdataPath,'r') as file:
        data = json.load(file)
    totalDict = {}
    
    lat,long = int(data[result]['lat']), int(data[result]['long'])
    for key,value in data.items():
        leoDistance = abs(int(value['lat']) - lat) + abs(int(value['long']) - long)
        totalDict[leoDistance] = [key,value['location']]

    sortedThing = dict(sorted(totalDict.items()))
    first_five = list(sortedThing.items())[1:6]
    out = {}
    iterator = 0
    for k in first_five:
        out[k[0]] = k[1]
        iterator+=1
        if(iterator == 5):
            break
    return jsonify(out)


if __name__ == '__main__':
    app.run()
