import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import {useRef} from 'react'

const PrintConfig = props => {
    const componentRef = useRef(props);
    setTimeout(() => {  document.getElementById("printButton").click() }, 1000);
    return (
      <div>
        <ReactToPrint
            trigger={() => <button id="printButton"/>}
            content={() => componentRef.current}
        />
        <ComponentToPrint ref={componentRef} />
        
      </div>
    );
};

export default PrintConfig