'use client'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { BarChart, Bar, YAxis, Label, Tooltip } from "recharts";

const StatusCard = ({showsTemp, showsWaterLevel, title}: 
    {showsTemp: boolean, showsWaterLevel: boolean, title: string}) => {
    console.log(showsTemp, showsWaterLevel, title);
    let data = [190].map((value, index) => ({waterlevel: value}));
    let data2 = [190].map((value, index) => ({watertemp: value}));

    return (
        <Card
        style={{width: '200px'}}
        >
            <CardHeader>{title}</CardHeader>
            <CardBody>
                {/* This is gonig to be its own module */}
                <BarChart layout="vertical"
                width={100} height={50} data={data2}
                >    
                    <YAxis type="category" dataKey="name" />
                    <Tooltip/>
                    <Bar dataKey="watertemp" fill="#8884d8" />
                </BarChart>
            </CardBody>
            <CardFooter>
                {/* This is gonig to be its own module */}
                <BarChart width={200} height={180} data={data}
                maxBarSize={190}>    
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="waterlevel" fill="#8884d8" />
                </BarChart>
            </CardFooter>
        </Card>
    )
}

export default StatusCard;