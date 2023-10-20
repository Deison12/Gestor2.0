import React from 'react'
import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors } from '../../hooks';
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import { Autocomplete, TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import validator from "validator";
import { CFormInput } from '@coreui/react';

const InitValues = {
    id: 0,
    name: "",
    status_id: 1,
}

const QuoteState = () => {
    const [form, setForm] = useState<any>(InitValues);
    const { postData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
    const [hasErrors, setHasErrors] = useState(true);
    const { errors, setError, clearError } = useErrors();

    const handleChange = (e: any) => {
        let { name, value, type } = e.target;

        let newValue = type === "radio" ? parseInt(value) : value;

        if (name === "name" && inputFocus) {
            value = value.trim();
            if (value === "" || validator.isEmpty(value)) {
                setError("name", ["El campo nombre es obligatorio"]);
                setHasErrors(true);
            } else {
                setError("name", [""]);
                setHasErrors(false);
            }
            setForm((prev: any) => ({
                ...prev,
                [name]: newValue
            }));
        }

        if (name === "status_id") {
            setForm((prev: any) => ({
                ...prev,
                [name]: newValue
            }));
        }
    };

    const handleInputFocus = () => {
        setInputFocus(true);
    };

    const handlesubmit = (e: any) => {
        e.preventDefault();
        console.log("FORM:", form);
        selectFunction();
    };

    const selectFunction = () => {
        if (location?.state?.id != null) {
          editForm();
        } else {
          createForm();
        }
    };

    const createForm = async () => {
        try {
            const payload = {
                id: 0,
                ...form
            }
            const res = await postData(payload, 'quoteStatus/create', false, "listaestadoscotizacion");
        } catch (error) {
            console.error("Error en createForm:", error);
            handleErrorAlert("Error al crear el form.");
        }
    };

    const editForm = async () => {
        try {
            // Mostrar la confirmación antes de editar el form
            const confirmationResult = await handleEditConfirmation("¿Estás seguro que deseas editar este servicio?");
            if (confirmationResult.isConfirmed) {
                const { id, ...rest } = form;
                const payload = {
                    ...rest,
                    id: location?.state?.id,    
                };
                const res = await postData(payload, 'quoteStatus/create', false, "listaestadoscotizacion");
            }
        } catch (error) {
            console.error("Error en editForm:", error);
            handleErrorAlert("Error al editar el form.");
        }
    };

    useEffect(() => {
        if (!!editItemData) {
            setForm(editItemData);
            setHasErrors(false);
        } 
    }, [editItemData]);


  return (
    <>
            {/* <!-- breadcrumb --> */}
            <BreadCrumb
                items={['INICIO', 'ESTADO COTIZACIÓN', location?.state?.id ? "Editar estado cotización" : "Agregar estado cotización"]}
                baseURL={['inicio', 'nexos/estadocotizacion', location?.state?.id ? "estadocotizacion/" + location?.state?.id : "estadocotizacion"]} />
            {/* title component */}
            <TitleComponent title={location?.state?.id ? "Editar estado cotización" : "Agregar estado cotización"} />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Col sm={12} md={12} lg={6} xl={6} className='mx-auto'>
                            <Row className="justify-content-center mt-5 mb-3">
                                <Col sm={12} md={12} lg={12} xl={12}>
                                    <FormGroup className="form-group w-100 m-0">
                                        <Form.Label className='mb-3'>NOMBRE DE LA COTIZACIÓN</Form.Label>
                                        <InputErrorMessage message={errors?.name?.[0]}
                                                    inputFocus={inputFocus}>
                        <CFormInput
                          type="text"
                          id="quote-autocomplete"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={handleInputFocus}
                          value={form.name? form.name : ""}
                          required
                        />
                      </InputErrorMessage>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className='mb-2'>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <FormGroup className="form-group text-center">
                                        <Form.Label className="form-label">Estado</Form.Label>
                                        <div className="custom-controls-stacked d-flex justify-content-center gap-5">
                                            <Form.Label className="custom-control custom-radio">
                                                <Form.Control
                                                    type="radio"
                                                    className="custom-control-input"
                                                    name="status_id"
                                                    value={1}
                                                    checked={form?.status_id === 1}
                                                    onChange={handleChange}
                                                    onClick={handleInputFocus}
                                                />
                                                <span className="custom-control-label">Activo</span>
                                            </Form.Label>
                                            <Form.Label className="custom-control custom-radio">
                                                <Form.Control
                                                    type="radio"
                                                    className="custom-control-input"
                                                    name="status_id"
                                                    value={0}
                                                    checked={form?.status_id === 0}
                                                    onChange={handleChange}
                                                    onClick={handleInputFocus}
                                                />
                                                <span className="custom-control-label">Inactivo</span>
                                            </Form.Label>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className='mb-4'>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                        variant=""
                                        className="btn btn-primary"
                                        style={{ width: "100%" }}
                                        type="submit"
                                        disabled={hasErrors}
                                    >
                                        {editItemData ? "Guardar cambios" : "Editar cambios"}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Card.Body>
                </Card>
            </Form>
        </>
  )
}

export default QuoteState;