import { useEffect, useState } from "react";
import * as turf from "@turf/turf";
import { Spinner, Box, Button } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
  ReferenceLine
} from "recharts";
import { color } from "framer-motion";

const GraphComponent = ({ graph }) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [intersectedFeatures, setIntersectedFeatures] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (graph) {
      let soc22sum = 0;
      let soc23sum = 0;
      let chnsum = 0;
      let count = 0;
      const socFeats = graph["socFeatures"];
      const drawnPoly = graph["drawnPolygon"];
      const newIntersectedFeatures = [];

      socFeats.forEach(function (feature) {
        const intersection = turf.intersect(
          turf.featureCollection([feature, drawnPoly])
        );
        if (intersection) {
          count++;
          soc22sum += feature.properties["soc_22"]; // Sum of all soc 22 values
          soc23sum += feature.properties["soc_23"]; // Sum of all soc 23 values
          chnsum += feature.properties["chn"]; // Sum of all soc change values

          // Retain the properties of the original feature
          intersection.properties = feature.properties;

          newIntersectedFeatures.push(intersection);
        }
      });

      // Calculate mean values
      const soc22mean = soc22sum / count;
      const soc23mean = soc23sum / count;
      const chnmean = ((chnsum / count) * 100) / soc22mean;

      // Set chart data
      setChartData([
        {
          name: "SOC 22(ton/ha)",
          mean: soc22mean,
          color: soc22mean > soc23mean ? "#7A2E0E" : "#B54708",
        },
        {
          name: "SOC 23(ton/ha)",
          mean: soc23mean,
          color: soc22mean < soc23mean ? "#7A2E0E" : "#B54708",
        },
        {
          name: "Change(%)",
          mean: chnmean,
          color: chnmean > 0 ? "green" : "red",
        },
      ]);

      setIntersectedFeatures(newIntersectedFeatures);
      setLoading(false);
    }
  }, [graph]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "5px",
            fontSize: "10px",
            fontFamily: "Arial",
          }}
        >
          <p>{label}</p>
          <p>{`Mean: ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  // Temporarily suppress warnings
  const originalWarn = console.warn;
  console.warn = () => {};

  const downloadIntersectedFeatures = () => {
    console.log('Download button clicked');
    console.log(intersectedFeatures);
    const geojson = {
      type: "FeatureCollection",
      features: intersectedFeatures
    };

    const blob = new Blob([JSON.stringify(geojson)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'intersected_features.geojson';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    console.log(downloadLink.href+"/download="+downloadLink.download);
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <BarChart
            width={300}
            height={200}
            data={chartData}
            margin={{ top: 5, right: 30}}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fontFamily: "Arial" }}
              angle={10}
              interval={0}
            />
            <YAxis tick={{ fontSize: 10, fontFamily: "Arial" }}/>
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#000"/>
            <Bar dataKey="mean" barSize={30}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
          {/* <Button onClick={downloadIntersectedFeatures} mt={4} colorScheme="teal">
            Download Intersected Features
          </Button> */}
        </>
      )}
    </>
  );
};

export default GraphComponent;
