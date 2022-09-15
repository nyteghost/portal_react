import CustomIframe from "./asapIFrame"
import ShippingLabel from "./shippinglabel"
import ShippingLabelModal from "./createModal"
import Card from '@mui/material/Card';
import AltCard from "./createCards"


export default function GenerateLabels  (props) {
    let deepProps = props.result.result
    console.log(deepProps)
    if(deepProps != undefined && deepProps !=null){
        let recordObject = JSON.stringify(deepProps)
        let records = JSON.parse(recordObject)
        for(let i = 0; i < records.length; i++){
            let record = records[i]
            record.date = new Date().toLocaleDateString()
            
        
            // return(
            // // <CustomIframe>
            //     <ShippingLabelModal formData={record} />
            // // </CustomIframe>
            // )
            
        }
    }
}


