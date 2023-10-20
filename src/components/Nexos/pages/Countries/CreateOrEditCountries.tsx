import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors } from '../../hooks';
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import countries from '../../../../json/countries.json'
import { Autocomplete, TextField } from '@mui/material';
import { inputLabelClasses } from "@mui/material/InputLabel";
import validator from "validator";

const InitValues = {
    id: 0,
    name: undefined,
    status_id: 1,
    custom_identifier: "",
}

const CreateOrEditCountries = () => {

    const [form, setForm] = useState<any>(InitValues);
    const { postData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);
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

    const handleAutocompleteChange = (e: any, newValue: any) => {
        if (newValue) {
            setForm((prev: any) => ({
                ...prev,
                name: newValue.name_es,
                custom_identifier: newValue.dial_code
            }));
            clearError('name');
        } else {
            setForm((prev: any) => ({
                ...prev,
                name: "",
                custom_identifier: ""
            }));
            if (!form.name) {
                setError("name", ["El campo nombre es obligatorio"]);
            }
        }
    };

    const handleAutocompleteClear = () => {
        if (!form.name) {
            setError("name", ["El campo nombre es obligatorio"]);
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
            return console.log(form)
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
                const res = await postData(payload, 'quoteTypes/store');
                if (!res.success) {
                    handleErrorAlert("Error al editar el pais.");
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
        <>
            {/* <!-- breadcrumb --> */}
            <BreadCrumb
                items={['INICIO', 'PAISES', location?.state?.id ? "Editar pais" : "Agregar pais"]}
                baseURL={['inicio', 'nexos/listarpaises', location?.state?.id ? "editarpais/" + location?.state?.id : "crearpais"]} />
            {/* title component */}
            <TitleComponent title={location?.state?.id ? "Editar pais" : "Agregar pais"} />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Col sm={12} md={12} lg={6} xl={6} className='mx-auto'>
                            <Row className="justify-content-center mt-5 mb-3">
                                <Col sm={12} md={12} lg={12} xl={12}>
                                    <FormGroup className="form-group w-100 m-0">
                                        <Form.Label className='mb-3'>NOMBRE PAIS</Form.Label>
                                        <Autocomplete
                                            id="country-autocomplete"
                                            options={countries.countries}
                                            size="small"
                                            getOptionLabel={(option) => `${option.name_es} (${option.dial_code})`}
                                            value={countries.countries.find(country => country.dial_code === form?.custom_identifier) || null}
                                            onChange={handleAutocompleteChange}
                                            onClose={handleAutocompleteClear}
                                            onBlur={handleInputFocus}
                                            renderInput={(params) => (
                                                <InputErrorMessage
                                                    message={
                                                        form.name === "" ? ["El campo nombre es obligatorio"]
                                                            : form.name === undefined ? [] : []} inputFocus={inputFocus} >
                                                    <TextField
                                                        {...params}
                                                        label="Seleccione un país"
                                                        variant="outlined"
                                                        className={`orange-outline`}
                                                        onFocus={handleInputFocus}
                                                        required
                                                        InputLabelProps={{
                                                            sx: {
                                                                [`&.${inputLabelClasses.shrink}`]: {
                                                                    color: inputFocus ? "#ff7c23" : ''
                                                                }
                                                            }
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

export default CreateOrEditCountries;
