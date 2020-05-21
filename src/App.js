/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useRef, useEffect } from 'react'
import { jsx, css } from '@emotion/core'
import jsPDF from 'jspdf'

import BusinessForm from './components/BusinessForm'
import BusinessCardFront from './components/BusinessCardFront'
import BusinessCardBack from './components/BusinessCardBack'

const appCSS = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 64px;
  padding: 24px;
  @media screen and (min-width: 768px) {
    grid-template-columns: minmax(300px, 1fr) minmax(263px, 525px) ;
  }
`

const formCSS = css`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    max-width: 100%;
`

const cardCSS = css`
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    max-width: 100%;
    @media screen and (min-width: 768px) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }
    > div {
      width: 100%;
    }
    > div:first-of-type {
    padding-bottom: 24px;
    }
    > div:last-of-type {
    border: 1px solid #262626;
    }
`

function App() {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [data, setData] = useState({})
    const cardRef = useRef(null)

    const setStateDimensions = () => {
      const container = cardRef.current
      const containerWidth = container.offsetWidth
      if (containerWidth < 400) {
        setWidth(window.innerWidth - 48)
        setHeight((window.innerWidth - 48) * (2 / 3.62))
      } else if (containerWidth < 1083) {
        setWidth(containerWidth)
        setHeight(containerWidth * 2 / 3.62)
      } else {
        setWidth(1083)
        setHeight(633)
      }
    }
    const createPDF = (data) => {
      const cards = document.getElementsByTagName('canvas')
      const pdfFront = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [261, 153]
      })
      const pdfBack = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [300, 300]
      })
      const cardFront = cards[0].toDataURL()
      const cardBack = cards[1].toDataURL()
      pdfFront.addImage(cardFront,
        0, // x coord
        0, // y coord
        3.62, // width
        2.12) //height
      pdfBack.addImage(cardBack,
        0, // x coord
        0, // y coord
        3.62, // width
        2.12) //height
      pdfFront.save('businessCardFront.pdf')
      pdfBack.save('businessCardBack.pdf')
    }
    const onInputChange = (e) => {
        switch(e.target.name) {
          case 'name':
            setData({...data, name: e.target.value})
            break
          case 'title':
            setData({...data, title: e.target.value})
            break
          case 'email':
            setData({...data, email: e.target.value})
            break
          case 'phone':
            setData({...data, phone: e.target.value})
            break
          case 'address1':
            setData({...data, address1: e.target.value})
            break
          case 'address2':
            setData({...data, address2: e.target.value})
            break
          case 'city':
            setData({...data, city: e.target.value})
            break
          case 'zipCode':
            setData({...data, zipCode: e.target.value})
            break
          default:
            return
        }
    }
    const onSelectChange = (e) => {
      switch (e[1].name) {
        case 'socialChannel':
          setData({...data, socialChannel: e[0].value})
          break
        case 'location':
          setData({...data, location: e[0].value})
          break
        case 'chapter':
          setData({...data, chapter: e[0].value, logo: e[0].logo, url: e[0].url})
          break
        case 'state':
          setData({...data, state: e[0].value})
          break
        default:
          return
      }
    }
    useEffect(() => {
		// set image coordinates to center based on width and height
      window.addEventListener('resize', setStateDimensions)
      setStateDimensions()
      return () => window.removeEventListener('resize', setStateDimensions)
    },[])


  return (
    <div css={appCSS} className="App">
      <div css={formCSS}>
        <BusinessForm 
          data={data}
          createPDF={createPDF} 
          onInputChange={onInputChange} 
          onSelectChange={onSelectChange} />
      </div>
      <div css={cardCSS} ref={cardRef}>
        <BusinessCardFront data={data} width={width} height={height} id="businessCardFront" />
        <BusinessCardBack data={data} width={width} height={height} id="businessCardBack" />
      </div>
    </div>
  );
}

export default App;
