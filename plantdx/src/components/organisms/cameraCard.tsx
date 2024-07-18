"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { format } from "date-fns";

const CameraCard = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(format(new Date(), "MM/dd/yyyy hh:mm:ss a"));
  }, []);

  return (
    <Card style={{ width: "1000px", height: "750px" }}>
      <CardHeader className="flex flex-col items-start justify-center gap-2">
        <h1 className="text-2xl font-bold text-black-500">Camera</h1>
        <p>{date}</p>
      </CardHeader>
      <CardBody className="flex flex-row items-start justify-center gap-2">
        <Image
          src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg"
          alt="camera"
          width={1920}
          height={1080}
        />
      </CardBody>
      <CardFooter>
        <p>Camera is working fine</p>
      </CardFooter>
    </Card>
  );
};

export default CameraCard;
