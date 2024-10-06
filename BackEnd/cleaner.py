import json
import math

# Read the JSON from a file
with open('data.json', 'r') as file:  # Make sure the file is named 'data.json'
    data = json.load(file)

# Function to clean the JSON
def clean_json(data):
    cleaned_data = []
    for item in data:
        # Check if any value in 'elements' is NaN
        if not any(math.isnan(v) if isinstance(v, float) else False for v in item['elements'].values()):
            cleaned_data.append(item)
    return cleaned_data

# Clean the JSON
cleaned_data = clean_json(data)

# Save the cleaned JSON to a new file
with open('data.json', 'w') as file:
    json.dump(cleaned_data, file, indent=4)

# Display the result in the console
print(json.dumps(cleaned_data, indent=4))
