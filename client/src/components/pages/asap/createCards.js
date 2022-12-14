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
import SingleCard from "./singleCard"

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         padding: theme.spacing(2)
//     }
// }))


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

export default function AltCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const data = props.result.result

    return (
        <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {data.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                        <SingleCard formData={elem} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}