import Modal from 'react-modal';
import {useState, useRef, forwardRef, useEffect} from 'react'
import "../styles/warehouse.css";
import Box from '@mui/material/Box'
import ReactToPrint from 'react-to-print';
import PrintConfig from './PrintConfig';


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
        <button id = "openModal" onClick={openModal}>Open QR</button>
        {/* {setTimeout(() => {  document.getElementById("openModal").click() }, 1000)} */}

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
  


