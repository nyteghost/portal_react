
import './styles.css'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {Box} from "@mui/material"


const pageStyle = ``;

const ComponentToPrint = React.forwardRef((props, ref) => {
    props = props.props
    
    return(
        <Box 
            sx={{
           bg: 'white'
           }}
        >
            <div ref={ref}>
            <section class="flexed">
                    <div>
                        <p>Southeastern Computer Associates</p>
                        <p>111 Sparks Drive</p>
                        <p>Suite 6008</p>
                        <p>Hiram GA 30141</p>
                    </div>
                    <div>
                        <p>ASAP Shipping Label</p>
                    </div>
                    <div>
                        <p>Date Printed:{props.date}</p>
                    </div>
            </section>
                <br />
                <section style={{align: 'left'}}>
                <p style={{fontWeight: 'bold'}}>SHIP TO:</p>
                    <div style={{marginLeft: 10}}>
                        <p>{String(props.lg_name)}</p>
                        <p>{String(props.phone)}</p>
                        <p>{String(props.address)}</p>
                        <p>{String(props.address_2)}</p>
                        <p>{String(props.city)} {String(props.state)} {String(props.postal_code)}</p>
                    
                    </div>
                </section>
                <hr className='hr' />
                <section class="flexed">
                    <div>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.contact}&size=60x60&margin=0`}/>
                    </div>
                    <div style={{width: 200}}>
                    </div>
                    <div>
                        <p style={{fontSize: 30}}>{props.contact}</p>
                    </div>
                </section>
                <hr className='hr'/>
                <section class="flexed">    
                    <div>
                        <p style={{fontSize: 30}}>GCA-{props.assetid}</p>
                    </div>
                    <div style={{width: 200}}>
                    </div>
                    <div>
                        <img src={ `https://api.qrserver.com/v1/create-qr-code/?data=${props.assetid}&size=60x60&margin=0`}/>                
                    </div>
                </section>
                <hr className='hr'/>
                <section class="flexed">
                    <div>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.trackingid}&size=60x60&margin=0`}/>                
                    </div>
                    <div style={{width: 200}}>
                    </div>
                    <div>
                        <p style={{fontSize: 30}}>{props.trackingid}</p>
                    </div>
                </section>
            </div>
        </Box>
    )
});



export const ShippingLabel = (props) => {
    const componentRef = useRef();
    
    return (
        <div>
          <ReactToPrint
            pageStyle={pageStyle}
            trigger={() => <button id="printButton">Print this out!</button>}
            content={() => componentRef.current}
          />
          <ComponentToPrint props={props.formData} ref={componentRef} />
        </div>
      );
}

export default ShippingLabel
