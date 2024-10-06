import pandas as pd
import numpy as np
import re
import json
import random


def calcular_snr(snr0, r_star, r_planet, d, es, ps):
    """
    Calculates the signal-to-noise ratio (SNR).

    Parameters:
    snr0 (float): Reference SNR.
    r_star (float): Radius of the star (Rsun).
    r_planet (float): Radius of the planet (REarth).
    d (float): Diameter of the telescope (m).
    es (float): Distance to the planetary system (pc).
    ps (float): Distance planet-star (AU).

    Returns:
    float: Calculated SNR value.
    """
    return snr0 * ((r_star * r_planet * (d / 6)) / ((es / 10) * ps)) ** 2


def calcular_esmax(d, ps):
    """
    Calculates the maximum distance (ESmax) to separate the planet from the star.

    Parameters:
    d (float): Diameter of the telescope (m).
    ps (float): Distance planet-star (AU).

    Returns:
    float: Calculated ESmax value (pc).
    """
    return 15 * (d / 6) / ps


# 1. Read the CSV file ignoring lines that start with '#'
df = pd.read_csv("raw.csv", delimiter=",", comment="#")

# 2. Replace empty values with NaN
df_clean = df.replace("", np.nan)

# 3. Convert columns to numpy arrays (or use them directly as pandas DataFrame)
loc_rowid = np.array(df_clean["loc_rowid"])
pl_name = np.array(df_clean["pl_name"])
hostname = np.array(df_clean["hostname"])
sy_snum = np.array(df_clean["sy_snum"])
disc_telescope = np.array(df_clean["disc_telescope"])
pl_orbper = np.array(df_clean["pl_orbper"])
pl_orbsmax = np.array(df_clean["pl_orbsmax"])
pl_rade = np.array(df_clean["pl_rade"])
pl_dens = np.array(df_clean["pl_dens"])
pl_orbeccen = np.array(df_clean["pl_orbeccen"])
pl_orbincl = np.array(df_clean["pl_orbincl"])
pl_orbtper = np.array(df_clean["pl_orbtper"])
pl_orblper = np.array(df_clean["pl_orblper"])
st_rad = np.array(df_clean["st_rad"])
sy_dist = np.array(df_clean["sy_dist"])

# 4. Extract telescope diameters
telescope_diameters = np.array(
    [
        float(match.group(1))
        if (match := re.search(r"(\d+(\.\d+)?) m", name))
        else np.nan
        for name in disc_telescope
    ]
)

# 5. Create a boolean mask to filter valid elements
valid_mask = ~np.isnan(telescope_diameters)

# 6. Filter all variables using the mask
loc_rowid = loc_rowid[valid_mask]
pl_name = pl_name[valid_mask]
hostname = hostname[valid_mask]
sy_snum = sy_snum[valid_mask]
disc_telescope = disc_telescope[
    valid_mask
]  # Keep the original names of valid telescopes
pl_orbper = pl_orbper[valid_mask]
pl_orbsmax = pl_orbsmax[valid_mask]
pl_rade = pl_rade[valid_mask]
pl_dens = pl_dens[valid_mask]
pl_orbeccen = pl_orbeccen[valid_mask]
pl_orbincl = pl_orbincl[valid_mask]
pl_orbtper = pl_orbtper[valid_mask]
pl_orblper = pl_orblper[valid_mask]
st_rad = st_rad[valid_mask]
sy_dist = sy_dist[valid_mask]

# Filter 'sy_snum' to get only those with 1 star
one_star_mask = np.array([snum == 1 for snum in sy_snum])

# Apply the mask to all variables
loc_rowid = loc_rowid[one_star_mask]
pl_name = pl_name[one_star_mask]
hostname = hostname[one_star_mask]
disc_telescope = disc_telescope[one_star_mask]
pl_orbper = pl_orbper[one_star_mask]
pl_orbsmax = pl_orbsmax[one_star_mask]
pl_rade = pl_rade[one_star_mask]
pl_dens = pl_dens[one_star_mask]
pl_orbeccen = pl_orbeccen[one_star_mask]
pl_orbincl = pl_orbincl[one_star_mask]
pl_orbtper = pl_orbtper[one_star_mask]
pl_orblper = pl_orblper[one_star_mask]
st_rad = st_rad[one_star_mask]
sy_dist = sy_dist[one_star_mask]

# Reference values
snr0 = 100  # Example, you can adjust this

# Create arrays to store results
snr_results = np.zeros(len(loc_rowid))  # Change to the length of loc_rowid
esmax_results = np.zeros(len(loc_rowid))  # Change to the length of loc_rowid

# Run calculations for each entry
for i in range(len(loc_rowid)):
    # Retrieve values for this iteration
    r_star = st_rad[i]
    r_planet = pl_rade[i]
    d = telescope_diameters[i]
    es = sy_dist[i]
    ps = pl_orbsmax[i]

    # Calculate SNR and ESmax
    snr_results[i] = calcular_snr(snr0, r_star, r_planet, d, es, ps)
    esmax_results[i] = calcular_esmax(d, ps)

characterizable_planet = (snr_results > 5) & (pl_orbsmax < esmax_results)

pl_name = pl_name.astype(str)
hostname = hostname.astype(str)
disc_telescope = disc_telescope.astype(str)


# Function to generate a random hex color
def random_hex_color():
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))


data_to_json = []

for i in range(len(pl_name)):
    radius_km = float(pl_rade[i]) * 6378.1  # Convert to kilometers
    data_to_json.append(
        {
            "elements": {
                "argOfPeriapsis": float(pl_orblper[i]),
                "period": float(pl_orbper[i]),
                "eccentricity": float(pl_orbeccen[i]),
                "semiMajorAxis": float(pl_orbsmax[i]),
                "epoch": float(
                    pl_orbtper[i]
                ),  # Make sure this is a numeric value
                "inclination": float(pl_orbincl[i]),
                "hostname": str(hostname[i]),
                "disc_telescope": str(disc_telescope[i]),
                "density": float(pl_dens[i]),
                "star_radius": float(st_rad[i]),
                "star_distance": float(sy_dist[i]),
                "snr": float(snr_results[i]),
                "esmax": float(esmax_results[i]),
                "isCharacterizable": bool(
                    characterizable_planet[i]
                ),  # Make sure this is a boolean
            },
            "name": str(pl_name[i]),
            "customOrbit": f"Custom {pl_name[i]} Orbit",
            "radius": radius_km,  # Consider the value in kilometers
            "orbitColor": random_hex_color(),
            "type": "planet",
            "id": int(loc_rowid[i]),  # Make sure this is an integer
        }
    )

# Save the JSON
with open("data.json", "w", encoding="utf-8") as json_file:
    json.dump(data_to_json, json_file, ensure_ascii=False, indent=4)
