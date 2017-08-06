import fs from 'fs';

export const pdfCreator = (booking, driverData) => {

    const logo = `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`;   


    const driver = driverData[0];
    //booking
    var doc = {
        background: {
            canvas: [{
                type: 'line',
                x1: 65,
                y1: 760,
                x2: 595 - 2 * 40,
                y2: 760,
                lineWidth: 0.3
            }]
        },

        pageMargins: [40, 40, 40, 100],

        content: [
             {
            image: `data:image/jpeg;base64,` + logo,
            style: 'logo'
            },
            {
                text: "Booking conformation (refernce number - " + booking.refno + ")",
                bold: true, 
                alignment: 'center', 
                fontSize: 20,
                margin: [20, 0, 0, 20]

             }, {
                text: booking.name + ", thank you for booking with Rad's Transfers.\nBelow please find details of your booking:",
                 fontSize: 14,
                 margin: [0, 0, 0, 20]

             },{
                text: "Destination: " + booking.destination
             }, {
                 text: "Pick-up address: " + booking.pickup
            },{
                text: "Date: " + booking.date
             }, {
                 text: "Time of collection: " + booking.time
            }, {
                text: "Driver Inforamtion:",
                bold: true,
                margin: [0, 15, 0, 15]
             }, {
                 image: 'data:image/jpeg;base64,' + driver.photoPath,
                 width: 50
             }, {
                text: "Driver name: " + driver.name
             }, {
                 text: "Car registration number: " + driver.carRegNo
             }
        ], 

        styles: {
            logo: {
                width: 40,
                alignment: 'center',
                margin: [0, 0, 0, 15]
            },
            anotherStyle: {
                width: 80,
                italics: true,
                alignment: 'center',
                margin: [0, 0, 0, 15]
            }
        }
    }

    
return doc;

    // var pdf = pdfMake.createPdf(doc);

    // // return pdf;

 
    //     pdf.getBase64((pdf) => {
    //         // fs.writeFile('test.pdf', buffer, function (err) {
    //         //     if (err) throw err;
    //         //     console.log('file saved');
    //         // });
    //         return pdf;
    //     })

  
    // pdf.getBase64((data) => {
    //     // fs.writeFile('test.pdf', buffer, function (err) {
    //     //     if (err) throw err;
    //     //     console.log('file saved');
    //     // });

        
    //     console.log('conf',data)
    //     return data;
    // })

}