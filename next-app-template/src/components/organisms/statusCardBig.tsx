'use client'

import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import { format } from 'date-fns';

import ColorCard from '../molecules/colorCard';

const StatusCardBig = ({title}: {title: string}) => {
    const [temperature, setTemperature] = useState(81);
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(format(new Date(), 'MM/dd/yyyy hh:mm:ss a'));
    }, []);



    return (
        <Card
        style={{width: '400px'}}
        >
            <CardHeader
            className=
            "flex flex-col items-start justify-center gap-2">
            <h1
            className='text-2xl font-bold text-black-500'
            >{title}</h1>
            <p>{date}</p>
            </CardHeader>
            <CardBody
            className='flex flex-row items-start justify-center gap-2'
            >
                <ColorCard title='incomplete' color='red' processName='Raw oil heating process' />
                <ColorCard title='complete' color='green' processName='Raw oil heating process' />
                <ColorCard title='complete' color='green' processName='Oil warer removal process' />        
                </CardBody>
        </Card>
    )
}

export default StatusCardBig;