import * as React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

const CustomCard = ({ children, ...props }) => {
    return (
        <Card {...props}>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
        <CardBody>{children}</CardBody>
        </Card>
    )
    }

CustomCard.defaultProps = {
    children: null,
}

export default CustomCard
