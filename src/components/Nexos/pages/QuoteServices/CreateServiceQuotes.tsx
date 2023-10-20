import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors, useFile } from '../../hooks';
import validator from "validator";
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const InitValues = {
    name: "",
    description: "",
    status_id: 1,
    custom_identifier: "",
    file: "",
}

const CreateServiceQuotes = () => {
    const [form, setForm] = useState<any>(InitValues);
    const { postData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { errors, setError, clearError } = useErrors();
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
    const { handleAdd, fileInputRef, image, handleButtonClick, handleDelete } = useFile(setForm);

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
            } else if (value.length > 5) {
                validationErrors.custom_identifier = ["El campo indicativo no puede tener más de 5 caracteres"];
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
        if (name === 'custom_identifier') {
            newValue = value.toUpperCase()
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
            const { id, ...rest } = form;
            const payload: any = {
                ...rest,
                id: 0,
                file: image,
            };
            await postData(payload, 'quoteTypes/store', false, "listarservicioscotizar");
        } catch (error) {
            console.error("Error en createForm:", error);
            handleErrorAlert("Error al crear el servico de cotización.");
        }
    };
    const editForm = async () => {
        try {
            // Mostrar la confirmación antes de editar el form
            const confirmationResult = await handleEditConfirmation("¿Estás seguro que deseas editar este servicio de cotización?");
            if (confirmationResult.isConfirmed) {
                const payload = {
                    id: form.id,
                    file: image,
                    photo: image,
                    custom_identifier: form.custom_identifier,
                    description: form.description,
                    name: form.name,
                    status_id: form.status_id,
                };
                await postData(payload, 'quoteTypes/store', false, 'listarservicioscotizar');
            }
        } catch (error) {
            console.error("Error en editForm:", error);
            handleErrorAlert("Error al editar el servico de cotización.");
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
                items={['INICIO', 'Configuraciones', 'LISTA SERVICIO', 'CREAR SERVICIO',]}
                baseURL={['inicio', 'nexos/configuraciones', 'nexos/vistalistadocotizaciones', 'crearcotizacion']} />
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
                                                    <Form.Control
                                                        type="text"
                                                        className={`form-control`}
                                                        placeholder=""
                                                        name="custom_identifier"
                                                        required
                                                        value={form?.custom_identifier ?? ""}
                                                        onChange={handleChange}
                                                        onFocus={handleInputFocus}
                                                    />
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
                                    <div className="d-flex flex-column align-items-center ">
                                        <Form.Label>Subir Foto</Form.Label>
                                        <div className="position-relative rounded-circle hover_opacity_btn">
                                            <img
                                                src={image || form?.photo || "https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-upload-4341320_120532.png"}
                                                alt="Imagen perfil de usuario"
                                                className="avatar avatar-xxl rounded-circle cursor-pointer opacity-75"
                                            />
                                            <input
                                                type="file"
                                                onChange={handleAdd}
                                                ref={fileInputRef}
                                                name="file"
                                                id="file"
                                                className="d-none"
                                            />
                                            <div onClick={handleButtonClick} style={{
                                                position: "absolute",
                                                top: "30%",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                cursor: "pointer",
                                            }}>
                                                <PhotoCameraIcon fontSize="large" color="action" />
                                            </div>

                                            <div onClick={handleDelete} style={{
                                                position: "absolute",
                                                bottom: "0",
                                                left: "90%",
                                                cursor: "pointer",
                                            }}>
                                                <HighlightOffIcon fontSize="medium" color="action" />
                                            </div>
                                        </div>
                                    </div>
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
