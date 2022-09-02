import Box from '@mui/material/Box'
import {useState, useRef, forwardRef, useEffect} from 'react'

export const ComponentToPrint = forwardRef((props, ref) => {
  const assetid = ref.current.props.assetData.data.req.assetid;
  const staffUsername = ref.current.props.assetData.data.req.staffUsername;
  const missingPeriph = ref.current.props.assetData.data.req.suffix;
  const ltype = ref.current.props.assetData.data.req.ltype;
  let qrImage = `https://api.qrserver.com/v1/create-qr-code/?data=${assetid}&size=60x60&margin=0`;
  


  return(
      <Box textAlign='center' ref={ref}>
          <div >
              { staffUsername ? <><p1>{staffUsername}</p1><br/></> : null }
              { ltype ? <p1>GCA-{ltype} </p1> : null }
              { missingPeriph ? <p1>{missingPeriph}</p1> : null }
              { assetid ? <div><p1>{assetid}</p1></div> : null }
          <br/>
          <img src={qrImage}/>
          <br/><br/>
          </div>
      </Box>
      
  );
});