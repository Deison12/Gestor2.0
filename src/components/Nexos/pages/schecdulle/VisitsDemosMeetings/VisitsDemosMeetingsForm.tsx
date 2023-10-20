import { useEffect, useState } from "react";
import { Form, FormGroup, Row, Col, Card, Button } from "react-bootstrap";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { BreadCrumb, InputErrorMessage, Loader, TitleComponent } from "../../../Global";
import { useErrors, useFetch } from "../../../hooks";
import { useLocation } from "react-router-dom";
import { ItemCotizacionByNit } from "../../../Interfaces/Pages/CotizacionFormulario.interface";
import { ListResults } from "../../../ui";
import validator from "validator";
import { Link } from "react-router-dom";
import ModalVisitsDemosMeetingsForm from "./ModalVisitsDemosMeetingsForm";

const initialForm = {
  id: 0,
  residential_id: null,
  demo_date: dayjs().format("L"),
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  schedule_type: "",
  description: "",
  client_type: "",
  meeting_type: "",
};

const VisitsDemosMeetingsForm = () => {
  const form_nit = localStorage.getItem("form_nit");
  const location: any = useLocation();
  const { state } = location;

  // Hooks
  const { getAllData, postData, putData } = useFetch();
  const { errors, setError, clearError } = useErrors();

  // State
  const [data, setData] = useState<any>([]);
  const [nameClient, setNameClient] = useState('');
  const [onfocus, setOnfocus] = useState(false);
  const [searchNit, setSearchNit] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listMenu, setListMenu] = useState<ItemCotizacionByNit[]>([]);
  const [showListMenu, setShowListMenu] = useState(false);
  const [hasChangeNit, setHasChangeNit] = useState(true);
  const [form, setForm] = useState<any>(initialForm);

  //modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Función para validar errores en el formulario
  const validateErrors = (nameData: any, valueData: any) => {
    const validationErrors: any = { ...errors };
    if (nameData === "demo_date") {
      if (validator.isEmpty(valueData)) {
        validationErrors.demo_date = "El campo fecha de demo es obligatorio";
      } else {
        delete validationErrors.demo_date;
      }
    }
    if (nameData === "contact_name") {
      if (validator.isEmpty(valueData)) {
        validationErrors.contact_name = "El campo de Encargado es obligatorio";
      } else if (!validator.isNumeric(valueData)) {
        validationErrors.price = ["El campo valor debe ser numérico"];
      } else {
        delete validationErrors.contact_name;
      }
    }
    if (nameData === "contact_phone") {
      if (validator.isEmpty(valueData)) {
        validationErrors.contact_phone = "El campo de Teléfono es obligatorio";
      } else if (!validator.isNumeric(valueData)) {
        validationErrors.contact_phone = "El campo teléfono de contacto debe ser numérico";
      } else {
        delete validationErrors.contact_phone;
      }
    }
    if (nameData === "contact_email") {
      if (validator.isEmpty(valueData)) {
        validationErrors.contact_email = "El campo de Correo es obligatorio";
      } else {
        delete validationErrors.contact_email;
      }
    }
    if (nameData === "schedule_type") {
      if (validator.isEmpty(valueData)) {
        validationErrors.schedule_type = "Debe seleccionar al menos un tipo de cotización";
      } else {
        delete validationErrors.schedule_type;
      }
    }
    if (nameData === "client_type") {
      if (validator.isEmpty(valueData)) {
        validationErrors.client_type = "El campo lugar de la reunion es obligatorio";
      } else {
        delete validationErrors.client_type;
      }
    }
    if (nameData === "description") {
      if (validator.isEmpty(valueData)) {
        validationErrors.description = "El campo descripción es obligatorio";
      } else {
        delete validationErrors.description;
      }
    }
    // Set the errors for each field separately
    setError("demo_date", validationErrors.demo_date);
    setError("contact_name", validationErrors.contact_name);
    setError("contact_phone", validationErrors.contact_phone);
    setError("contact_email", validationErrors.contact_email);
    setError("schedule_type", validationErrors.schedule_type);
    setError("description", validationErrors.description);
    setError("client_type", validationErrors.client_type);
  };

  // Obtener datos iniciales
  const getData = async () => {
    try {
      const res: any = await getAllData("api/residential/scheduling/type/list/active");
      setData(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Función para seleccionar un resultado de la búsqueda por NIT
  const selectedSearchResult = (item: ItemCotizacionByNit) => {
    setForm({
      id: 0,
      residential_id: item.id,
      contact_name: item.contact_person,
      contact_phone: item.phone,
      contact_email: item.email,
      schedule_type: "",
      description: "",
      client_type: "",
      meeting_type: "",
    });
    setNameClient(item.name);
    setShowListMenu(false);
    console.log(item)
  };

  // Obtener datos por NIT
  const getDataByNit = async () => {
    const params = { nit: searchNit };
    try {
      setShowListMenu(true);
      setIsLoading(true);
      const response = await getAllData("api/residential/list", params);
      if (response.length === 1 && (form_nit && form_nit?.length > 5) && hasChangeNit) {
        selectedSearchResult(response[0]);
      } else {
        const limitedSearchResults = response.slice(0, 15);
        setListMenu(limitedSearchResults);
      }
      setHasChangeNit(false);
      setIsLoading(false);
    } catch (error) {
      console.log("Error");
    }
  };

  // Handle para Crear y Editar 
  const handleSubmit = async (e: any) => {
    const { id, ...rest } = form;
    let payload;
    let demoDateFormatted;
    if (state.id) {
      // Format the demo_date using ISO 8601 format
      demoDateFormatted = dayjs(form.demo_date).format("YYYY-MM-DDTHH:mm:ssZ");
      payload = {
        id: state.id,
        residential_id: rest.residential_id,
        demo_date: demoDateFormatted,
        contact_name: rest.contact_name,
        contact_phone: rest.contact_phone,
        contact_email: rest.contact_email,
        schedule_type: rest.schedule_type,
        description: rest.description,
        client_type: rest.client_type,
        meeting_type: form.meeting_type === 'Llamada' ? 'No aplica' : form.meeting_type
      };

      await putData(payload, "residential/demoScheduling/edit", 'visitasdemosreuniones');
    } else {
      // Format the demo_date using ISO 8601 format
      demoDateFormatted = dayjs(form.demo_date).format("YYYY-MM-DDTHH:mm:ssZ");
      payload = {
        ...rest,
        id: 0,
        demo_date: demoDateFormatted,
        meeting_type: form.meeting_type === 'Llamada' ? 'No aplica' : form.meeting_type
      };
      await postData(payload, "residential/demoScheduling/create", false ,'visitasdemosreuniones');
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "contact_phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm((prevForm: any) => ({
        ...prevForm,
        [name]: numericValue,
      }));
    } else if (name === "schedule_type") {
      setForm((prevForm: any) => ({
        ...prevForm,
        [name]: value,
        meeting_type: value === 'visita' ? 'presencial' : prevForm.meeting_type,
      }));
    } else {
      setForm((prevForm: any) => ({
        ...prevForm,
        [name]: value,
      }));
    }
    clearError(name);
    validateErrors(name, value);
  };

  // Manejar cambio de fecha
  const handleDateChange = (date: any) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      demo_date: date || dayjs(),
    }));
  };

  // Manejar cambio en el campo de NIT
  const handlerNit = (e: any) => {
    setSearchNit(e.target.value);
  };

  // Efecto para obtener datos iniciales
  useEffect(() => {
    getData();
    if (state) {
      setForm({
        ...initialForm,
        ...state,
      });
    }
  }, [state]);

  // Efecto para obtener datos por NIT
  useEffect(() => {
    if (searchNit.length >= 5) {
      getDataByNit();
    } else {
      setListMenu([]);
    }
  }, [searchNit]);

  // Componente de error personalizado
  const CustomError = () => {
    return (
      <Card
        className="p-4"
        style={{
          position: "absolute",
          width: "100%",
          left: "0",
          top: "110%",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <Card.Text className="text-danger">No se encontraron clientes por ese NIT</Card.Text>
        <Button onClick={() => setShow(true)}>Agregar Nuevo</Button>
      </Card>
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "lista visitas, demos, reuniones", "form visitas, demos, reuniones"]}
        baseURL={["inicio", "nexos/visitasdemosreuniones", ""]}
      />
      {/* Component Title */}
      <TitleComponent title="PASO 1" subtitle={"VISITAS, DEMOS, REUNIONES"} align="center" />

      <ModalVisitsDemosMeetingsForm
        show={show}
        handleClose={handleClose}
        searchNit={searchNit}
      />
      {/*  Modulo de search */}
      <div className="mt-5 w-100">
        <Row className="justify-content-center">
          <Col sm={12} md={12} lg={12} xl={12}>
            <Card className="w-75 mx-auto">
              <Card.Body className="relative">
                <Form.Control
                  id="outlined-basic"
                  type="text"
                  placeholder="Buscar por Nit"
                  className="form-control p-3"
                  size="sm"
                  value={searchNit}
                  onChange={handlerNit}
                />
                {listMenu.length === 0 && searchNit.length >= 5 && isLoading && (
                  <Loader />
                )}
                {listMenu.length === 0 && searchNit.length >= 5 && !isLoading && showListMenu && (
                  <CustomError />
                )}
                {listMenu.length > 0 && searchNit.length >= 5 && showListMenu && (
                  <ListResults
                    listMenu={listMenu}
                    selectedSearchResult={selectedSearchResult}
                    showListMenu={showListMenu}
                    setShowListMenu={setShowListMenu}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Form */}

        <Card className="p-4">

          <Row className="">
            <Col sm={12} md={12} lg={6} xl={6}>
              <Form.Label className="form-label ">
                Tipo de agendamiento
              </Form.Label>
              <InputErrorMessage message={errors.schedule_type} inputFocus={onfocus}>
                <FormGroup className="control-group form-group m-0 d-flex w-100">
                  <div className="d-flex align-items-start flex-column w-100">
                    <Form.Select
                      name="schedule_type"
                      style={{ padding: 8, border: '0.5px solid gray' }}
                      aria-label="Default select example"
                      className={onfocus ? 'border-primary' : ''}
                      onChange={handleChange}
                      value={form?.schedule_type ?? ""}
                      onFocus={() => setOnfocus(true)}
                      onBlur={() => setOnfocus(false)}
                    >
                      {!form.schedule_type ? (
                        <option
                          value="">Seleccione el tipo de agendamiento</option>
                      ) : null}
                      {data && data.map((item: any) => (
                        <option
                          key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </FormGroup>
              </InputErrorMessage>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <FormGroup className="form-group m-0">
                <Form.Label className="form-label">
                  Nombre del cliente
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  disabled
                  className="form-control"
                  value={form?.residential_name ?? nameClient}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <FormGroup className="form-group m-0">
                <Form.Label className="form-label">
                  Encargado
                </Form.Label>
                <InputErrorMessage message={errors.contact_name} inputFocus={onfocus}>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder=""
                    name="contact_name"
                    value={form?.contact_name ?? ""}
                    required
                    onChange={handleChange}
                  />
                </InputErrorMessage>
              </FormGroup>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <FormGroup className="form-group m-0">
                <Form.Label className="form-label">
                  lugar de la reunion
                </Form.Label>
                <InputErrorMessage message={errors.client_type} inputFocus={onfocus}>
                  <Form.Control
                    type="text"
                    name="client_type"
                    value={form?.client_type ?? ""}
                    className="form-control"
                    onChange={handleChange}
                  />
                </InputErrorMessage>
              </FormGroup>
            </Col>
            {form.schedule_type != 'Llamada' ?
              < Col sm={12} md={12} lg={6} xl={6}>
                <FormGroup className="form-group m-0">
                  <Form.Label className="form-label">
                    Tipo de reunion
                  </Form.Label>
                  <InputErrorMessage message={errors.meeting_type} inputFocus={onfocus}>
                    <div className="d-flex align-items-start flex-column w-100">
                      <Form.Select
                        name="meeting_type"
                        style={{ padding: 8, border: '0.5px solid gray' }}
                        aria-label="Default select example"
                        className={onfocus ? 'border-primary' : ''}
                        onChange={handleChange}
                        value={form?.meeting_type ?? ""}
                        onFocus={() => setOnfocus(true)}
                        onBlur={() => setOnfocus(false)}
                      >
                        <option value="">Seleccione el tipo de reunion</option>
                        <option value={'presencial'}> Presencial </option>
                        <option value={'virtual'}> Virtual </option>
                      </Form.Select>
                    </div>
                  </InputErrorMessage>
                </FormGroup>
              </Col>
              : null}
            <Col sm={12} md={12} lg={6} xl={6}>
              <FormGroup className="form-group m-0">
                <Form.Label className="form-label">
                  Correo
                </Form.Label>
                <InputErrorMessage message={errors.contact_email} inputFocus={onfocus}>
                  <Form.Control
                    type="email"
                    className="form-control"
                    placeholder=""
                    name="contact_email"
                    value={form?.contact_email ?? ""}
                    required
                    onChange={handleChange}
                  />
                </InputErrorMessage>
              </FormGroup>

            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <FormGroup className="form-group m-0">
                <Form.Label className="form-label">
                  Telefono
                </Form.Label>
                <InputErrorMessage message={errors.contact_phone} inputFocus={onfocus}>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={form?.contact_phone ?? ""}
                    name="contact_phone"
                    required
                    onChange={handleChange}
                  />
                </InputErrorMessage>
              </FormGroup>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <Form.Label className="form-label">
                Fecha de demostración
              </Form.Label>
              <InputErrorMessage message={errors.demo_date} inputFocus={onfocus}>
                <LocalizationProvider style={{ height: 10, width: '100%' }} dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="w-100 text-primary"
                    label=" "
                    inputFormat="DD/MM/YYYY"
                    value={form?.demo_date ?? dayjs().format('L')}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </InputErrorMessage>
            </Col>
          </Row>
          <Form.Label className="w-100 form-label text-center text-uppercase">
            Objetivo de la reunion, demo, vista, llamada
          </Form.Label>
          <InputErrorMessage message={errors.description} inputFocus={onfocus}>
            <Card className="w-100 text-center">
              <FormGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form?.description ?? ""}
                  onChange={handleChange}
                />
              </FormGroup>
            </Card>
          </InputErrorMessage>
        </Card >
        <Row className="p-3 d-flex justify-content-end mb-3">
          <Link
            to={`${process.env.PUBLIC_URL}/nexos/visitasdemosreuniones`}
          >
            <Button>Volver</Button>
          </Link>
          <Button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Continuar
          </Button>
        </Row>
      </div >
    </>
  )
};

export default VisitsDemosMeetingsForm;