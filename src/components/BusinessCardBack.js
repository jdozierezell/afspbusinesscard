import React, { useState, useEffect } from 'react'
import { Stage, Layer, Rect, Line, Text, Group, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image'

import nationalLogo from '../images/national.jpg'

const BusinessCardFront = ({data, width, height}) => {
    const [image] = useImage(data.logo ? `https://aws-fetch.s3.amazonaws.com/logos/businesscards/${data.logo}.jpg` : nationalLogo, 'Anonymous')
    const [imageWidth, setImageWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0)
    const [addressLines, setAddressLines] = useState(0)
    const [ratio, setRatio] = useState(1)
    const [imageRatio, setImageRatio] = useState(1)
    const [addressWidth, setAddressWidth] = useState(0)

    const avenir = 'AvenirNextLTPro-Regular'
    const white = 'white'
    const gray = '#262626'

    let address1, address2, city, state, zipCode
    if (data.location === 'NYC') {
        address1 = '199 Water St.'
        address2 = '11th Floor'
        city = 'New York'
        state = 'NY'
        zipCode = 10034
    } else if (data.location === 'DC') {
        address1 = '440 First Street, NW'
        address2 = 'Suite 300'
        city = 'Washington'
        state = 'D.C.'
        zipCode = 20001
    } else if (data.location === 'Chapter') {
        address1 = data.address1
        address2 = data.address2
        city = data.city
        state = data.state
        zipCode = data.zipCode
    }

    useEffect(() => {
        console.log(addressWidth)
        let measureAddress1
        let measureAddress2
        let measureCityStateZip
        let lines = 0

        setRatio(width / (3.5 * 72))
        setImageRatio(width / (3.5 * 300))
        
        if (!document.getElementById('measureAddress1')) {
            measureAddress1 = document.createElement('span')
            measureAddress1.id = 'measureAddress1'
            measureAddress1.className = 'cardBackText'
        } else {
            measureAddress1 = document.getElementById('measureAddress1')
        }
        if (!document.getElementById('measureAddress2')) {
            measureAddress2 = document.createElement('span')
            measureAddress2.id = 'measureAddress2'
            measureAddress2.className = 'cardBackText'
        } else {
            measureAddress2 = document.getElementById('measureAddress2')
        }
        if (!document.getElementById('measureCityStateZip')) {
            measureCityStateZip = document.createElement('span')
            measureCityStateZip.id = 'measureCityStateZip'
            measureCityStateZip.className = 'cardBackText'
        } else {
            measureCityStateZip = document.getElementById('measureCityStateZip')
        }
        measureAddress1.innerHTML = address1 ? address1 : ''
        measureAddress2.innerHTML = address2 ? address2 : ''
        measureCityStateZip.innerHTML = `${city ? `${city},` : ''} ${state ? state : ''} ${zipCode ? zipCode : ''}`
        document.body.append(measureAddress1)
        document.body.append(measureAddress2)
        document.body.append(measureCityStateZip)
        setAddressWidth(Math.max.apply(null, [measureAddress1.offsetWidth, measureAddress2.offsetWidth, measureCityStateZip.offsetWidth]))

        if (image) {
            setImageWidth(image.width)
            setImageHeight(image.height)
        }
        if (address1) {
            lines = lines + 1
        }
        if (address2) {
            lines = lines + 1
        }
        if (city) {
            lines = lines + 1
        }
        console.log(lines)
        setAddressLines(lines * ratio)
        
    },[width, height, image, imageHeight, imageWidth, data, addressLines, ratio, address1, address2, city, addressWidth, state, zipCode])
    return (
        <Stage width={width} height={height}>
            <Layer>
                <Rect x={0} y={0} width={width} height={height} fill={white}/>
                <Group 
                    x= {((width) - (imageWidth * imageRatio + (6 * ratio * 2) + (addressWidth * ratio))) / 2}
                    y={(height / 2) - (imageHeight * imageRatio / 2)}>
                    <KonvaImage 
                        image={image} 
                        width={imageWidth * imageRatio} 
                        height={imageHeight * imageRatio} 
                        x={0}
                        // x={(width / 2) - (imageWidth * imageRatio) - (8 * ratio)} 
                         />
                        {addressWidth > 0 && <Line x={imageWidth * imageRatio + (6 * ratio)} points={[0, 0, 0, imageHeight * imageRatio]} stroke="#262626" strokeWidth={1} />}
                    <Group
                        fill={gray}
                        // x={(width / 2) + (8 * ratio)}
                        x={imageWidth * imageRatio + (6 * ratio * 2)}
                        y={(imageHeight * imageRatio / 2 - (addressLines * 12 / 2))}
                        width={width / 2 - 18}
                        // width={22 * }
                        clip={{
                            x: 0,
                            y: 0,
                            width: width / 2 - 36,
                            height: addressLines * 12 * ratio
                        }}>
                        <Text
                            fontFamily={avenir}
                            text={address1}
                            fontSize={10 * ratio}
                            letterSpacing={-1}
                            y={0 * 14}
                        />
                        <Text
                            fontFamily={avenir}
                            text={address2}
                            fontSize={10 * ratio}
                            letterSpacing={-1}
                            y={1 * 14 * ratio}
                        />
                        <Text
                            fontFamily={avenir}
                            text={`${city ? `${city},` : ''} ${state ? state : ''} ${zipCode ? zipCode : ''}`}
                            fontSize={10 * ratio}
                            letterSpacing={-1}
                            y={address2 ? 2 * 14 * ratio : 1 * 14 * ratio}
                        />
                    </Group>
                </Group>
            </Layer>
        </Stage>
    )
}

export default BusinessCardFront
