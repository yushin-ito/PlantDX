'use client'

import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import { format } from 'date-fns';

import ColorCard from '../molecules/colorCard';

const StatusCardBig = ({title}: {title: string}) => {
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
                <ColorCard processName='Raw oil heating process' processDone />
                <ColorCard processName='Raw oil heating process' processDone />
                <ColorCard processName='Oil warer removal process' processDone={false} />        
                </CardBody>
        </Card>
    )
}

export default StatusCardBig;