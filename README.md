
# Soilify

Soilify is a web application designed to help users analyze soil quality and receive recommendations for optimal crop growth. It leverages modern web technologies to provide a seamless and interactive user experience.

## Table of Contents
- [About the Project](#about-the-project)
- [Web Application Details](#web-application-details)
- [Project Structure](#project-structure)
- [Features](#features)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project
Soilify is aimed at farmers and agricultural professionals in the Medak district of Telangana, India, who need to understand the quality of their soil to make informed decisions about crop planting. By entering soil data, users can get insights into soil health and suggestions for crop suitability.

## Web Application Details
The Soilify web application is built using the following technologies:

- **Build Tool**: Vite
- **Framework**: React.js
- **UI Library**: Chakra UI
- **Language**: JavaScript (ES6+)
- **Deployment**: The application is deployed on Vercel

### Geospatial Data Layers
The website provides the following geospatial data layers:
- Crop type Rabi and Kharif
- Crop health
- Cover crop
- Soil organic carbon
- Evapotranspiration
- Land use land cover

## Project Structure
The project repository is organized as follows:

- **/public**: Contains static files like index.html, which is the main entry point of the application.
- **/src**: Contains the source code for the application.
  - **/components**: React components that make up the UI.
  - **/assets**: Images, icons, and other static assets.
  - **/styles**: CSS and styling files.
  - **/utils**: Utility functions and helper modules.
  - **/services**: API service calls and data fetching functions.
- **/server**: Contains the backend server code, primarily built with Express.js.
  - **/routes**: Defines the API endpoints.
  - **/controllers**: Contains the logic for handling requests and responses.
  - **/models**: Defines the data models and schema.
- **package.json**: Lists the project dependencies and scripts.
- **README.md**: Provides information about the project.

## Features
- **UI Interactivity**: User-friendly interface with interactive elements built with React.js and Chakra UI.
- **Zonal Statistics Calculation**: Ability to calculate zonal statistics for soil organic carbon (SOC).
- **Data Visualization**: Visualize various agroforestry data layers including crop type, crop health, cover crop, soil organic carbon, evapotranspiration, and land use land cover.

## Usage
To use the Soilify web application, visit [Soilify Website](https://soilify.vercel.app/).

## Screenshots
![Screenshot1](link-to-screenshot1)
![Screenshot2](link-to-screenshot2)

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
SaptarshiVertify - [Email](mailto:saptarshi@earthanalytics.in)

Project Link: [Vertify Soilify Github](https://github.com/vertify-earth/Soilify)

Webpage: [Soilify Website](https://soil-and-crop-monitor.vercel.app/)
