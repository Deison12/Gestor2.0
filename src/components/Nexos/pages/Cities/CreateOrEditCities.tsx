import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors } from '../../hooks';
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import { Autocomplete, TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import countries from '../../../../json/countries.json'

const InitValues = {
    id: 0,
    name: undefined,
    status_id: 1,
}

const CreateOrEditCities = () => {

    const [form, setForm] = useState<any>(InitValues);
    const { postData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
    //const [nameTouched, setNameTouched] = useState(false);
    const { errors, setError, clearError } = useErrors();

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        let newValue = type === "radio" ? parseInt(value) : value;
        if (name === 'name') {
            newValue = value
                .toLowerCase()
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        setForm((prev: any) => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleAutocompleteChange = (event: any, newValue: any) => {
        if (newValue) {
            setForm((prev: any) => ({
                ...prev,
                name: newValue.name_es,
            }));
        }
    };
    const handleAutocompleteClear = () => {
        if (!form.name) {
            setError("name", ["El campo nombre es obligatorio"]);
        } else {
            clearError("name")
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
                return console.log(payload)
                /* const res = await postData(payload, 'quoteTypes/store');
                if (!res.success) {
                    handleErrorAlert("Error al editar el pais.");
                } else {
                    handleSuccessAlert("El form se editó exitosamente.", "listarservicioscotizar");
                } */
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
    console.log(errors)
    return (
        <>
            {/* <!-- breadcrumb --> */}
            <BreadCrumb
                items={['INICIO', 'PAISES', location?.state?.id ? "Editar ciudad" : "Agregar ciudad"]}
                baseURL={['inicio', 'nexos/listarciudades', location?.state?.id ? "editarciudad/" + location?.state?.id : "crearciudad"]} />
            {/* title component */}
            <TitleComponent title={location?.state?.id ? "Editar ciudad" : "Agregar ciudad"} />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Col sm={12} md={12} lg={6} xl={6} className='mx-auto'>
                            <Row className="justify-content-center mt-5 mb-3">
                                <Col sm={12} md={12} lg={12} xl={12}>
                                    <FormGroup className="form-group w-100 m-0">
                                        <Form.Label className='mb-3'>NOMBRE CIUDAD</Form.Label>
                                        <Autocomplete
                                            id="country-autocomplete"
                                            options={countries.countries}
                                            size="small"
                                            getOptionLabel={(option) => option.name_es}
                                            value={countries.countries.find(country => country.name_es === form.name) || null}
                                            onChange={handleAutocompleteChange}
                                            onClose={handleAutocompleteClear}
                                            onBlur={handleInputFocus}
                                            renderInput={(params) => (
                                                <InputErrorMessage
                                                    message={form.name === "" ? ["El campo nombre es obligatorio"] : []}
                                                    inputFocus={inputFocus}
                                                >
                                                    <TextField
                                                        {...params}
                                                        label="Seleccione una ciudad"
                                                        variant="outlined"
                                                        className={`orange-outline`}
                                                        onFocus={handleInputFocus}
                                                        required
                                                        InputLabelProps={{
                                                            sx: {
                                                                [`&.${inputLabelClasses.shrink}`]: {
                                                                    color: inputFocus ? "#ff7c23" : '',
                                                                },
                                                            },
                                                        }}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            classes: {
                                                                notchedOutline: `custom-notched-outline ${inputFocus ? 'orange-outline' : ''}`,
                                                            },
                                                        }}
                                                    />
                                                </InputErrorMessage>
                                            )}
                                        />

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

                            <Row className='mb-4'>
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
            </Form>
        </>
    );

}

export default CreateOrEditCities;
