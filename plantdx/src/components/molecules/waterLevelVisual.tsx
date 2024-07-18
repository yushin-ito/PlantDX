"use client";
import React from "react";
import { BarChart, Bar, YAxis, Label, Tooltip } from "recharts";

const WaterLevelVisual = ({ data }: { data: any }) => {
  return (
    <BarChart width={250} height={180} data={data} maxBarSize={190}>
      <YAxis />
      <Tooltip />
      <Label value="Water Level" offset={0} position="insideTop" />
      <Bar dataKey="waterlevel" fill="#8884d8" />
    </BarChart>
  );
};

export default WaterLevelVisual;
