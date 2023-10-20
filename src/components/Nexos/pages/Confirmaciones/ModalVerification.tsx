import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { TitleComponent } from "../../Global";

const ModalVerification = ({
  data,
  showModal,
  onClose,
  onSubmit,
  quote_number,
  message,
  setMessage
}: any) => {
  const [status, setStatus] = useState("");

  const handleModalClose = async () => {
    onClose()
    setMessage('')
  };
  const isMessageEmpty = message.trim() === "";

  const handleFormSubmit = (status: string) => {
    if (status === 'rechazado') {
      setStatus('rechazado')
    } else {
      setStatus('verificado')
    }
    if (isMessageEmpty) {
    } else {
      onSubmit({ message, status });
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={showModal}
      onHide={handleModalClose}
      keyboard={false}
    >
      <Modal.Body>
        <Form.Group>
          <TitleComponent title="CASTILLA RESERVADO"  align="center" />

          <h5 className="text-center"> Tipo de asamblea: <b className="text-primary text-uppercase">   {data.meeting_type}</b> </h5>
          <h5 className="text-center"> Número de cotización: <b className="text-primary text-uppercase">  {quote_number} </b> </h5>
          <hr />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Motivo:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          onClick={handleModalClose}>
          Volver
        </Button>
        <Button
          variant="danger"
          disabled={isMessageEmpty}
          onClick={() => handleFormSubmit('rechazado')}>
          Rechazado
        </Button>
        <Button
          disabled={isMessageEmpty}
          variant="primary"
          onClick={() => handleFormSubmit('verificado')}
        >
          Verificado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVerification;