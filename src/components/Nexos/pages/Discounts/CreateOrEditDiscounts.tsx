import { Card, Col, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';
import { useAlert, useErrors } from '../../hooks';
import { TitleComponent, BreadCrumb, InputErrorMessage } from '../../Global';
import validator from "validator";

const InitValues = {
    id: 0,
    name: "",
    is_percentage: 1,
    amount: "",
    description: "",
    status_id: 1
}

const CreateOrEditDiscounts = () => {

    const [form, setForm] = useState<any>(InitValues);
    const { postData, putData } = useFetch();
    const location: any = useLocation();
    const { state: editItemData } = location;
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    const [inputFocus, setInputFocus] = useState(false);
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
            await postData(form, 'discount/create', false, "listardescuentos");
        } catch (error) {
            console.error("Error en createdescuento:", error);
            handleErrorAlert("Error al crear el descuento.");
        }
    };
    const editForm = async () => {
        try {
            // Mostrar la confirmación antes de editar el form
            const confirmationResult = await handleEditConfirmation("¿Estás seguro que deseas editar este descuento?");
            if (confirmationResult.isConfirmed) {
                const { id, ...rest } = form;
                const payload = {
                    ...rest,
                    id: form.id,
                };
                const res = await putData(payload, `discount/edit/${form.id}`);
                if (!res.success) {
                    handleErrorAlert("Error al editar el descuento.");
                } else {
                    handleSuccessAlert("El descuento se editó exitosamente.", "listardescuentos");
                }
            }
        } catch (error) {
            console.error("Error en editForm:", error);
            handleErrorAlert("Error al editar el descuento.");
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
                items={['INICIO', 'lista descuentos', location?.state?.id ? "Editar Descuento" : "Agregar Descuento"]}
                baseURL={['inicio', 'nexos/listardescuentos', location?.state?.id ? "editardescuento/" + location?.state?.id : "creardescuento"]} />
            {/* title component */}
            <TitleComponent title={location?.state?.id ? "Editar Descuento" : "Agregar Descuento"} />
            {/* Card */}
            <Form className="form-horizontal" onSubmit={handlesubmit}>
                <Card className="w-100">
                    <Card.Body className="w-100">
                        <Row>
                            <Col sm={12} md={12} lg={6} xl={6}>
                                <Row className="justify-content-center">
                                    <Col sm={12} md={12} lg={12} xl={12}>
                                        <FormGroup className="form-group w-100 m-0">
                                            <Form.Label className='mb-3'>NOMBRE DEL DESCUENTO</Form.Label>
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
                            </Col>
                            <Col sm={12} md={12} lg={6} xl={6}>
                                <Row className='mb-3 mt-1'>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <FormGroup className="form-group text-center">
                                            <Form.Label className="form-label mb-2">VALOR EN PORCENTAJE</Form.Label>
                                            <div className="custom-controls-stacked d-flex justify-content-center gap-5">
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="is_percentage"
                                                        value={1}
                                                        checked={form?.is_percentage === 1}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Si</span>
                                                </Form.Label>
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="is_percentage"
                                                        value={0}
                                                        checked={form?.is_percentage === 0}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">No</span>
                                                </Form.Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center  ">
                                    <Col sm={12} md={12} lg={12} xl={12}>
                                        <FormGroup className="form-group w-100 m-0">
                                            <Form.Label className='mb-2'>{form.is_percentage === 1 ? 'PORCENTAJE' : 'VALOR'} DEL DESCUENTO</Form.Label>
                                            <Form.Control
                                                type="number"
                                                className={`form-control`}
                                                placeholder=""
                                                name="amount"
                                                required
                                                value={form?.amount ?? ""}
                                                onChange={handleChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <FormGroup className="form-group text-center">
                                            <Form.Label className="form-label">ESTADO</Form.Label>
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
                                <Row className='mb-4 mt-4'>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Button
                                            variant=""
                                            className="btn btn-primary"
                                            style={{ width: "100%" }}
                                            type="submit"
                                        >
                                            {editItemData ? "Editar cambios" : "Guardar cambios"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Form>
        </>
    );

}

export default CreateOrEditDiscounts;
