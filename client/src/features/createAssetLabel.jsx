import Modal from 'react-modal';
import {useState, useRef, forwardRef, useEffect} from 'react'
import "../styles/warehouse.css";
import Box from '@mui/material/Box'
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      align: 'center',
    },
  };



const PrintConfig = (props) => {
    const componentRef = useRef(props);

    return (
      <div>
        <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
        />
        <ComponentToPrint ref={componentRef} />

      </div>
    );
};

export default function PrintAssetLabel(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    // let subtitle;
    console.log(props)
    function openModal() {
      setIsOpen(true);
      toggleModal(props)

    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
      
    }
    
    const toggleModal = (arg) => {
        if (modalIsOpen) {
            setIsOpen(!modalIsOpen)
          setModalContent(null)
        } else {
            setIsOpen(!modalIsOpen)
          setModalContent(arg)
        }
      }


    return (
      <div>
        <button onClick={openModal}>Open QR</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          toggle={toggleModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
            {console.log(modalContent)}  
            {modalIsOpen ? <PrintConfig props={modalContent} />: null}
            <button onClick={closeModal}>close</button>
        </Modal>
      </div>
    );
  }


