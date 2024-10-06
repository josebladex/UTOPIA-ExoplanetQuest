import numpy as np
import json
import re

def calcular_snr(snr0, r_star, r_planet, d, es, ps):
    """
    Calcula la relación señal-ruido (SNR).
    
    Parámetros:
    snr0 (float): SNR de referencia.
    r_star (float): Radio de la estrella (Rsun).
    r_planet (float): Radio del planeta (REarth).
    d (float): Diámetro del telescopio (m).
    es (float): Distancia al sistema planetario (pc).
    ps (float): Distancia planeta-estrella (AU).
    
    Retorna:
    float: Valor calculado de SNR.
    """
    return snr0 * ((r_star * r_planet * (d / 6)) / ((es / 10) * ps)) ** 2


def calcular_esmax(d, ps):
    """
    Calcula la distancia máxima (ESmax) para separar el planeta de la estrella.
    
    Parámetros:
    d (float): Diámetro del telescopio (m).
    ps (float): Distancia planeta-estrella (AU).
    
    Retorna:
    float: Valor calculado de ESmax (pc).
    """
    return 15 * (d / 6) / ps

# Lista de rutas a los archivos JSON
file_paths = [
    'jsons/telescope.json',
    'jsons/Stellar_Radius.json',
    'jsons/planet-star_distance.json',
    'jsons/Planet_Radius.json',
    'jsons/planet_name.json',
    'jsons/Distance.json'
]

# Diccionario para almacenar los arrays de NumPy
data_arrays = {}

# Leer cada archivo JSON y almacenar sus valores en un array de NumPy
for file_path in file_paths:
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            values_array = np.array(list(data.values()))
            data_arrays[file_path] = values_array  # Almacenar el array en el diccionario
    except FileNotFoundError:
        print(f"El archivo no se encontró en la ruta: {file_path}")
    except json.JSONDecodeError:
        print(f"Error al decodificar el JSON en el archivo: {file_path}")

# Crear variables para almacenar los arrays con nombres representativos
telescope_names = data_arrays['jsons/telescope.json']  
stellar_radii = data_arrays['jsons/Stellar_Radius.json']  
planet_star_distances = data_arrays['jsons/planet-star_distance.json']  
planet_radii = data_arrays['jsons/Planet_Radius.json']  
planet_names = data_arrays['jsons/planet_name.json']  
distances = data_arrays['jsons/Distance.json']  

# Extracción de diámetros de telescopios
telescope_diameters = np.array([
    float(match.group(1)) if (match := re.search(r"(\d+(\.\d+)?) m", name)) else np.nan
    for name in telescope_names
])

# Crear una máscara booleana para filtrar elementos válidos
valid_mask = ~np.isnan(telescope_diameters)

# Filtrar todas las variables utilizando la máscara
telescope_diameters = telescope_diameters[valid_mask]  # Diametros del telescopio (metros)
stellar_radii = stellar_radii[valid_mask]  # Radio de la estrella (R* [Rsun])
planet_star_distances = planet_star_distances[valid_mask]  # Distancia planeta-estrella (PS [AU])
planet_radii = planet_radii[valid_mask]  # Radio del planeta (RP [REarth])
planet_names = planet_names[valid_mask]  # Nombre del planeta 
distances = distances[valid_mask]  # Distancia al sistema planetario (en parsecs [pc])

# Valores de referencia
snr0 = 100  # Ejemplo, puedes ajustarlo

# Crear arrays para almacenar los resultados
snr_results = np.zeros(len(telescope_diameters))
esmax_results = np.zeros(len(telescope_diameters))

# Ejecutar los cálculos para cada entrada
for i in range(len(telescope_diameters)):
    # Recuperar valores para esta iteración
    r_star = stellar_radii[i]
    r_planet = planet_radii[i]
    d = telescope_diameters[i]
    es = distances[i]
    ps = planet_star_distances[i]
    
    # Calcular SNR y ESmax
    snr_results[i] = calcular_snr(snr0, r_star, r_planet, d, es, ps)
    esmax_results[i] = calcular_esmax(d, ps)
    characterizable_planet = (snr_results > 5) & (planet_star_distances < esmax_results)

