import Modal from 'react-modal';
import {useState} from 'react'
import ShippingLabel from './shippinglabel'

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

export default function ShippingLabelModal(props) {
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
        <button id = "openModal" onClick={openModal}></button>
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
            {modalIsOpen ? <ShippingLabel props={modalContent} />: null}
            <button id= "closeModal" onClick={closeModal}>close</button>
        </Modal>
      </div>
    );
  }
  


