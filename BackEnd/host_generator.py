import json
import os
from collections import defaultdict

# Create the subfolder if it does not exist
output_folder = 'Host'
os.makedirs(output_folder, exist_ok=True)

# Load the original JSON file
with open('data.json', 'r') as file:
    exoplanets = json.load(file)

# Dictionary to group exoplanets by hostname
stellar_systems = defaultdict(list)

# Iterate over each exoplanet in the JSON
for planet in exoplanets:
    hostname = planet['elements']['hostname']
    stellar_systems[hostname].append(planet)

# Create a new JSON for each stellar system
for i, (hostname, planets) in enumerate(stellar_systems.items(), start=1):
    # Create the structure for the first element (the star)
    star_radius = planets[0]['elements']['star_radius'] * 696342  # Multiply star_radius by 696342
    star_data = {
        "lightEmitting": True,
        "name": hostname,  # The name of the star comes from the hostname
        "customOrbit": f"Custom{hostname.replace(' ', '')}Orbit",
        "radius": star_radius,  # Radius calculated with the multiplication
        "type": "star",  # Define as type star
        "id": i * 1000000,
        "fetchElements": False
    }

    # List to store the elements of the star and the planets
    system = [star_data]

    # Add each planet from the stellar system
    for j, planet in enumerate(planets, start=1):
        planet_data = {
            "elements": {
                "argOfPeriapsis": planet['elements'].get('argOfPeriapsis', 0),
                "period": planet['elements'].get('period', 0),
                "eccentricity": planet['elements'].get('eccentricity', 0),
                "semiMajorAxis": planet['elements'].get('semiMajorAxis', 0),
                "epoch": planet['elements'].get('epoch', 0),
                "inclination": planet['elements'].get('inclination', 0)
            },
            "name": planet['name'],
            "customOrbit": planet.get('customOrbit', f"Custom{planet['name']}Orbit"),
            "radius": planet.get('radius', 0),
            "orbitColor": planet.get('orbitColor', "#FFFFFF"),
            "type": planet.get('type', "planet"),
            "id": i * 1000000 + j * 100  # Generate unique IDs
        }
        system.append(planet_data)

    # Save the stellar system JSON in the subfolder
    filename = os.path.join(output_folder, f'{hostname.replace(" ", "_")}.json')
    with open(filename, 'w') as outfile:
        json.dump(system, outfile, indent=4)

    print(f"Generated file {filename}")
