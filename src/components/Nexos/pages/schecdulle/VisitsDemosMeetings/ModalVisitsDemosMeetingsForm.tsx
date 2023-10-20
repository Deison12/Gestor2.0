import Modal from 'react-bootstrap/Modal';
import FormStep2 from '../../../Global/FormStep2';

const ModalVisitsDemosMeetingsForm = ({
  show,
  handleClose,
  searchNit
}: any) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Body>
        <FormStep2 
          serviceType={'demos'}
          handleClose={handleClose}
          searchNit={searchNit}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ModalVisitsDemosMeetingsForm
