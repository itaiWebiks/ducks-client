import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Circle, Stroke, Fill } from "ol/style";

interface MapComponentProps {
  initialCoordinates: [number, number];
  locations: { color: string; location: [number, number] }[];
}
const map = {
  width: "100%",
  height: "100%",
};
const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  initialCoordinates,
}) => {
  useEffect(() => {
    // Create a map instance
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(initialCoordinates),
        zoom: 10,
      }),
    });

    // Create a vector layer for adding the pin
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    locations.forEach((marker) => {
      const { color, location } = marker;
      console.log(color);

      const pin = new Feature({
        geometry: new Point(fromLonLat(location)),
      });

      pin.setStyle(
        new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: color,
            }),
            stroke: new Stroke({
              color: "black",
              width: 2,
            }),
          }),
        })
      );

      vectorSource.addFeature(pin);
    });

    return () => {
      map.dispose();
    };
  }, [initialCoordinates]);

  return <div id="map" style={map} />;
};

export default MapComponent;
