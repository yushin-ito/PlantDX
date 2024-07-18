'use client'
import React, { useState } from 'react';
import {Progress} from "@nextui-org/progress";
import {Chip} from "@nextui-org/chip";

const TempVisual = ({temperature}: {temperature: number}) => {
    return (
        <div
        className="flex flex-row items-center justify-center gap-2"
        >
        <p>Heater: </p>
        <Progress value={temperature} 
        color="warning"
        />
        <Chip color="warning"
        variant='bordered'
        >
        <p>{temperature}℃</p>
        </Chip>
        </div>
    )
}

export default TempVisual;