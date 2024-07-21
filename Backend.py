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
    api_key=os.getenv("OPENAI_API_KEY") #freddy fazbear har har har har har har
)
userdataPath = "data.json" #wait what isint it data.json or am i high
#format:

def openAiRequest(prompt, input):
    chat_completion = client.chat.completions.create(
    model="gpt-4o-mini", #hugo add model
    messages=[{"role":"system","content":prompt},
        {"role": "user", "content": input}]
    )
    return chat_completion.choices[0].message.content

@app.route('/savedata', methods=['POST'])
def saveData(): # {"name": {"age": n, "steps": n, "location": n, "heartdisease": bool}}
    send = request.get_json()
    with open(userdataPath, 'r') as f:
        filedata = json.load(f)
    filedata.update(send)
    with open(userdataPath, 'w') as f:
        json.dump(filedata, f)
    return jsonify({"status":"posted"})

    
@app.route('/scare', methods=['GET'])
def scareSeniors():
    result = request.get_json()  # {"name":"walter"}
    with open(userdataPath,'r') as file:
        data = json.load(file)
    healthOfPerson = data['name']
    prompt = "The user input consists of a JSON with different health indicators for a senior citizen, such as age, amount of exercise per week, and heart disease history. Your goal is to provide a grave and serious warning to the user senior citizen about future threats to their health and potentially life. The goal is to induce fear into the senior citizens so that they will resume their excersizing and activities in order to improve their health overall. Limit your response to 500 characters ONLY. DO NOT GO ABOVE 500 CHARACTERS."
    return jsonify({"response": openAiRequest(prompt, healthOfPerson)})

@app.route('/login', methods=['GET'])
def login():
    result = request.get_json()  # {"name":"walter", "phone":"1234567890}
    with open(userdataPath,'r') as file:
        data = json.load(file)
    if result['name'] in data:
        if result['phone'] == data[result['name']]['phone']:
            print("har har har har har har har har har har har har")
            return jsonify({"status":"success"})
        return jsonify({"status":"wrong phone number"})
    return jsonify({"status":"wrong name"})

if __name__ == '__main__':
    app.run()