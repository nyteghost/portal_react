import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@mui/material/'
import './shippinglabel.css'

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(2)
//     }
// }))

export default function AltCard(props) {
    console.log(props.result.result)
    const data = props.result.result

    return (
        <div >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {data.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                title={`quarter : {elem.quarter}`}
                                subheader={`earnings : {elem.earnings}`}
                            />
                            <CardContent>
                                
                            <div className="PrintSection">
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
                                            <p className = 'p' >{String(elem.lg_name)}</p>
                                            <p className = 'p' >{String(elem.phone)}</p>
                                            <p className = 'p' >{String(elem.address)}</p>
                                            <p className = 'p' >{String(elem.address_2)}</p>
                                            <p className = 'p' >{String(elem.city)} {String(elem.state)} {String(elem.postal_code)}</p>
                                        
                                        </div>
                                    </section>
                                    <hr className='hr' />
                                    <section className="flexed">
                                        <div>
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${elem.contact}&size=100x100&margin=0`}/>
                                        </div>
                                        <div style={{width: 200}}>
                                        </div>
                                        <div>
                                            <p className = 'p'  style={{fontSize: 30}}>{elem.contact}</p>
                                        </div>
                                    </section>
                                    <hr className='hr'/>
                                    <section className="flexed">    
                                        <div>
                                            <p className = 'p'  style={{fontSize: 30}}>GCA-{elem.assetid}</p>
                                        </div>
                                        <div style={{width: 200}}>
                                        </div>
                                        <div>
                                            <img src={ `https://api.qrserver.com/v1/create-qr-code/?data=${elem.assetid}&size=100x100&margin=0`}/>                
                                        </div>
                                    </section>
                                    <hr className='hr'/>
                                    <section className="flexed">
                                        <div>
                                            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${elem.trackingid}&size=100x100&margin=0`}/>                
                                        </div>
                                        <div style={{width: 200}}>
                                        </div>
                                        <div>
                                            <p className = 'p'  style={{fontSize: 30}}>{elem.trackingid}</p>
                                        </div>
                                    </section>
                            </div>
                                
                            </CardContent>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}