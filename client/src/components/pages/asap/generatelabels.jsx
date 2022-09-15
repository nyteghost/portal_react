import {useState} from 'react'
import './shippinglabel.css'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {Box} from "@mui/material"
import { FcPrint } from "react-icons/fc";
import { useEffect } from 'react';
import CustomIframe from "./asapIFrame"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import {
    Grid,
    Typography,
} from '@mui/material/'
const pageStyle = `@page {
    size: 4in 6in;
}`

const LabelGeneration = React.forwardRef((props, ref) => {
    const [value, setValue] = useState([]);

    const ComponentToPrint = (props) => {
        return(
            
            <div className="PrintSection" style={{ backgroundColor: 'white',}}>
                <section className="flexed">
                    <div>
                        <p className = 'p' >Southeastern Computer Associates</p>
                        <p className = 'p' >111 Sparks Drive</p>
                        <p className = 'p' >Suite 6008</p>
                        <p className = 'p' >Hiram GA 30141</p>
                    </div>
                    <div>
                        <p className = 'p' >ASAP Shipping Label</p>
                    </div>
                    <div>
                        <p className = 'p' >Date Printed:{new Date().toLocaleDateString()}</p>
                    </div>
                </section>
                <br />
                <section>
                <p className = 'p'  style={{fontWeight: 'bold'}}>SHIP TO:</p>
                    <div >
                        <p className = 'p' >{String(props.lg_name)}</p>
                        <p className = 'p' >{String(props.phone)}</p>
                        <p className = 'p' >{String(props.address)}</p>
                        <p className = 'p' >{String(props.address_2)}</p>
                        <p className = 'p' >{String(props.city)} {String(props.state)} {String(props.postal_code)}</p>
                    
                    </div>
                </section>
                <hr className='hr' />
                <section className="flexed">
                    <div>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.contact}&size=100x100&margin=0`}/>
                    </div>
                    <div style={{width: 200}}>
                    </div>
                    <div>
                        <p className = 'p'  style={{fontSize: 30}}>{props.contact}</p>
                    </div>
                </section>
                <hr className='hr'/>
                <section className="flexed">    
                    <div>
                        <p className = 'p'  style={{fontSize: 30}}>GCA-{props.assetid}</p>
                    </div>
                    <div style={{width: 200}}>
                    </div>
                    <div>
                        <img src={ `https://api.qrserver.com/v1/create-qr-code/?data=${props.assetid}&size=100x100&margin=0`}/>                
                    </div>
                </section>
                <hr className='hr'/>
                <section className="flexed">
                    <div>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.trackingid}&size=100x100&margin=0`}/>                
                    </div>
                        <div style={{width: 200}}>
                    </div>
                    <div>
                        <p className = 'p'  style={{fontSize: 30}}>{props.trackingid}</p>
                    </div>
                </section>
                <br />
                <div className="page-break"/>
            </div>
            
        )
    };


    useEffect(() =>{
        const newArr = []
        // console.log(props.result.result)
        let deepProps = props.props.result.result
        console.log(deepProps)
        if(deepProps != undefined && deepProps !=null){
            let recordObject = JSON.stringify(deepProps)
            let records = JSON.parse(recordObject)
            for (let i = 0; i < records.length; i++){
                    newArr.push(ComponentToPrint(records[i]))    
            }
            setValue(newArr)
        }
    },[]);
    return(
        <div ref={ref}>
            {value}
        </div>
    )
  
});



export const GenerateLabels = (props) => {
    console.log(props.result.result)
    const componentRef = useRef();

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '18vh' }}
        >
            <Card sx={{  maxWidth: 120, maxHeight:120}}  
            >
            <CardHeader title={`Print All`} ></CardHeader>
                <ReactToPrint
                    trigger={() => <FcPrint style={{ "minHeight": "56px", width: "30%"}} id="printButton">Print</FcPrint>}
                    content={() => componentRef.current}
                />
                <LabelGeneration props={props} ref={componentRef} />
            </Card>
        </Grid>
      );
}


export default GenerateLabels