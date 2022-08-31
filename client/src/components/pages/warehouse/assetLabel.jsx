import { useForm } from 'react-hook-form';
import { useState, Suspense} from "react";
import { ErrorMessage } from '@hookform/error-message';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../../../styles/warehouse.css";
import { borderRadius } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import ProtectedComponent from "../../auth/api/warehouseops"

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: "white",
    border: '2px solid #5e77a2',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));


export default function CustomizedSelects() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [operation, setOps] = useState('');
  const [labelType, setLabelType] = useState('');
  const [sendData, setData] = useState('');
  const [count, setCount] = useState(0);

  const parentToChild = props => {
    var i; 
    if (!i){setData(props);
        } else if (i === props){
          setData('');
          let i = props
    }  
  }

  
  const onSubmit = data => {
    data = JSON.parse(JSON.stringify(data));
    data.operationtype = operation
    data.assignedcontact = labelType
    setCount(count + 1)
    data.submit = count
    // parentToChild(data);
    console.log(data)
  };
  
  
  const labelHandleChange = (event) => {
    setLabelType(event.target.value);
  };


  const MissingPeriphs = () => {
    console.log(labelType)
    if (labelType === 'Dell Replacement Student Kit' || labelType === 'Len Replacement Student Kit' || labelType === 'Replacement Staff Kit'){

        return (
            
            <div>
                Select any peripherials that are missing<br />
                <input name = "usbcCharger" type="checkbox" placeholder="USB-C Charger" {...register("USB-C Charger", {})} />
                <label name="usbcCharger" className="form-check-label">USB-C Charger</label>
            </div>
        );
    } else if (labelType === 'Dell New Student Kit' || labelType === 'Len New Student Kit'){
        return (
            <>
            <div>
            Select any peripherials that are missing<br />
                <input name = "mouse" type="checkbox" placeholder="Mouse>" {...register("Mouse", {})} />
                <label name="mouse" className="form-check-label">Mouse</label>
                
            </div>
            <div>
                <input name = "headset" type="checkbox" placeholder="Headset" {...register("Headset", {})} />
                <label name="headset" className="form-check-label">Headset</label>
            </div>
            <div>
                <input name = "Sleeve" type="checkbox" placeholder="Sleeve" {...register("Sleeve", {})} />
                <label name="Sleeve" className="form-check-label">Sleeve</label>
            </div>
            <div>
                <input name = "usbcCharger" type="checkbox" placeholder="USB-C Charger" {...register("USB-C Charger", {})} />
                <label name="usbcCharger" className="form-check-label">USB-C Charger</label>
            </div>
            </>
            
        );
    } else if (labelType === 'ST-2000 Printer' || labelType === 'ST-4000 Printer' || labelType === 'ST-C2100 Printer'){
        return(
            <div>
                Select any peripherials that are missing<br />
                <input name = "brownBox" type="checkbox" placeholder="brownBox" {...register("brownBox", {})} />
                <label name="brownBox" className="form-check-label">Repackaged in brown box</label>
            </div>
        )
    } if (labelType === 'New Staff Kit'){
        return(
            <>
            <div>
                 Select any peripherials that are missing<br />
                <input name = "mouse" type="checkbox" placeholder="Mouse>" {...register("Mouse", {})} />
                <label name="mouse" className="form-check-label">Mouse</label>
                
            </div>
            <div>
                <input name = "headset" type="checkbox" placeholder="Headset" {...register("Headset", {})} />
                <label name="headset" className="form-check-label">Headset</label>
            </div>
            <div>
                <input name = "Sleeve" type="checkbox" placeholder="Sleeve" {...register("Sleeve", {})} />
                <label name="Sleeve" className="form-check-label">Sleeve</label>
            </div>
            <div>
                <input name = "usbcCharger" type="checkbox" placeholder="USB-C Charger" {...register("USB-C Charger", {})} />
                <label name="usbcCharger" className="form-check-label">USB-C Charger</label>
            </div>
            <div>
                <input name = "diskDrive" type="checkbox" placeholder="Disk Drive" {...register("Disk Drive", {})} />
                <label name="diskDrive" className="form-check-label">Disk Drive</label>
            </div>
            </>
        )
    }   
    
  };

  const StaffKitSelected = () => {
    if (labelType === 'New Staff Kit'){
        return(
            <input type="text" placeholder="Staff Name" {...register("staffUsername", {required: true, maxLength: 100})} />
        )
    }
  };

  return (
    <>
    <Box sx={{ 
      margin: 4, 
      border: '1px'
      }}
      
      >
      <form onSubmit={handleSubmit(onSubmit)}>
      

          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-label">Label Type</InputLabel>
            <Select
              labelId="Label-selection-label"
              id="Label-selection"
              value={labelType}
              label="LabelSelection"
              onChange={labelHandleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={"Dell Replacement Student Kit"}>Dell Replacement Student Kit</MenuItem>
              <MenuItem value={"Len Replacement Student Kit"}>Len Replacement Student Kit</MenuItem>
              <MenuItem value={"Dell New Student Kit"}>Dell New Student Kit</MenuItem>
              <MenuItem value={"Len New Student Kit"}>Len New Student Kit</MenuItem>
              <MenuItem value={"ST-2000 Printer"}>ST-2000 Printer</MenuItem>
              <MenuItem value={"ST-4000 Printer"}>ST-4000 Printer</MenuItem>
              <MenuItem value={"ST-C2100 Printer"}>ST-C2100 Printer</MenuItem>
              <MenuItem value={"Replacement Staff Kit"}>Replacement Staff Kit</MenuItem>
              <MenuItem value={"New Staff Kit"}>New Staff Kit</MenuItem>
              <MenuItem value={"Replacement SPED Windows Kit"}>Replacement SPED Windows Kit</MenuItem>
              <MenuItem value={"New SPED Student Windows Kit"}>New SPED Student Windows Kit</MenuItem>
              <MenuItem value={"New SPED Student Chromebook Kit"}>New SPED Student Chromebook Kit</MenuItem>
              <MenuItem value={"Replacement SPED Chromebook Kit"}>Replacement SPED Chromebook Kit</MenuItem>
              <MenuItem value={"CTAE Kit"}>CTAE Kit</MenuItem>
              <MenuItem value={"Replacement Student Windows Kit"}>Replacement Student Windows Kit</MenuItem>
              <MenuItem value={"New Student Windows Kit"}>New Student Windows Kit</MenuItem>
              <MenuItem value={"Zoomy"}>Zoomy</MenuItem>
              <MenuItem value={"Display"}>Display</MenuItem>
              <MenuItem value={"Hotspot"}>Hotspot</MenuItem>
            </Select>
          </FormControl>
          <input type="text" placeholder="Location" {...register("physicallocation", {required: true, maxLength: 100})} />
          <MissingPeriphs />
          <input type="text" placeholder="Asset Number" {...register("assetid", {required: true, maxLength: 100})} />
          <StaffKitSelected />
          <Box textAlign='center'>
            <Button type="submit" color="primary" variant="contained" >
              Submit
            </Button>
          </Box>
      </form>
    </Box>
   
    {/* <div>
            { sendData ? <ProtectedComponent formData={sendData} /> : null }
          </div> */}
  
  </>
  
  );
  
}

