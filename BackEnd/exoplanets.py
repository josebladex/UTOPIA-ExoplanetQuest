import csv
import json

# Inicializamos listas vacías para cada columna
pl_name = []
disc_telescope = []
pl_orbsmax = []
pl_rade = []
st_rad = []
sy_dist = []

# Abrimos y leemos el archivo CSV
with open('exoplanets.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)

    # Imprimimos los nombres de las columnas para depuración
    print("Nombres de columnas detectados:", reader.fieldnames)
    
    # Iteramos sobre cada fila del archivo
    for row in reader:
        # Agregamos cada valor a su lista correspondiente, usando .get() para evitar errores de clave
        pl_name.append(row.get('pl_name', '').strip())
        disc_telescope.append(row.get('disc_telescope', '').strip())
        pl_orbsmax.append(row.get('pl_orbsmax', '').strip())
        pl_rade.append(row.get('pl_rade', '').strip())
        st_rad.append(row.get('st_rad', '').strip())
        sy_dist.append(row.get('sy_dist', '').strip())

# Mostramos el contenido de una de las listas como ejemplo
print("Nombres de planetas:", pl_name)

