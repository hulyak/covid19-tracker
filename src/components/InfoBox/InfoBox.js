import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    // onClick - custom prop
    <Card
      onClick={props.onClick}
      // add infoBox--selected class if it is active
      className={`infoBox ${active && 'infoBox--selected'} ${isRed &&
        'infoBox--red'}`}>
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* +120K number of cases */}
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
          {cases}
        </h2>

        {/* 1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
