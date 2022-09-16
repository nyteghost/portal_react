import {Box} from "@mui/material"
import ProtectedComponent from "../auth/api/connectwise"

// import cwm from "../../connectwise/apiRequest"




export default function TestPage() {

const testData = {
    count:1
}
 return (
    <Box sx={{ 
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin: 4, 
        border: '1px',
        }}
        >
    <div>New Page</div>
    <ProtectedComponent formData={testData} />
    </Box>
 )
  
};


