import { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap"
import { useErrors, useFetch } from "../../../hooks";
import { BreadCrumb, InputErrorMessage, PDFViewer,/*  InputErrorMessage, PDFViewer  */ } from "../../../Global";
/* material ui */
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import ModalVerification from "./ModalVerification";
import { useLocation } from "react-router-dom";
import validator from "validator";

/* date */
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Verifications = () => {
    const location: any = useLocation();
    const { state } = location;
    const quote_id = state.id

    const { getAllData, postData } = useFetch()
    const [form, setForm] = useState<any>({});
    const [onfocus, setOnfocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataPDF, setDataPDF] = useState<string>("https://nexos-cdn.sfo3.cdn.digitaloceanspaces.com/Quotes/quote-virtual.pdf")
    const [message, setMessage] = useState("");
    const [itemErrors, setItemErrors] = useState<{ [key: string]: string }>({});
    const { errors, setError, clearError } = useErrors();
    const [fieldChecks, setFieldChecks] = useState<Record<string, boolean>>({});

    const handleFieldCheckChange = (fieldName: string) => {
        setFieldChecks({ ...fieldChecks, [fieldName]: !fieldChecks[fieldName] });
    };
    
    const handleValidateChecked = () => {
        let result = true
        let quantity = form && form.items?.length + 10
        const checkedValues = Object.values(fieldChecks).filter((item: any) => item === true)
        if (checkedValues.length === quantity) {
            result = false
        }
        return result
    }

    // Función para validar errores en el formulario
    const validateErrors = (nameData: string, valueData: any) => {
        const validationErrors: any = { ...errors };
        if (nameData === "name") {
            if (validator.isEmpty(valueData)) {
                validationErrors.name = ["El campo nombre es obligatorio"];
            } else {
                delete validationErrors.name;
            }
        }
        if (nameData === "nit") {
            if (validator.isEmpty(valueData)) {

                validationErrors.nit = "El campo NIT es obligatorio.";
            } else {
                delete validationErrors.nit;
            }
        }
        if (nameData === "meeting_type") {
            if (validator.isEmpty(valueData)) {

                validationErrors.meeting_type = "El campo Tipo de Asamblea es obligatorio.";
            } else {
                delete validationErrors.meeting_type;
            }
        }
        if (nameData === "client_name") {
            if (validator.isEmpty(valueData)) {

                validationErrors.client_name = "El campo Nombre del Cliente es obligatorio.";
            } else {
                delete validationErrors.client_name;
            }
        }
        if (nameData === "address") {
            if (validator.isEmpty(valueData)) {

                validationErrors.address = "El campo Dirección del Comercio es obligatorio.";
            } else {
                delete validationErrors.address;
            }
        }
        if (nameData === "contact_person") {
            if (validator.isEmpty(valueData)) {

                validationErrors.contact_person = "El campo Nombre del Encargado es obligatorio.";
            } else {
                delete validationErrors.contact_person;
            }
        }
        if (nameData === "meeting_register") {
            if (validator.isEmpty(valueData)) {

                validationErrors.meeting_register = "El campo Hora de Registro es obligatorio.";
            } else {
                delete validationErrors.meeting_register;
            }
        }
        if (nameData === "meeting_init") {
            if (validator.isEmpty(valueData)) {

                validationErrors.meeting_init = "El campo Hora de Inicio es obligatorio.";
            } else {
                delete validationErrors.meeting_init;
            }
        }
        if (nameData === "meeting_date") {
            if (validator.isEmpty(valueData)) {

                validationErrors.meeting_date = "El campo Fecha del Evento es obligatorio.";
            } else {
                delete validationErrors.meeting_date;
            }
        }
        if (nameData === "phone") {
            if (validator.isEmpty(valueData)) {

                validationErrors.phone = "El campo Teléfono es obligatorio.";
            } else {
                delete validationErrors.phone;
            }
        }
        if (nameData === "city") {
            if (validator.isEmpty(valueData)) {

                validationErrors.city = "El campo Ciudad es obligatorio.";
            } else {
                delete validationErrors.city;
            }
        }
        if (nameData === "observations") {

            if (validator.isEmpty(valueData)) {

                validationErrors.observations = "El campo Observaciones es obligatorio.";
            } else {
                delete validationErrors.observations;
            }
        }

        const newErrors = { ...itemErrors };
        form.items.forEach((item: any) => {
            if (item.id === nameData) {
                if (valueData === "" || valueData === " " || valueData === null || valueData === undefined || valueData === "0") {
                    newErrors[`item-${item.id}`] = `El campo para ${item.name} es obligatorio.`;
                } else if (parseFloat(valueData) < 0) {
                    newErrors[`item-${item.id}`] = `El valor para ${item.name} no puede ser un número negativo.`;
                } else {
                    delete newErrors[`item-${item.id}`];
                }
            }
        });

        setItemErrors(newErrors);
        // Establecer errores
        setError("nit", validationErrors.nit);
        setError("meeting_type", validationErrors.meeting_type);
        setError("client_name", validationErrors.client_name);
        setError("address", validationErrors.address);
        setError("contact_person", validationErrors.contact_person);
        setError("meeting_register", validationErrors.meeting_register);
        setError("meeting_init", validationErrors.meeting_init);
        setError("meeting_date", validationErrors.meeting_date);
        setError("phone", validationErrors.phone);
        setError("city", validationErrors.city);
        setError("observations", validationErrors.observations);
    };

    // Manejar cambios en los campos del formulario
    const handleChange = (name: any, value: any) => {
        setForm((prevForm: any) => {
            const updatedForm = { ...prevForm };
            if (typeof name === 'number') {
                updatedForm.items = updatedForm.items.map((item: any) => {
                    if (item.id === name) {
                        return {
                            ...item,
                            value: value,
                        };
                    }
                    return item;
                });
            } else {
                updatedForm[name] = value;
            }
            return updatedForm;
        });
        clearError(name);
        validateErrors(name, value);
    };

    const handleSubmit = async (modalData: any) => {
        const items = form.items && form.items.map((item: any) => ({ id: item.id, value: item.value }));
        const meetingRegisterTime = form.meeting_register;
        const meetingInitTime = form.meeting_init;

        const payload = {
            items,
            quote_id: quote_id,
            meeting_register: meetingRegisterTime,
            meeting_init: meetingInitTime,
            meeting_date: dayjs(form.meeting_date).format("YYYY-MM-DD"),
            meeting_type: form.meeting_type,
            address: form.address,
            city: form.city,
            name: form.client_name,
            contact_person: form.contact_person,
            contact_phone: form.contact_phone,
            nit: form.nit,
            observations: form.observations,
            phone: form.phone,
            status: modalData.status,
            description: modalData.message,
        };

        await postData(payload, "sales/order/verification/edit");
        setShowModal(false)
        setMessage('')
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const responseInputs: any = await getAllData(`api/sales/order/verification/${quote_id}`);
                setForm({
                    id: 0,
                    status: "",
                    horaDeRegistro: responseInputs.meeting_register === "None" ? "" : responseInputs.meeting_register || form.meeting_register,
                    horaDeInicio: responseInputs.meeting_init === "None" ? "" : responseInputs.meeting_init || form.meeting_init,
                    meeting_date: responseInputs.meeting_date === "None" ? null : responseInputs.meeting_date || "",
                    address: responseInputs.address || "",
                    city: responseInputs.city || "",
                    client_name: responseInputs.client_name || "",
                    contact_person: responseInputs.contact_person || "",
                    contact_phone: responseInputs.contact_phone || "",
                    items: responseInputs.items
                        ? responseInputs.items.map((item: any) => ({
                            id: item.id,
                            name: item.name,
                            value: item.quantity || "",
                        }))
                        : [],
                    meeting_register: responseInputs.meeting_register === "None" ? "" : responseInputs.meeting_register || "",
                    meeting_init: responseInputs.meeting_init === "None" ? "" : responseInputs.meeting_init || "",
                    meeting_type: responseInputs.meeting_type || "",
                    nit: responseInputs.nit || "",
                    observations: responseInputs.observations || "",
                    phone: responseInputs.phone || "",
                });
            } catch (error) {
                console.log("error", error);
            }
        };
        getData();
    }, []);

    return (
        <>
            {/* breadcrumb */}
            < BreadCrumb
                items={["INICIO", "RESERVAS"]}
                baseURL={["/", "nexos/verificaciones"]}
            />
            {/* Modal Confirmation */}
            <ModalVerification
                data={form}
                quote_number={quote_id}
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                message={message}
                setMessage={setMessage}
            />

            {/* All Forms */}
            <div className=" mt-4">
                <Row>
                    {/* PDF */}
                    <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                        <h4 className="text-center text-uppercase">Evidencia cargada por la reserva</h4>
                        <div style={{
                            position: 'sticky',
                            top: 70,
                            height: 'calc(100vh - 150px)',
                            overflow: 'auto'
                        }}>
                            <PDFViewer pdfUrl={dataPDF} />
                        </div>
                    </Col>

                    {/* Verification form data  */}
                    <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                        <h4 className="text-center text-uppercase">verificación</h4>
                        <Card className="p-3"
                            style={{
                                border: "3px solid #ced4da",
                            }}
                        >
                            <Form className="form-horizontal">
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="form-label">NIT</Form.Label>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}
                                        className="d-flex align-items-center"
                                    >
                                        <input
                                            disabled={true} //fieldChecks["nit"]
                                            onFocus={() => setOnfocus(true)}
                                            onBlur={() => setOnfocus(false)}
                                            type="text"
                                            className={`form-control text-capitalize`}
                                            name="nit"
                                            value={form?.nit ?? ""}
                                            onChange={(e) => handleChange("nit", e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="meeting_type"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["meeting_type"]}
                                                onClick={() => handleFieldCheckChange("meeting_type")}
                                                defaultChecked={form?.meeting_type ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            tipo de asamblea
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.meeting_type} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["meeting_type"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="meeting_type"
                                                value={form?.meeting_type ?? ""}
                                                onChange={(e) => handleChange("meeting_type", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["client_name"]}
                                                onClick={() => handleFieldCheckChange("client_name")}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Nombre cliente
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.client_name} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["client_name"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="client_name"
                                                value={form?.client_name ?? ""}
                                                onChange={(e) => handleChange("client_name", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["address"]}
                                                onClick={() => handleFieldCheckChange("address")}
                                                defaultChecked={form?.address ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Direccion comercio
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.address} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["address"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="address"
                                                value={form?.address ?? ""}
                                                onChange={(e) => handleChange("address", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["contact_person"]}
                                                onClick={() => handleFieldCheckChange("contact_person")}
                                                defaultChecked={form?.contact_person ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Nombre encargado
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.contact_person} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["contact_person"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="contact_person"
                                                value={form?.contact_person ?? ""}
                                                onChange={(e) => handleChange("contact_person", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} lg={4} xl={4} className="d-flex align-items-center">
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["meeting_register"]}
                                                onClick={() => handleFieldCheckChange("meeting_register")}
                                                defaultChecked={form?.meeting_register ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Hora de registro
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} lg={8} xl={8}>
                                        <InputErrorMessage message={errors.meeting_register} inputFocus={onfocus}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TextField
                                                    disabled={fieldChecks["meeting_register"]}
                                                    onFocus={() => setOnfocus(true)}
                                                    onBlur={() => setOnfocus(false)}
                                                    id="meeting_register"
                                                    label=""
                                                    className="w-100 cursor-pointer"
                                                    size="small"
                                                    type="time"
                                                    value={form?.meeting_register ?? ""}
                                                    onChange={(e) => handleChange("meeting_register", e.target.value)}
                                                    defaultValue={form?.meeting_register}
                                                />
                                            </LocalizationProvider>
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} lg={4} xl={4} className="d-flex align-items-center">
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["meeting_init"]}
                                                onClick={() => handleFieldCheckChange("meeting_init")}
                                                defaultChecked={form?.meeting_init ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Hora de inicio
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} lg={8} xl={8}>
                                        <InputErrorMessage message={errors.meeting_init} inputFocus={onfocus}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TextField
                                                    disabled={fieldChecks["meeting_init"]}
                                                    onFocus={() => setOnfocus(true)}
                                                    onBlur={() => setOnfocus(false)}
                                                    id="meeting_init"
                                                    label=""
                                                    className="w-100 cursor-pointer"
                                                    size="small"
                                                    type="time"
                                                    value={form?.meeting_init ?? ""}
                                                    onChange={(e) => handleChange("meeting_init", e.target.value)}
                                                    defaultValue={form?.meeting_init}
                                                />
                                            </LocalizationProvider>
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["meeting_date"]}
                                                onClick={() => handleFieldCheckChange("meeting_date")}
                                                defaultChecked={form?.meeting_date ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Fecha del evento
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.meeting_date} inputFocus={onfocus}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    disabled={fieldChecks["meeting_date"]}
                                                    className="w-100"
                                                    label=" "
                                                    value={form?.meeting_date}
                                                    onChange={(date) => handleChange("meeting_date", date)}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </InputErrorMessage>
                                    </Col>

                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["phone"]}
                                                onClick={() => handleFieldCheckChange("phone")}
                                                defaultChecked={form?.phone ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Telefono
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.phone} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["phone"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="phone"
                                                value={form?.phone ?? ""}
                                                onChange={(e) => handleChange("phone", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["city"]}
                                                onClick={() => handleFieldCheckChange("city")}
                                                defaultChecked={form?.city ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">ciudad</Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.city} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["city"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="city"
                                                value={form?.city ?? ""}
                                                onChange={(e) => handleChange("city", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4}
                                        className="d-flex align-items-center"
                                    >
                                        <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                            <Form.Control
                                                type="checkbox"
                                                name="is_default"
                                                className={`p-0 custom-control-input ${fieldChecks ? 'checked' : ''}`}
                                                checked={fieldChecks["observations"]}
                                                onClick={() => handleFieldCheckChange("observations")}
                                                defaultChecked={form?.observations ? true : false}
                                            />
                                            <span className="custom-control-label"></span>
                                        </Form.Label>
                                        <Form.Label className="form-label text-capitalize">
                                            Observaciones
                                        </Form.Label>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8}
                                        className="d-flex align-items-center"
                                    >
                                        <InputErrorMessage message={errors.observations} inputFocus={onfocus}>
                                            <input
                                                disabled={fieldChecks["observations"]}
                                                onFocus={() => setOnfocus(true)}
                                                onBlur={() => setOnfocus(false)}
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                name="observations"
                                                value={form?.observations ?? ""}
                                                onChange={(e) => handleChange("observations", e.target.value)}
                                            />
                                        </InputErrorMessage>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <h4 className="text-center text-uppercase"> Servicios o equipos </h4>
                        {form && form.items && form.items.length > 0 ? (
                            form.items.map((item: any, index: any) => (
                                <div key={item.id} className="m-0 p-0 w-100">
                                    <InputErrorMessage message={itemErrors[`item-${item.id}`]} inputFocus={onfocus}>
                                        <Card
                                            className="mb-2 w-100"
                                            style={{
                                                border: index === onfocus ? "3px solid #ff671c" : "3px solid #ced4da",
                                            }}
                                            onClick={() => setOnfocus(index)}
                                        >
                                            <Row className="p-2">
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="d-flex align-items-center">
                                                    <Form.Label className="custom-control custom-checkbox cursor-pointer">
                                                        <Form.Control
                                                            type="checkbox"
                                                            name="is_default"
                                                            className={`p-0 custom-control-input ${fieldChecks[item.id] ? 'checked' : ''}`}
                                                            onClick={() => handleFieldCheckChange(item.id)}
                                                            defaultChecked={fieldChecks[item.id]}
                                                        />
                                                        <span className="custom-control-label"></span>
                                                    </Form.Label>
                                                    <FormGroup className="form-group d-flex align-items-center m-auto">
                                                        <input
                                                            disabled={fieldChecks[item.id]}
                                                            onFocus={() => setOnfocus(true)}
                                                            onBlur={() => setOnfocus(false)}
                                                            type="number"
                                                            className={`form-control text-center`}
                                                            value={item.value ?? ""}
                                                            onChange={(e) => handleChange(item.id, e.target.value)}
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8} className="d-flex align-items-center">
                                                    <Form.Label className="form-label">{item.name}</Form.Label>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </InputErrorMessage>
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No se contrataron servicios o equipos.</div>
                        )}
                    </Col>
                </Row>
                <Row className="d-flex justify-content-end my-4 me-2">
                    <Button
                        variant="primary"
                        disabled={handleValidateChecked()}
                        onClick={() => setShowModal(true)}
                    >
                        Continuar
                    </Button>
                </Row>
            </div >
        </>

    )
}

export default Verifications
