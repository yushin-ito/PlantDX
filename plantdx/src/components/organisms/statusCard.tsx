'use client'
import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import TempVisual from '../molecules/tempVisual';
import WaterLevelVisual from '../molecules/waterLevelVisual';

const StatusCard = ({showsTemp, showsWaterLevel, title, width}:
    {showsTemp: boolean, showsWaterLevel: boolean, title: string, width: number}) => {
    let data = [190].map((value, index) => ({waterlevel: value}));
    const [temperature, setTemperature] = useState(81);

    return (
        <Card
        style={{width: width, height: 'auto'}}
        >
            <CardHeader>
                            <h1
            className='text-2xl font-bold text-black-500'>
                {title}
            </h1>
            </CardHeader>
            {showsTemp && <CardBody>
                <TempVisual temperature={temperature} />
            </CardBody>}
            <CardFooter>
                {/* This is gonig to be its own module */}
                {showsWaterLevel && <WaterLevelVisual data={data} />}
            </CardFooter>
        </Card>
    )
}

export default StatusCard;