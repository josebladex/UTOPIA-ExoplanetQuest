
import json

# Función para eliminar claves con valores nulos
def eliminar_claves_vacias(json_data_list):
    # Identificamos las claves que tienen valores nulos en cualquiera de los JSON
    claves_vacias = set()
    
    # Recorremos cada JSON para encontrar las claves vacías
    for json_data in json_data_list:
        for clave, valor in json_data.items():
            if valor is None or valor == "" or (isinstance(valor, list) and not valor) or (isinstance(valor, dict) and not valor):
                claves_vacias.add(clave)
    
    # Eliminamos las claves vacías de todos los JSON
    for json_data in json_data_list:
        for clave in list(json_data.keys()):
            if clave in claves_vacias:
                del json_data[clave]

    return json_data_list

# Leer los 6 archivos JSON
nombres_archivos = ['jsons\Distance.json', 'jsons\planet_name.json', 'jsons\Planet_Radius.json', 'jsons\planet-star_distance.json', 'jsons\Stellar_Radius.json', 'jsons/telescope.json']
json_data_list = []
lengths = []

for archivo in nombres_archivos:
    with open(archivo, 'r') as f:
        data = json.load(f)
        json_data_list.append(data)
        lengths.append(len(data))  # Obtener el tamaño (longitud) del JSON y agregarlo al array

# Eliminar las claves vacías
json_data_list = eliminar_claves_vacias(json_data_list)

# Guardar los archivos modificados
for i, archivo in enumerate(nombres_archivos):
    with open(archivo, 'w') as f:
        json.dump(json_data_list[i], f, indent=4)

print("Longitudes de cada archivo JSON:", lengths)

#