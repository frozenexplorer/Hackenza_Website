import csv 
import random 
import re 
import json 

num_rows = 1423

def extract_uids_from_js(file_path):
    uids = []
    with open(file_path, 'r', encoding = 'utf-8') as file:
        js_code = file.read()

        matches = re.findall(r'["\']uid["\']:\s*["\'](.*?)["\']', js_code)

        uids.extend(matches)

    return uids 

file_path = r'https://github.com/frozenexplorer/Hackenza_Website/blob/main/roads.js'

uids = extract_uids_from_js(file_path)
print(uids)
rainfall = [random.uniform(0.9, 23.7) for _ in range(num_rows)]
slope = [random.uniform(198, 233) for _ in range(num_rows)] 
div = [slope[i]/rainfall[i] for i in range(num_rows)]
fi = [0 for i in range(num_rows)]

for i in range(num_rows):
    data = div[i]
    if data >= 9 and data <= 9.8:
        fi[i] = 10
    elif data > 9.8 and data <= 11.5:
        fi[i] = 9
    elif data > 11.5 and data <= 13:
        fi[i] = 8
    elif data > 13 and data <= 17:
        fi[i] = 7
    elif data > 17 and data <= 24:
        fi[i] = 6
    elif data > 24 and data <= 30:
        fi[i] = 5
    elif data > 30 and data <= 55:
        fi[i] = 4
    elif data > 55 and data <= 80:
        fi[i] = 3
    elif data > 80 and data <= 120:
        fi[i] = 2
    else:
        fi[i] = 1

with open(r'https://github.com/frozenexplorer/Hackenza_Website/blob/main/roads.js', 'w', newline = '') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['uids', 'Rainfall', 'Slope', 'Slope/Rainfall', 'Flood Intensity'])
    for i in range(num_rows):
        writer.writerow([uids[i], rainfall[i], slope[i], div[i], fi[i]])



