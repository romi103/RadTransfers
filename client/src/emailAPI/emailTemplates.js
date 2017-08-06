import React from 'react'
import ReactHTMLEmail from 'react-html-email';
import { Email, Item, Span, A, renderEmail, Box, Image } from 'react-html-email'

ReactHTMLEmail.injectReactEmailAttributes()



export const ConfirmEmailCustomer = (props) =>{
        const booking = props.booking;
        const driver = props.driver[0];
        // console.log('booking',booking)
        // console.log('driver',driver)
    return ( 
        <Email title={"RadTransfer - Booking Confiramtion. Reference No. " + booking.refno}>
            <Item>
                <Span fontSize={15}>Hello, {booking.name}</Span>
            </Item>
            <Item>
            <Box cellSpacing={20} width="100%" style={{ borderTop: '3px solid black' }}>
                <Item>
                    <Span fontSize={15}>We would like to confirm your booking with Rad's Transfers</Span>
                </Item>
                <Item>
                    <Span lineHeight={15}>Destination: {booking.destination}</Span>
                </Item>
                <Item>
                    <Span lineHeight={15}>Pick-up address: {booking.pickup}</Span>
                </Item>
                 <Item>
                    <Span lineHeight={15}>Driver Name: {driver.driverId}</Span>
                </Item>
                 <Item>
                    <Span lineHeight={20}>Details of your booking are attached to this message.</Span>
                </Item>
                 <Item>
                        <Span>If you have any queries please contact us on thelephone number +44 111122223333</Span>
                 </Item>
            </Box>
            </Item>
        </Email>
    )
}


