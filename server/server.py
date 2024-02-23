from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
import pandas as pd


app = Flask(__name__)
CORS(app)

def detect_text(text):
        pipe = pipeline("text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment")
        return (pipe(text))

@app.route("/api/add", methods=['POST'])
def add_numbers():
    try:
        data = request.get_json()
        result1 = data.get('numA')
        result = detect_text(result1)
        print(result)

        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
