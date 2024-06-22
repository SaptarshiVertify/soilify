// MapComponent.jsx
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { Button, Box, Spinner } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import PopupContent from "./PopupContent";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2MDUxMCIsImEiOiJjbGNoaG41czEwYmxuM3FtOWNvemVub3lkIn0.5hN1wrZNfw-7YmnNYKM2YQ"; // Replace with your Mapbox access token

function MapComponent({
  switchState,
  isDisabled,
  selectedComponent,
  drawing,
  setDrawing,
  layerOpacity,
  basemap,
  socVis,
  setGraph,
}) {
  // State to control cursor coordinates
  const [cursorCoordinates, setCursorCoordinates] = useState({
    lng: 0,
    lat: 0,
  });
  // State to control drawn polygon
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  // State to control map
  const [map, setMap] = useState(null);

  // State to control popup
  const [popup, setPopup] = useState(null);

  // Function to create map instance
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: "map", // ID of the container element
      style: "mapbox://styles/dev0510/clxe361zh001m01qmh7rh0bo7", // Map style to use
      center: [78.288, 18.039], // Initial map center in [lng, lat]
      zoom: 12, // Initial map zoom level
      pitchWithRotate: false, // Disable pitch with rotate
      touchPitch: false, // Disable pitch with touch
      maxBounds: [77.79, 17.68, 78.59, 18.22],
    });
    mapInstance.on("load", () => {
      // Add search control
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search for places",
      });
      mapInstance.addControl(geocoder, "top-right");

      // Add navigation control
      const nav = new mapboxgl.NavigationControl();
      mapInstance.addControl(nav, "top-right");
      // Set the map instance to state
      setMap(mapInstance);

      // Add mousemove event listener
      mapInstance.on("mousemove", (e) => {
        setCursorCoordinates({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat,
        });
      });
    });

    return () => mapInstance.remove();
  }, []);

  // Function to let polygon drawing
  useEffect(() => {
    setDrawing("no");
    // Collect the navigation and geocoder elements
    const geocoderElement = document.querySelector(".mapboxgl-ctrl-geocoder");
    const navElement = document.querySelector(".mapboxgl-ctrl-group");
    // Set the visibility of the elements to visible
    if (geocoderElement) {
      geocoderElement.style.display = "block";
    }
    if (navElement) {
      navElement.style.display = "block";
    }
    if (isDisabled && map) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
      });

      // Remove any existing polygon layer before drawing a new one
      if (map.getLayer("drawn-polygon")) {
        map.removeLayer("drawn-polygon");
        map.removeSource("drawn-polygon");
        map.removeLayer("drawn-polygon-border");
        map.removeSource("drawn-polygon-border");
      }

      const drawingMap = new mapboxgl.Map({
        container: "drawing-map", // ID of the container element
        style: "mapbox://styles/dev0510/cltmixqve01jb01pjey6jhjig", // Your blank style URL
        center: map.getCenter(), // Sync center with the main map
        zoom: map.getZoom(), // Sync zoom with the main map
        interactive: false, // Disable interactions on the drawing map
      });

      drawingMap.addControl(draw);

      // Start drawing mode immediately
      drawingMap.on("load", () => {
        draw.changeMode("draw_polygon");
        setDrawing("yes"); // Drawing enabled

        // Set the visibility of the elements to none
        if (geocoderElement) {
          geocoderElement.style.display = "none";
        }
        if (navElement) {
          navElement.style.display = "none";
        }
      });

      drawingMap.on("draw.create", (event) => {
        const { features } = event;
        const polygon = features[0];
        setDrawnPolygon(polygon);
        setDrawing("drawn"); // Polygon is created
      });

      drawingMap.on("draw.update", (event) => {
        const { features } = event;
        const polygon = features[0];
        setDrawnPolygon(polygon); // Polygon is updated
      });

      return () => {
        drawingMap.remove();
      };
    }
  }, [isDisabled, map]);

  // Function to add drawn polygon
  useEffect(() => {
    if (!isDisabled && drawnPolygon && map) {
      setDrawing("ready to analyse"); // Polygon is ready to be analysed!!
      map.addLayer({
        id: "drawn-polygon",
        type: "fill",
        source: {
          type: "geojson",
          data: drawnPolygon,
        },
        paint: {
          "fill-color": "#000000",
          "fill-opacity": 0.5,
        },
      });

      // Add the line layer for the dashed border
      map.addLayer({
        id: "drawn-polygon-border",
        type: "line",
        source: {
          type: "geojson",
          data: drawnPolygon,
        },
        paint: {
          "line-color": "#CC7722", // Yellow ochre color
          "line-width": 3,
          "line-dasharray": [2, 2], // Dash pattern: 2px dash, 2px gap
        },
      });

      // Collect the soc feature intersected
      const socFeatures = map.queryRenderedFeatures({ layers: [socVis] });
      // Pass the drawn polygon and the intersected regions to setGraph
      setGraph({
        drawnPolygon: drawnPolygon,
        socFeatures: socFeatures,
      });

      // Clear the drawn polygon from state
      setDrawnPolygon(null);
    }
  }, [isDisabled, drawnPolygon, map]);

  useEffect(() => {
    if ((selectedComponent == "Stacking" || drawing == "no") && map) {
      // Clear the drawn polygon from state
      // Remove any existing polygon layer before drawing a new one
      if (map.getLayer("drawn-polygon")) {
        map.removeLayer("drawn-polygon");
        map.removeSource("drawn-polygon");
        map.removeLayer("drawn-polygon-border");
        map.removeSource("drawn-polygon-border");
      }
    }
  }, [selectedComponent, drawing, map]);

  // Function to change basemap
  useEffect(() => {
    if (map) {
      // Get the style object
      const style = map.getStyle();
      // List of all available basemaps
      const availBasemaps = ["satellite", "mapbox-terrain"];
      availBasemaps.forEach((id) => {
        map.setLayoutProperty(
          id,
          "visibility",
          basemap == id ? "visible" : "none"
        );
      });
    }
  }, [basemap, map]);

  // Function to toggle visibility and opacity
  useEffect(() => {
    if (map) {
      const availLayers = [
        // Crop layers
        "crop type kharif",
        "crop type rabi",
        "cover crop",
        "crop health",
        // Flood layers
        "flood risk",
        "flood map",
        "stream order",
        // Miscellaneous
        "lulc",
        "evapotranspiration",
      ];

      const socLayers = ["soc 22", "soc 23", "soc change"];
      const socId = "soil organic carbon map"; // Storing the switch id for ease of use

      // Change visibility and opacity for non SOC layers
      availLayers.forEach((id) => {
        map.setLayoutProperty(
          id,
          "visibility",
          switchState[id] ? "visible" : "none"
        );
        if (id != "stream order") {
          map.setPaintProperty(id, "fill-opacity", layerOpacity[id]);
        } else {
          map.setPaintProperty(id, "line-opacity", layerOpacity[id]);
        }
      });

      // Change visibility and opacity for SOC layers
      socLayers.forEach((id) => {
        map.setLayoutProperty(
          id,
          "visibility",
          switchState[socId] && socVis == id ? "visible" : "none"
        );
        map.setPaintProperty(id, "fill-opacity", layerOpacity[socId]);
      });
    }
  }, [map, switchState, layerOpacity, socVis]);

  // Function for popup for SOC map
  useEffect(() => {
    if (map) {
      const handleClick = (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [socVis],
        });

        const coords = turf.centroid(features[0].geometry).geometry.coordinates; // Co-ordinates for popup

        // Create a container for the popup content
        const popupNode = document.createElement("div");

        // Create a root using createRoot
        const root = createRoot(popupNode);

        // Render the PopupContent component into the popupNode
        root.render(<PopupContent feature={features[0]} />);

        if (popup) {
          popup.remove();
        }

        const newPopup = new mapboxgl.Popup()
          .setLngLat(coords)
          .setDOMContent(popupNode)
          .addTo(map);

        setPopup(newPopup);
      };

      map.on("click", socVis, handleClick);

      // Cleanup function to remove the popup and the click event listener
      return () => {
        if (popup) {
          popup.remove();
        }
        map.off("click", socVis, handleClick);
      };
    }
  }, [map, socVis, switchState]);

  // Effect to remove popup when the SOC map switch is turned off
  useEffect(() => {
    if ((!switchState["soil organic carbon map"] && popup) || (drawing=="yes" && popup)) {
      popup.remove();
      setPopup(null);
    }
  }, [switchState, popup,drawing]);

  return (
    <>
      <Box position="relative" height={"100%"} alignContent={"center"}>
        <Box
          id="map"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={0}
        />
        <Box
          id="drawing-map"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
          display={isDisabled ? "block" : "none"}
          border={2}
          borderColor={"red"}
        />
      </Box>
    </>
  );
}

export default MapComponent;
