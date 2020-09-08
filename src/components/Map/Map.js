import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css';
// import { showDataOnMap } from './util';

function Map({ countries, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {/* Loop through countries and draw circles on the screen */}
      </LeafletMap>
    </div>
  );
}

export default Map;
