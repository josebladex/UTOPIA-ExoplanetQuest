<div align="center">
    <h1>🌌 UTOPIA-ExoplanetQuest</h1>
    <h3>🚀 Habitable Worlds Observatory Navigator</h3>
</div>

## 🌠 Project Overview

Welcome to **UTOPIA-ExoplanetQuest**—a futuristic journey through our galaxy's habitable worlds! This project was created for the **2024 NASA Space Apps Challenge**, inspired by the challenge **"Navigator for the Habitable Worlds Observatory (HWO): Mapping the Characterizable Exoplanets in our Galaxy."** Our mission is to visualize the pathways to exoplanets near our solar system and assess their potential for characterization by the HWO. Buckle up for a voyage through the stars! 🌌

## 🛰️ Table of Contents

- [🚀 Background](#-background)
- [✨ Project Features](#-project-features)
- [🛠️ Technology Stack](#-technology-stack)
- [📖 Usage](#-usage)
- [🌍 Visit Live Project](#-visit-live-project)

## 🚀 Background

Since 1995, astronomers have uncovered thousands of **exoplanets**—worlds orbiting distant stars. Most of these discoveries have come through indirect methods, but that’s about to change! 🌠 The **Habitable Worlds Observatory (HWO)** is NASA's next big leap, designed to directly image exoplanets and reveal secrets of these Earth-like planets. With UTOPIA-ExoplanetQuest, you can explore which exoplanets are in HWO's sights, and how they could be our next interstellar neighbors.

Three key factors that shape HWO’s ability to characterize exoplanets are:

1. **🌌 Distance to the Exoplanetary System**: Distant exoplanets appear fainter and closer to their host stars.
2. **🔭 Telescope Diameter**: A larger telescope can distinguish exoplanets from their host stars more easily, improving observation clarity.
3. **📡 Signal-to-Noise Ratio**: A larger telescope can distinguish exoplanets from their host stars more easily, improving observation clarity.

## ✨ Project Features

- 🌌 **Interactive Galaxy Map**: Explore known exoplanets and their potential observation routes with a 3D visualization.
- 🗃️ **Archive with data table to observ exoplanets properties**: Use filters from the NASA Exoplanet Archive to customize your search for characterizable worlds.
- 👨‍💻 **User-Friendly Interface**: Navigate through potential targets for the next big mission in space exploration with ease.

## 🛠️ Technology Stack

Here's the tech powering our voyage through the stars:

- **Frontend**:
  - ⚛️ **Next.js** + **TypeScript**
  - 🎨 **Tailwind CSS** for a sleek and responsive design
  - 🌌 **three.js** for stunning 3D visualizations
  - 🧑‍💻 **ShadCN UI** and **Accertinity UI** for smooth user interactions
- **Backend**:
  - 🐍 **Python.js** for seamless backend operations

### Key Features:
- **Interactive Galaxy Map**: Users can navigate through a 3D space to explore various exoplanets.
- **Exoplanet Data Visualization**: Provides details on exoplanets, allowing users to identify potential targets for future space missions.
- **Data Integration**: Information about exoplanets is sourced from the **NASA Exoplanet Archive**. Since real-time access is unavailable, data is downloaded in **CSV** format and processed locally.

### Data Flow:
- The exoplanet data is stored locally in the **public/data** folder in JSON format, after being processed by the Back-End.
  
## Back-End

The **Back-End** handles data processing and manipulation for the exoplanet information obtained from the NASA Exoplanet Archive.

### Data Processing Flow:
1. **CSV to JSON Conversion**: The downloaded **CSV** data is converted to **JSON** for more efficient manipulation.
2. **Data Extraction**: Relevant data fields include:
   - Planet Name
   - Star Name (Host Name)
   - Number of Stars
   - Discovery Telescope
   - Orbital Period (days)
   - Semi-Major Axis (AU)
   - Planet Radius (in Earth radii)
   - Planet Density (g/cm³)
   - Eccentricity
   - Inclination (degrees)
   - Periastron Epoch (days)
   - Argument of Periastron (degrees)
   - Stellar Radius (in Solar radii)
   - Distance (pc)
3. **Handling Missing Data**: A variable called **"nan"** is assigned to missing data points, which is used during the filtering process.

### Data Filtering:
The Back-End applies three main filters to ensure only relevant data is retained:
- **Filter No. 1**: Discards exoplanets with an unknown telescope diameter, as this value is required to calculate the **SNR (Signal-to-Noise Ratio)**.
- **Filter No. 2**: Removes exoplanets with more than one star as their central celestial body to focus on potentially habitable planets.
- **Filter No. 3**: Uses `cleaner.py` to discard exoplanets that still contain a **"nan"** value in key fields. Then, `host_generator.py` generates a list of host names from the remaining data.

Once the filters are applied, the cleaned data is saved in the **data.json** file, located in the **BackEnd** folder, and the host data is stored in the **Host** folder, ready for use in the Front-End.

## Benefits and Objectives

UTOPIA-ExoplanetQuest aims to provide an interactive tool for the exploration of exoplanets and their characteristics. With this project, users can gain insights into potential destinations for future space missions and contribute to the advancement of **astrobiology**.

### Key Objectives:
- **Facilitate Exploration**: Empower users to visualize and explore exoplanets and their potential for habitability.
- **Analyze NASA's Data**: Provide a platform to analyze data from the NASA Exoplanet Archive.
- **Promote Education**: Enhance understanding of exoplanetary systems and inspire curiosity about space exploration.

We hope that this project serves as a valuable resource for researchers, students, and space enthusiasts alike.

## 📖 Front End Usage

Ready to start exploring on your local machine? Follow these steps:

# Prerequisites

- **Node.js**: Make sure you have Node.js (version 16 or higher) installed. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm**: We'll be using `pnpm` as a package manager. If you don't have it installed, you can do so by running:

   ```bash
   npm install -g pnpm

1. **Clone the repository**:

   ```bash
   git clone https://github.com/josebladex/UTOPIA-ExoplanetQuest
   cd UTOPIA-ExoplanetQuest/FronEnd

2. **Install dependencies**:

   ```bash
   pnpm install
3. **Run the development server**:

   ```bash
   pnpm run dev
4. **Explore the cosmos: Open http://localhost:3000 in your browser and start your journey!**

## 🌍 Visit Live Project
Experience UTOPIA-ExoplanetQuest live at:

https://utopia-exoplanet-quest.vercel.app/

Let the stars guide your way as you discover the habitable worlds of our galaxy! ✨