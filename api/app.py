from flask import Blueprint, jsonify, request, Flask
from generator import *
import random

app = Flask(__name__)
model = build_model(batch_size=1)


@app.route('/get_name', methods=['POST', "GET"])
def get_name():
    print(request.data) 
    name_json  = request.get_json()
    name       = name_json['name'] 
    temprature = float(name_json['temprature'])    

    if(temprature<=0):
        temprature = 1.0
    
    # print(name, temprature)
    predicted_name = []

    for i in range(10):
        predicted_name.append(generate_text(model, name, temprature))

    return jsonify({"predicted_name": predicted_name})


@app.route('/get_random_name', methods=['POST', "GET"])
def get_random_name():

    # print(name, temprature)
    predicted_name = []

    for i in range(10):
        name = ""
        for i in range(random.randint(1,1)):
            name += chr(random.randint(97, 122))
        print(name)

        temprature = float(random.randint(1,3))

        predicted_name.append(generate_text(model, name, temprature))

    return jsonify({"predicted_name": predicted_name})

if __name__ == '__main__':
    app.run(debug=True)