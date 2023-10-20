import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors } from '../../hooks';
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import validator from "validator";
import { CFormInput } from '@coreui/react';

const InitValues = {
    id: 0,
    name: "",
    status_id: 1,
}

const CreateOrEditArea = () => {
    const [form, setForm] = useState<any>(InitValues);
    const { postData, putData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { handleEditConfirmation, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
    const [hasErrors, setHasErrors] = useState(true);
    const { errors, setError } = useErrors();

    const handleChange = (e: any) => {
        let { name, value, type } = e.target;

        let newValue = type === "radio" ? parseInt(value) : value;

        if (name === "name" && inputFocus) {
            value = value.trim();
            if (value === "" || validator.isEmpty(value)) {
                setError("name", ["El campo nombre del area"]);
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
            await postData(form, 'services/types/storeRecord', false, "listaareas");
        } catch (error) {
            console.error("Error en createForm:", error);
            handleErrorAlert("Error al crear el form.");
        }
    };

    const editForm = async () => {
        try {
            const confirmationResult = await handleEditConfirmation("¿Estás seguro que deseas editar esta area?");
            if (confirmationResult.isConfirmed) {
                const { id, ...rest } = form;
                const payload = {
                    ...rest,
                    id: location?.state?.id,
                };
                await putData(payload, 'services/typeEdit', "listaareas");
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
                items={['INICIO', 'lista de areas', location?.state?.id ? "Editar area" : "Agregar area"]}
                baseURL={['inicio', 'nexos/listaareas', ""]} />
            {/* title component */}
            <TitleComponent title={location?.state?.id ? "Editar area" : "Agregar area"} />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Col sm={12} md={12} lg={6} xl={6} className='mx-auto'>
                            <Row className="justify-content-center mt-5 mb-3">
                                <Col sm={12} md={12} lg={12} xl={12}>
                                    <FormGroup className="form-group w-100  text-center m-0">
                                        <Form.Label className='mb-3'>Nombre del area</Form.Label>
                                        <InputErrorMessage message={errors?.name?.[0]}
                                            inputFocus={inputFocus}>
                                            <CFormInput
                                                className='text-center'
                                                type="text"
                                                id="quote-autocomplete"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleChange}
                                                onFocus={handleInputFocus}
                                                value={form.name ? form.name : ""}
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

export default CreateOrEditArea;