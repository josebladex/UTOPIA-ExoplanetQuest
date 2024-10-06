# Supongamos que ya tienes el array de distancias como un ndarray
distances = 0  # Array de distancias

# Convierte el ndarray a una lista
distances_list = distances.tolist()

# Define el nombre del archivo donde se guardará el array
output_file = 'distances.txt'

# Abre el archivo en modo escritura
with open(output_file, 'w') as file:
    # Convierte la lista a texto en formato JSON y escribe en el archivo
    json.dump(distances_list, file)

print(f"Array de distancias exportado a {output_file}.")