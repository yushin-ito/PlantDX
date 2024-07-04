'use client'
import React from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

const LogCard = () => {
    return (
        <Card style={{ width: '800px', height: '400px' }}>
            <CardHeader className="flex flex-col items-start justify-center gap-2">
                <h1 className='text-2xl font-bold text-black-500'>Logs</h1>
            </CardHeader>
            <CardBody className='flex flex-row items-start justify-center gap-2'>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>TIME</TableColumn>
                    <TableColumn>PLANT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>INSPECT</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell><Button>Inspect</Button></TableCell>
                    </TableRow>
                    <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell><Button>Inspect</Button></TableCell>
                    </TableRow>
                    <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell><Button>Inspect</Button></TableCell>
                    </TableRow>
                    <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                    <TableCell><Button>Inspect</Button></TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </CardBody>
        </Card>
    );   
}

export default LogCard;