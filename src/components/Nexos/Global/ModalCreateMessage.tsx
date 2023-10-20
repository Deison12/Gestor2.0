import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { TitleComponent } from "./TitleComponent";

const ModalCreateMessage = ({
  showModal,
  onClose,
  onSubmit,
  selectedRowId,
}: any) => {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = () => {
    onSubmit({ message, selectedRowId, priority });
  };

  const resetForm = () => {
    setMessage("");
    setMessage("");
    setPriority("0");
  };

  const handleModalClose = async () => {
    onClose();
    resetForm();
  };

  const isMessageEmpty = message.trim() === "";

  const handlePriorityChange = (e: any) => {
    setPriority(e.target.value);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={showModal}
      onHide={handleModalClose}
      keyboard={false}
    >
      <Modal.Body>
        <Form.Group>
          <TitleComponent
            title="Mensaje seguimiento"
            description={`Cotización #${selectedRowId}`}
          />
          <hr />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Prioridad:</Form.Label>
          <Form.Select
            name="priority"
            aria-label="Default select example"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="0" defaultChecked >No prioritario</option>
            <option value="1">Prioritario</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Nota:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleModalClose}>
          Cerrar
        </Button>
        <Button
          disabled={isMessageEmpty}
          variant="primary"
          onClick={() => {
            handleSubmit()
            handleModalClose()
          }}
        >
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateMessage;
