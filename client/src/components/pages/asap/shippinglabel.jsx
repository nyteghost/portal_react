
import './shippinglabel.css'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {Box} from "@mui/material"


const pageStyle = `@page {
    size: 4in 6in;
}`

const ComponentToPrint = React.forwardRef((props, ref) => {
    console.log(props)
    props = props.props

    return(
        <div ref={ref} className="PrintSection" style={{ backgroundColor: 'white',}}>
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
        </div>
    )
});



export const ShippingLabel = (props) => {
    console.log(props.formData)
    const componentRef = useRef();

    return (
        <div>
          <ReactToPrint
            trigger={() => <button id="printButton">Print</button>}
            content={() => componentRef.current}
          />
          <ComponentToPrint props={props.formData} ref={componentRef} />
        </div>
      );
}

export default ShippingLabel
