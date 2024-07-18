"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const ColorCard = ({
  processName,
  processDone,
}: {
  processName: string;
  processDone: boolean;
}) => {
  const [color, setColor] = useState("red");
  const [stateString, setStateString] = useState("incomplete");
  const [icon, setIcon] = useState(<TaskAltIcon />);

  useEffect(() => {
    if (processDone) {
      setColor("green");
      setStateString("complete");
      setIcon(<TaskAltIcon />);
    } else {
      setColor("red");
      setStateString("incomplete");
      setIcon(<ErrorOutlineIcon />);
    }
  }, [processDone]);

  return (
    <Card style={{ width: "120px", backgroundColor: color, height: "120px" }}>
      <CardHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          {icon}
          <h1 className="text-xl font-bold text-black-500">{stateString}</h1>
        </div>
      </CardHeader>
      <CardFooter>
        <p
          style={{
            fontSize: "12px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {processName}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ColorCard;
