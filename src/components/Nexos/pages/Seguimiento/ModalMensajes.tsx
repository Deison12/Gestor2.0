import React, { useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import "./ModalMensajes.scss";
import { TitleComponent } from "../../Global";
import dayjs from "dayjs";

const ModalMensajes = ({ showModal, onClose, messages, inCharge }: any) => {
    const [showFullNote, setShowFullNote] = useState(false);
    const [expandedNoteIndex, setExpandedNoteIndex] = useState<number | null>(null);
    const [priorityFilter, setPriorityFilter] = useState("all");

    const handleVerClick = (index: number) => {
        setExpandedNoteIndex(index);
        setShowFullNote(true);
    };

    const handleVerMenosClick = () => {
        setExpandedNoteIndex(null);
        setShowFullNote(false);
    };

    const handlePrioritySelectChange = (e: any) => {
        setPriorityFilter(e.target.value);
    };

    // Filtrar mensajes según el valor del select
    const filteredMessages = priorityFilter === "all"
        ? messages
        : messages.filter((note: any) => note.priority === Number(priorityFilter));

    return (
        <Modal
            show={showModal}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header >
                <div className="d-flex flex-column w-100">
                    <TitleComponent title="Mensajes" />
                    <Form.Select
                        id="priorityFilter"
                        value={priorityFilter}
                        onChange={handlePrioritySelectChange}
                    >
                        <option value="all">Todos</option>
                        <option value="1">Prioritarios</option>
                        <option value="0">No prioritarios</option>
                    </Form.Select>
                </div>
            </Modal.Header>
            <Modal.Body>

                <hr />
                <div className="grid-messages">
                    <div className="messages-container">
                        {filteredMessages.slice().reverse().map((note: any, index: number) => (

                            <Card
                                className={`pt-4 pb-1 px-4 ${note.priority == 1 ? 'priority1-card' : ''
                                    }`}
                                key={index}
                                style={{
                                    boxShadow:
                                        expandedNoteIndex === index
                                            ? '0 0 5px #ff7300'
                                            : '0 0 5px #a8a6a6',
                                    border:
                                        expandedNoteIndex === index
                                            ? 'solid 1px #ff7300'
                                            : '',
                                }}
                            >
                                <span className="mb-2" >
                                    <b className="font-message-title">Usuario:</b> <p className="font-message"> {note.name} - {dayjs(note.created_at).format("DD-MM-YYYY - HH:mm A")}</p>
                                </span>
                                <span className="font-message">
                                    <b className="font-message-title">Nota:</b>
                                </span>
                                {showFullNote && expandedNoteIndex === index ? (
                                    <div>
                                        <p className="font-message">{note.message}</p>
                                        <div className="text-end" >
                                            <Button
                                                variant="link"
                                                className="btn-message-hover font-message"
                                                onClick={handleVerMenosClick}
                                            >
                                                Ver menos
                                            </Button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="mb-2">
                                        <p className="font-message">
                                            {note.message.length > 100
                                                ? note.message.slice(0, 100) + "..."
                                                : note.message}
                                        </p>
                                        {note.message.length > 100 && (
                                            <div className="text-end" >
                                                <Button
                                                    variant="link"
                                                    className="btn-message-hover font-message"
                                                    onClick={() => handleVerClick(index)}
                                                >
                                                    Ver más
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalMensajes;
