'use client'

import React, { useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

const ColorCard = ({title, color, processName}: {title: string, color: string, processName: string}) => {
    const [temperature, setTemperature] = useState(81);

    return (
        <Card
        style={{width: '200px', backgroundColor: color, height: '180px'}}
        >
            <CardHeader>
                <p>hi</p>           
            </CardHeader>
            <CardBody>
            <h1
            className='font-bold text-black-500'
            >{title}</h1>
            </CardBody>
            <CardFooter>
                <p
                style={{fontSize: '12px'}}
                >{processName}</p>
            </CardFooter>
        </Card>
    )
}

export default ColorCard;