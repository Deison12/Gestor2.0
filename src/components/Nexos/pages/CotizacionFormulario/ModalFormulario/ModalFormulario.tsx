import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Row, Modal } from 'react-bootstrap';

const ModalFormulario = ({ correo22, correo33 }: any) => {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const [correos, setCorreos] = useState({
        'correo2': '',
        'correo3': '',
    })
    const { correo2, correo3 } = correos
    if (correo22 !== '' && correo33 !== '') {
        const newArray = { correo2: correo22, correo3: correo33 }
        setCorreos(newArray)
    } else {
        console.error('Estan vacios')
    }
    const handlerChange = ((e: any) => {
        setCorreos({ ...correos, [e.target.name]: e.target.value })
    })

    return (
        <div>
            <Row>
                <Col lg={6} md={6}>
                    <span className="material-icons md-36 md-dark" onClick={handleShow}>
                        &#xeff3;
                    </span>
                    <Modal show={show} centered >
                        <Modal.Body className="modal-body pd-sm-40">
                            <Button
                                onClick={() => setShow(false)}
                                className="close pos-absolute t-15 r-20 tx-26"
                                variant=""
                            >
                                x
                            </Button>
                            <div className='text-center'>
                                <h5 className="modal-title mg-b-5">Correos</h5>
                                <p className="mg-b-20">
                                    Se pueden ingresar maximo 3 correos
                                </p>
                            </div>
                            <FormGroup className="form-group">
                                <Form.Control placeholder="Email-1" name='correo2' value={correo2} onChange={handlerChange} type="email" />
                            </FormGroup>
                            <FormGroup className="form-group">
                                <Form.Control placeholder="Email-2" name='correo3' value={correo3} onChange={handlerChange} type="email" />
                            </FormGroup>
                            <Button
                                variant=""
                                className="btn btn-primary btn-block"
                                onClick={() => [setShow(false)]}
                            >
                                Continue
                            </Button>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </div>
    )
}

export default ModalFormulario