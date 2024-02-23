from transformers import pipeline
import pandas as pd

pipe = pipeline("text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment")

input = "Hello there! How can I assist you today?"

print(pipe(input))