from PyPDF2 import PdfReader
from transformers import pipeline

def pdfprocess(file):
    reader = PdfReader(file)
    pipe = pipeline("text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment")
    total_score = 0
    label_count = {}

    for i in range(len(reader.pages)):
        page = reader.pages[i]
        text = page.extract_text()

        max_seq_length = 512
        chunks = [text[j:j + max_seq_length] for j in range(0, len(text), max_seq_length)]
    
        for chunk in chunks:
            res = pipe(chunk)        
            
            total_score += res[0]['score']
            print(total_score)
            
            label = res[0]['label']
            label_count[label] = label_count.get(label, 0) + 1

    average_score = total_score / len(reader.pages)

    average_label = max(label_count, key=label_count.get)
    
    return average_score, average_label

print(f"Average Score: {average_score}")
print(f"Most Frequent Label: {average_label}")
