import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

// draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    />
    </Circle>
  ));
