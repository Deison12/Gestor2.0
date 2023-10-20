import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useAlert, useErrors } from '../../../hooks';
import validator from "validator";
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../../Global';
import { useFetch } from '../../../hooks/useFetch';

const InitValues = {
    id: 0,
    name: "",
    description: "",
    status_id: 1,
    custom_identifier: "",
}

const CreateServiceQuotes = () => {

    const [form, setForm] = useState<any>(InitValues);
    const { postData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { errors, setError, clearError } = useErrors();
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);

    const validateErrors = (name: any, value: any) => {
        const validationErrors: any = { ...errors };
        if (name === "name") {
            if (validator.isEmpty(value)) {
                validationErrors.name = ["El campo nombre es obligatorio"];
            } else {
                delete validationErrors.name;
            }
        }
        if (name === "custom_identifier") {
            if (validator.isEmpty(value)) {
                validationErrors.custom_identifier = ["El campo indicativo es obligatorio"];
            } else {
                delete validationErrors.custom_identifier;
            }
        }
        if (name === "description") {
            if (validator.isEmpty(value)) {
                validationErrors.description = ["El campo descripcion es obligatorio"];
            } else {
                delete validationErrors.description;
            }
        }
        setError("name", validationErrors.name);
        setError("custom_identifier", validationErrors.custom_identifier);
        setError("description", validationErrors.description);
    };
    const handleChange = (e: any) => {
        const { name, value, type } = e.target;

        let newValue = type === "radio" ? parseInt(value) : value;

        if (name === 'name') {
            newValue = value
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Validations for the name field
            const validationErrors: any = { ...errors };
            if (validator.isEmpty(newValue)) {
                validationErrors.name = ["El campo nombre es obligatorio"];
            } else {
                delete validationErrors.name;
            }
            setError("name", validationErrors.name);
        }

        setForm((prev: any) => ({
            ...prev,
            [name]: newValue
        }));

        clearError(name);
        validateErrors(name, newValue);
    };
    const handleInputFocus = () => {
        setInputFocus(true);
    }
    const handlesubmit = (e: any) => {
        e.preventDefault();
        selectFunction()
    }
    const selectFunction = () => {
        if (location?.state?.id != null) {
            editForm();
        }
        else { createForm(); }
    };
    const createForm = async () => {
        try {
            const res = await postData(form, 'quoteTypes/store');
            if (!res.success) {
                handleErrorAlert("Error al crear el form.");
            } else {
                handleSuccessAlert("El form se creó exitosamente.", "listarForms");
            }
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
                    id: form.id,
                };
                const res = await postData(payload, 'quoteTypes/store');
                if (!res.success) {
                    handleErrorAlert("Error al editar el form.");
                } else {
                    handleSuccessAlert("El form se editó exitosamente.", "listarservicioscotizar");
                }
            }
        } catch (error) {
            console.error("Error en editForm:", error);
            handleErrorAlert("Error al editar el form.");
        }
    };
    useEffect(() => {
        if (!!editItemData) {
            setForm(editItemData); 
        }
    }, [editItemData]);
    
    return (
        <div>
            {/* <!-- breadcrumb --> */}
            <BreadCrumb
                items={['INICIO', 'VENTAS', 'COTIZACIONES', 'CREAR COTIZACIÓN',]}
                baseURL={['inicio', 'nexos/ventasconfirmaciones', 'nexos/vistalistadocotizaciones', 'crearcotizacion']} />
            {/* title component */}
            <TitleComponent title='CREAR SERVICIO' />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Col sm={12} md={12} lg={6} xl={6} className='mx-auto'>
                            <Row className="justify-content-center mt-5">
                                <Col sm={12} md={12} lg={6} xl={8}>
                                    <FormGroup className="form-group">
                                        <FormGroup className="control-group form-group">
                                            <Form.Label className="form-label">
                                                NOMBRE DEL SERVICIO
                                            </Form.Label>
                                            <InputErrorMessage message={errors.name} inputFocus={inputFocus}>
                                                <Form.Control
                                                    type="text"
                                                    className={`form-control`}
                                                    placeholder=""
                                                    name="name"
                                                    required
                                                    value={form?.name ?? ""}
                                                    onChange={handleChange}
                                                    onFocus={handleInputFocus}
                                                />
                                            </InputErrorMessage>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={12} lg={6} xl={4}>
                                    <FormGroup className="form-group w-100 m-0">
                                        <Form.Label>INDICATIVO</Form.Label>
                                        <FormGroup className="control-group form-group m-0 d-flex">
                                            <InputErrorMessage message={errors.custom_identifier} inputFocus={inputFocus}>
                                                <div className="d-flex align-items-start flex-column w-100">
                                                    <Form.Select
                                                        name="custom_identifier"
                                                        aria-label="Default select example"
                                                        value={form?.custom_identifier ?? ""}
                                                        onFocus={handleInputFocus}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option defaultChecked value={""}> Seleccionar... </option>
                                                        <option value="NP"> NP </option>
                                                        <option value="P"> P </option>
                                                        <option value="M"> M </option>
                                                        <option value="O"> O </option>
                                                        <option value="Z"> Z </option>
                                                    </Form.Select>
                                                </div>
                                            </InputErrorMessage>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className='d-flex mt-4'>
                                <Col sm={12} md={12} lg={12} xl={12} className=''>
                                    <FormGroup>
                                        <Form.Label>DESCRIPCION</Form.Label>
                                        <InputErrorMessage message={errors.description} inputFocus={inputFocus}>
                                            <Form.Control
                                                style={{ height: "5.5cm", width: '100% !important' }}
                                                as="textarea"
                                                name="description"
                                                value={form?.description ?? ""}
                                                onChange={handleChange}
                                                placeholder="Detalles del servicio..."
                                                onFocus={handleInputFocus}
                                                required
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
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
                                                />
                                                <span className="custom-control-label">Inactivo</span>
                                            </Form.Label>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                        variant=""
                                        className="btn btn-primary"
                                        style={{ width: "100%" }}
                                        type="submit"
                                    >
                                        {editItemData ? "Guardar cambios" : "Editar cambios"}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                    </Card.Body>
                </Card>
            </Form >
        </div >
    );

}
CreateServiceQuotes.propTypes = {}
CreateServiceQuotes.defaultProps = {};

export default CreateServiceQuotes
