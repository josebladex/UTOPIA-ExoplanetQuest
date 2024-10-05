import json
import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv("C:/Users/joaqu/Desktop/UTOPIA_EXOPLANET_PROJECT/UTOPIA-ExoplanetQuest-/BackEnd/PS_2024.10.05_08.38.11.csv", sep=';')  # Change ';' to your actual delimiter

# Drop rows with NaN values in any column
df.dropna(inplace=True)

# Specify the output JSON file path
json_file = 'C:/Users/joaqu/Desktop/UTOPIA_EXOPLANET_PROJECT/UTOPIA-ExoplanetQuest-/BackEnd/data.json'

# Convert the DataFrame to a list of dictionaries
data = df.to_dict(orient='records')

# Write the data to a JSON file
with open(json_file, mode='w', encoding='utf-8') as file:
    json.dump(data, file, indent=6)

print(f"Archivo JSON generado: {json_file}")
