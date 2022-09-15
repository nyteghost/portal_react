import React from 'react'
import {
    Grid,
    Typography,
} from '@mui/material/'
import './shippinglabel.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ReactToPrint from 'react-to-print';
import CustomIframe from "./asapIFrame"
import ShippingLabel from "./shippinglabel"


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function SingleCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const elem = props.formData
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <div >    
            <Card sx={{maxHeight:190,
                        minHeight:210}}>
                <CardHeader
                    title={`LG Name : ${elem.lg_name}`}
                    subheader={
                    <>
                        <Typography>Student : {elem.contact}</Typography>
                        <Typography>{elem.address}</Typography>
                        <Typography>{elem.address_2}</Typography>
                        <Typography>{elem.city}, {elem.state}. {elem.postal_code}</Typography>
                    </>}  
                />
                    <ShippingLabel formData={elem} />
            </Card>
        </div>
    )
}