import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  FormGroup,
  Form,
} from "react-bootstrap";
import { Icon, IconButton, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
//import ModalFormulario from './ModalFormulario/ModalFormulario';
import { modalGlobal } from "../../Funciones/Funciones";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CButton,
} from "@coreui/react";

// Importaciones para el campo fecha
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import DatePicker from 'react-bootstrap-date-picker';

import validator from "validator";


// icons
import { useAddInputs, useTokenQuoteCheck } from "../../hooks";
import { useFetch } from "../../hooks/useFetch";
import { ItemCotizacionByNit } from "../../Interfaces/Pages/CotizacionFormulario.interface";
import { ListResults } from "../../ui";
import { ItemCreateCotizacion } from "../../Interfaces/Pages/Item.interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { City } from "../../Interfaces/utils.interface";
import { isValidEmail, isValidNit, removeAll } from "../../../../helpers";

import { TitleComponent, BreadCrumb, Loader, InputErrorMessage, ConfirmationCardButton } from "../../Global";

const initialState: ItemCotizacionByNit | ItemCreateCotizacion = {
  id: 0,
  city_id: null,
  description: "",
  email: "",
  name: "",
  nit: "",
  phone: "",
  contact_phone: "",
  status_id: 0,
  address: "",
  city_name: "",
  email2: null,
  email3: null,
  phone2: null,
  phone3: null,
  // only create
  units_total: "0",
  units_budget: "0",
  created_at: "",
  contact_person: "",
  quote_id: 0,
  quote_type_id: 0,
};

const initialErrors = {
  name: "",
  email: "",
  contact_phone: "",
  phone: "",
  nit: "",
  city_id: "",
  address: "",
  contact_person: "",
  units_total: "",
  units_budget: ""
};


const CotizacionFormulario = () => {
  const form_nit = localStorage.getItem("form_nit");
  const storageQuoteId = localStorage.getItem("form1-ID");
  const [date, setDate] = useState<Dayjs | null | any>(dayjs(" "));
  const { handlerRedirect } = useTokenQuoteCheck();
  const { getAllData, postData, getAllDataStringify, error } = useFetch();
  const [searchNit, setSearchNit] = useState("");
  const [validatedCustom, setValidatedCustom] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isSearchNitChange, setIsSearchNitChange] = useState(false);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [hasErrors, setHasErrors] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [listMenu, setListMenu] = useState<ItemCotizacionByNit[]>([]);
  const [showListMenu, setShowListMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location: any = useLocation();
  const [hasChangeNit, setHasChangeNit] = useState(true);

  //datos del formulario
  const [data, setData] = useState<ItemCotizacionByNit | ItemCreateCotizacion | any>(initialState);
  const {
    /* id, */
    nit,
    name,
    /* description, */
    address,
    /* city_id, */
    /* city_name, */
    contact_phone,
    phone,
    phone2,
    phone3,
    /* status_id, */
    email,
    email2,
    email3,
    // only create
    units_total,
    units_budget,
    /* meeting_date, */
    contact_person,
    /* quote_id, */
    /* quote_type_id
 */  } = data;
  const form_client_id = localStorage.getItem('form_client_id');
  const form_client_id_post = form_client_id ? parseInt(form_client_id, 10) : 0;

  const [selectedCity, setSelectedCity] = useState(0);
  // handle States
  // Se envía el setData al hook que maneja los múltiples inputs. Esto para que cuando cambien dentro del hook, poder setear la data desde él. A fin de que exista un flujo de datos bidireccional, si cambia dentro del hook, cambia en el componente instantaneamente
  const {
    handleAddInput: handleAddInputEmail,
    handleRemoveInput: handleRemoveInputEmail,
    handleChangeInput: handleInputChangeEmail,
    changeIsDisabled: changeIsDisabledEmail,
    handleResetInputs: handleResetInputsEmail,
    mapInputArray: mapInputArrayEmail,
    setInputs: setInputsEmail,
    inputs: inputsEmail,
  } = useAddInputs(errors, setData, setErrors, setHasErrors);
  const {
    handleAddInput: handleAddInputPhone,
    handleRemoveInput: handleRemoveInputPhone,
    handleChangeInput: handleInputChangePhone,
    changeIsDisabled: changeIsDisabledPhone,
    handleResetInputs: handleResetInputsPhone,
    mapInputArray: mapInputArrayPhone,
    setInputs: setInputsPhone,
    inputs: inputsPhone,
  } = useAddInputs(errors, setData, setErrors, setHasErrors);

  //functions
  const BtnAddInput = ({ handleAddInputType, isDisabled }: { handleAddInputType: any, isDisabled: any }) => {
    return (
      <IconButton
        style={{ fontSize: '24px' }} // Aquí puedes cambiar el tamaño de fuente según sea necesario
        className={`text-primary ms-2 ${isDisabled ? 'disabled text-muted' : ''}`}
        // El evento onMouseDown se asemeja al onClick. Se túvo que colocar debido a que cada input tiene un evento onBlur, y si el usuario ingresa a un input y quiere darle al boton para agregar otro, con el onClick le tocaba dar dos Clicks al boton de agregar, esto debido a que primero según el orden de eventos el evento onBlur se ejecuta antes que el evento onClick, y por esto se tenian que hacer dos clicks para agregar otro input, uno para que se ejecute el onBlur ya que se salía del input al momento de darle al boton, y el otro para ejecutar el onClick una vez estando fuera del focus del input
        onMouseDown={isDisabled ? null : handleAddInputType}
      >
        <Icon>add_circle</Icon>
      </IconButton>
    );
  };

  const BtnSubsInput = ({
    name,
    index,
    handleSubsInputType,
  }: {
    name: string;
    index: number;
    handleSubsInputType: any;
  }) => {
    return (
      <IconButton
        style={{ fontSize: '24px' }} // Aquí puedes cambiar el tamaño de fuente según sea necesario
        className={`text-primary ms-2`}
        onMouseDown={() => { handleSubsInputType(name); }}
      >
        <Icon>remove_circle</Icon>
      </IconButton>
    );
  };

  const handlerNit = (e: any) => {
    setSearchNit(e.target.value);
  };

  const handlerSelect = (e: any) => {
    setSelectedCity(e.target.value);
    e.target.value = e.target.value.toString();
    handleChange(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePhonesValidation = (e: any, validationErrors: any, index: number) => {
    // Limpiar caracteres no numéricos
    e.target.value = e.target.value.replace(/[^\d]/g, "");
    // Limitar a 10 dígitos
    e.target.value = e.target.value.slice(0, 10);

    if (e.target.length > 10 || e.target.value === "" || validator.isEmpty(e.target.value) || e.target.length === 0) {
      validationErrors[e.target.name] = "Número telefonico no válido";
      handleInputChangePhone(index, e.target.value);
      changeIsDisabledPhone(index, true);
    } else {
      changeIsDisabledPhone(index, false);
      delete validationErrors[e.target.name];
    }

    /*
    SI LOS CAMPOS POSTERIORES ESTÁN VACIOS. SE HABILITA EL BOTON DE AGREGAR MAS INPUTS
    if (e.target.name !== "phone" && e.target.value === "") {
      changeIsDisabledPhone(index, false);
      delete validationErrors[e.target.name];
    }
    */

    handleInputChangePhone(index, e.target.value);
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleEmailsValidation = (e: any, validationErrors: any, index: number) => {
    // Validación si el email está vacío
    if (!isValidEmail(e.target.value) || validator.isEmpty(e.target.value) || e.target.value === "") {
      // Cambia el atributo isDisabled del input a true. Para deshabilitarlo y que no se pueda clickear ni agregar otro input 
      changeIsDisabledEmail(index, true);
      // Agrega el error al objeto
      validationErrors[e.target.name] = "Correo Invalido o vacio";
    } else {
      // Cambia el atributo isDisabled del input a false. Para habilitarlo y que ya se pueda clickear para agregar otro input 
      changeIsDisabledEmail(index, false);
      // Elimina el atributo y el error del objeto
      delete validationErrors[e.target.name];
    }
    // Cambia los valores del input dentro del estado del custom hook
    handleInputChangeEmail(index, e.target.value);
    // Cambia los valores del input dentro del estado del componente (data que envía el formulario)
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  const handleChange = (e: any | SelectChangeEvent<number>, index: number = 0) => {
    const validationErrors: any = { ...errors };

    if (e.target.name === "name" && isPasswordTouched) {
      // Validar el campo de nombre (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.name = "El nombre de la entidad es obligatoria";
      } else {
        delete validationErrors.name;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "address" && isPasswordTouched) {
      // Validar el campo de address (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.address = "La dirección de la entidad es obligatoria";
      } else {
        delete validationErrors.address;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "contact_person" && isPasswordTouched) {
      // Validar el campo de address (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.contact_person = "La persona dirigida de la entidad es obligatoria";
      } else {
        delete validationErrors.contact_person;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "units_total" && isPasswordTouched) {
      // Enteros no negativos
      e.target.value = e.target.value.replace(/^0+|[^0-9]/g, "");
      // Validar el campo de nombre (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.units_total = "La cantidad total de únidades es obligatoria";
      } else {
        delete validationErrors.units_budget;
        delete validationErrors.units_total;
      }

      if (e.type === "change") {
        setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value, "units_budget": e.target.value }));
      } else {
        setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    }
    if (e.target.name === "units_budget" && isPasswordTouched) {
      // Enteros no negativos
      e.target.value = e.target.value.replace(/^0+|[^0-9]/g, "");
      // Validar el campo de nombre (required)
      if (validator.isEmpty(e.target.value)) {
        validationErrors.units_budget = "La cantidad de únidades cotizadas es obligatoria";
      } else if (Number(e.target.value) > Number(units_total)) {
        validationErrors.units_budget = "La cantidad de únidades cotizadas no puede ser mayor a la cantidad de únidades totales";
      } else {
        delete validationErrors.units_budget;
        delete validationErrors.units_total;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "nit" && isPasswordTouched) {
      // Validar el campo de nit (required)      
      if (validator.isEmpty(e.target.value)) {
        validationErrors.nit = "El nit de la entidad es obligatoria";
      } else if (!isValidNit(e.target.value)) {
        validationErrors.nit = 'El nit debe tener un formáto válido ("123456-2")';
      } else {
        delete validationErrors.nit;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === "city_id" && isPasswordTouched) {
      // Validar el campo de city_id (required)      
      if (validator.isEmpty(e.target.value) || Number(e.target.value) === 0) {
        validationErrors.city_id = "Elija una ciudad";
      } else {
        delete validationErrors.city_id;
      }

      setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if ((e.target.name === "email" || e.target.name === "email2" || e.target.name === "email3") && isPasswordTouched) {
      handleEmailsValidation(e, validationErrors, index);
    }
    if ((e.target.name === "phone" || e.target.name === "phone2" || e.target.name === "phone3") && isPasswordTouched) {
      handlePhonesValidation(e, validationErrors, index);
    }

    if (e.target.name === "contact_phone" && isPasswordTouched) {
      const value = e.target.value;
      const isNumeric = /^\d+$/.test(value);

      // Validar el campo de contact_phone (required)      
      if (validator.isEmpty(value)) {
        validationErrors.contact_phone = "El telefono encargado es obligatorio";
      } else if (!isNumeric) {
        validationErrors.contact_phone = "El telefono debe contener solo números";
      } else {
        delete validationErrors.contact_phone;
      }
      setData((prev: any) => ({ ...prev, [e.target.name]: value }));
    }
    if (e.target.name === "status_id") {
      setData((prev: any) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    }

    // Si hay errores, actualiza el estado con ellos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setHasErrors(true);
    } else {
      setErrors({});
      setHasErrors(false);
    }
  };
  const handleSubmit = async (event: any) => {
    setValidatedCustom(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (
        date?.format("L LT") === "Invalid Date" ||
        date?.format("L LT") === undefined
      ) {
        let message = "No se ha seleccionado fecha para la asamblea";
        let icon = "error";
        let title = "Falta Fecha";
        return modalGlobal(title, message, icon);
      } else {
        const dataEmails = {
          email: inputsEmail[0]?.value ?? "",
          email2: inputsEmail[1]?.value ?? "",
          email3: inputsEmail[2]?.value ?? "",
        };
        const dataPhones = {
          phone: inputsPhone[0]?.value ?? "",
          phone2: inputsPhone[1]?.value ?? "",
          phone3: inputsPhone[2]?.value ?? "",
        };
        //Se setea la fecha para la asamblea
        const { quote_type_id, city_name, description, status_id, email, email2, email3, phone, phone2, phone3, id, ...rest } = data;
        const newId = form_client_id_post ? form_client_id_post : id ? id : 0;
        const formData = {
          ...rest,
          id: Number(newId),
          quote_type_id: storageQuoteId,
          ...dataEmails,
          ...dataPhones,
          meeting_date: date?.format("L")
        };

        let result = await postData(formData, "quote/create");
        console.log('result', result)
        if (result && result.id) {
          const id = result.id;
          const nit = result.nit;
          localStorage.setItem("form_quote_id", id);
          localStorage.setItem("form_nit", nit);
          navigate(`${process.env.PUBLIC_URL}/nexos/formatobasico`);
        }

        //setData(initialState);
        //handleResetInputsEmail();
        //handleResetInputsPhone();
        //setErrors(initialErrors);
        //setHasErrors(false);
        // navigate(`${process.env.PUBLIC_URL}/nexos/formatobasico`);
        return;
      }
    }
  };
  // Función para seleccionar un resultado de la busqueda por NIT
  const selectedSearchResult = (item: ItemCotizacionByNit) => {
    const { created_at, ...rest } =
      item;

    // console.log("SE ESTA EJECUTANDO selectedSearchResult:", { item });    

    const cityIsAvailable = cities?.some((city: City) => city.id === item.city_id);
    if (cityIsAvailable) {
      setSelectedCity(item.city_id!);
    }
    //setDate(dayjs(created_at));
    setData({
      ...rest,
      //  meeting_date: dayjs(created_at)
    });

    addDataUseInputs(item);
    resetChangeErrors(item);
    setShowListMenu(false);
  };

  const resetChangeErrors = (item: any) => {
    setIsPasswordTouched(false);
    setHasErrors(true);
    const objErrors: any = {
      name: (!item.name) ? "El campo está vacío" : null,
      email: (!item.email) ? "El campo está vacío" : null,
      phone: (!item.phone) ? "El campo está vacío" : null,
      nit: (!item.nit) ? "El campo está vacío" : null,
      city_id: (!item.city_id) ? "El campo está vacío" : null,
      address: (!item.address) ? "El campo está vacío" : null,
      //units_total: (!item.units_total) ? "El campo está vacío" : null,
      //units_budget: (!item.units_budget) ? "El campo está vacío" : null,
      contact_person: (!item.contact_person) ? "El campo está vacío" : null,
      contact_phone: (!item.contact_phone) ? "El campo está vacío" : null,
    }
    // Elimina los campos que no tienen error (valor es null)
    Object.keys(objErrors).forEach(key => {
      if (objErrors[key] == null) {
        delete objErrors[key];
      }
    });
    if (Object.keys(objErrors).length === 0) {
      setIsPasswordTouched(false);
      setHasErrors(false);
    }
    setErrors(objErrors);
  }

  const addDataUseInputs = (item: any) => {
    console.log({ item })
    const itemsEmailValues = [];
    const itemsEmails = [];
    const itemsPhoneValues = [];
    const itemsPhones = []

    // Emails Values Set Inputs
    if (item[`email`] != "" && item[`email`] != null && item[`email`] != false) {
      itemsEmailValues.push(item.email1);
    }

    if (item[`email2`] != "" && item[`email2`] != null && item[`email2`] != false) {
      itemsEmailValues.push(item.email2)
    }
    if (item[`email3`] != "" && item[`email3`] != null && item[`email3`] != false) {
      itemsEmailValues.push(item.email3)
    }

    // Phone Values Set Inputs
    if (item[`phone`] != "" && item[`phone`] != null && item[`phone`] != false) {
      itemsPhoneValues.push(item.phone)

    }
    if (item[`phone2`] != "" && item[`phone2`] != null && item[`phone2`] != false) {
      itemsPhoneValues.push(item.phone2)

    }
    if (item[`phone3`] != "" && item[`phone3`] != null && item[`phone3`] != false) {
      itemsPhoneValues.push(item.phone3)
    }


    // Emails Set Inputs
    if (itemsEmailValues.length === 1) {
      itemsEmails.push({
        value: item.email,
        showRemove: false,
        isDisabled: false
      })
    }

    if (itemsEmailValues.length === 2) {
      itemsEmails.push({
        value: item.email,
        showRemove: true,
        isDisabled: false
      }, {
        value: item.email2,
        showRemove: false,
        isDisabled: false
      })
    }

    if (itemsEmailValues.length === 3) {
      itemsEmails.push({
        value: item.email,
        showRemove: true,
        isDisabled: false
      },
        {
          value: item.email2,
          showRemove: true,
          isDisabled: false
        },
        {
          value: item.email3,
          showRemove: true,
          isDisabled: false
        })
    }

    // Phones Set Inputs
    if (itemsPhoneValues.length === 1) {
      itemsPhones.push({
        value: item.phone,
        showRemove: false,
        isDisabled: false
      })
    }

    if (itemsPhoneValues.length === 2) {
      itemsPhones.push({
        value: item.phone,
        showRemove: true,
        isDisabled: false
      }, {
        value: item.phone2,
        showRemove: false,
        isDisabled: false
      })
    }

    if (itemsPhoneValues.length === 3) {
      itemsPhones.push({
        value: item.phone,
        showRemove: true,
        isDisabled: false
      },
        {
          value: item.phone2,
          showRemove: true,
          isDisabled: false
        },
        {
          value: item.phone3,
          showRemove: true,
          isDisabled: false
        })
    }

    setInputsEmail(itemsEmails);
    setInputsPhone(itemsPhones);
  }


  // Obtiene la lista de opciones de cotizaciones de acuerdo al nit que se ingrese en el buscador
  const getData = async () => {
    const params = { nit: searchNit };
    try {
      setShowListMenu(true);
      setIsLoading(true);
      const response = await getAllData("api/residential/list", params);

      // console.log({response}, {form: form_nit}, { searchNit}, { location: location.state });
      if (response.length === 1 && (form_nit && form_nit?.length > 5) && hasChangeNit && !isSearchNitChange) {
        // En caso de haber nit en local storage. Enviar directamente la informacion al formulario
        selectedSearchResult(response[0]);
        // console.log("ENTRA EN PRIMERA:::", {response});
      } else {
        // En caso de hacer una busqueda normal
        const limitedSearchResults = response.slice(0, 15);
        setListMenu(limitedSearchResults);
      }
      setHasChangeNit(false);
      setIsLoading(false);
    }
    catch (error) {
      console.log("Error");
    }
  }

  // Obtiene la lista de ciudades y establece a la primera ciudad de la lista como el item seleccionado dentro del select de ciudades 
  const getCities = async () => {
    const response: City[] = await getAllData("api/cities/list");
    setCities(response);
  }

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (searchNit.length >= 5 && cities.length > 0) {
      getData();
    } else {
      setListMenu([]);
    }
  }, [searchNit, cities]);

  useEffect(() => {

    if (location?.state && location?.state.name && !isSearchNitChange) {
      const { status, status_id, meeting_date, ...rest } = location?.state;
      // console.log({ meeting_date })
      // console.log({ rest })

      setSelectedCity(rest.city_id!);
      setDate(dayjs(meeting_date));
      setData({
        ...rest,
        meeting_date: dayjs(meeting_date)
      });
      addDataUseInputs(location?.state);
      resetChangeErrors(rest);
      setShowListMenu(false);
      setIsLoading(false);
      setIsSearchNitChange(true);
    }

  }, [location]);

  // Tercer useEffect para manejar cambios en 'form_nit' y 'hasChangeNit'
  useEffect(() => {
    if (form_nit && form_nit.length > 5 && hasChangeNit) {
      setSearchNit(form_nit);
    }
  }, [form_nit, hasChangeNit]);


  const removeLocalStorage = () => {
    //removeAll()
    localStorage.removeItem('form1-ID');
  }

  useEffect(() => {
    handlerRedirect(storageQuoteId);
  }, [storageQuoteId]);

  // Componente de error en caso de no encontrarse clientes por el nit ingresado en el búscador
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
        <Card.Text>No se encontraron clientes por ese NIT</Card.Text>
      </Card>
    );
  };
  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "CONFIRMACIONES", "ventas", "cotizaciones"]}
        baseURL={[
          "inicio",
          "nexos/ventasconfirmaciones",
          "nexos/vistalistadocotizaciones",
          "cotizaciones",
        ]}
      />
      {/* Componente Titulo  */}
      <TitleComponent
        title="PASO 2"
        subtitle="DATOS PARA SU COTIZACIÓN"
        align="center"
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
                  onMouseDown={() => setIsSearchNitChange(true)}
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

        {/* <!--Formulario--> */}
        <TitleComponent subtitle="FORMULARIO COTIZACIÓN" align="center" />
        <div className="">
          <Col lg={12} md={12}>
            <Card>
              <Card.Body>
                <CForm
                  className="needs-validation"
                  noValidate
                  validated={validatedCustom}
                  onSubmit={handleSubmit}
                >
                  {/* name, send to */}
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <CFormLabel htmlFor="validationCustom01">
                        Nombre de la entidad*
                      </CFormLabel>
                      <InputErrorMessage message={errors.name} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="text"
                          id="validationCustom01"
                          name="name"
                          value={name ? name : ""}
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>Porfavor indica una direccion valida.</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <CFormLabel htmlFor="validationCustom03">
                        NIT*
                      </CFormLabel>
                      <InputErrorMessage message={errors.nit} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="text"
                          id="validationCustom03"
                          name="nit"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          value={nit ? nit : ""}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>¿a quien va dirigido?</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <CFormLabel htmlFor="validationCustom03">
                        Dirigir a*
                      </CFormLabel>
                      <InputErrorMessage message={errors.contact_person} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="text"
                          id="validationCustom03"
                          name="contact_person"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          value={contact_person ? contact_person : ""}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>¿a quien va dirigido?</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <CFormLabel htmlFor="contact_phone">
                        Telefono de Contacto
                      </CFormLabel>
                      <InputErrorMessage message={errors.contact_phone} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="text"
                          id="validationCustom03"
                          name="contact_phone"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          value={contact_phone ? contact_phone : ""}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>¿a quien va dirigido?</CFormFeedback> */}

                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                      <CFormLabel htmlFor="validationCustom03">
                        Direccion*
                      </CFormLabel>
                      <InputErrorMessage message={errors.address} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="text"
                          id="validationCustom03"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          required
                          value={address ? address : ""}
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>Porfavor indica una direccion valida.</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                      <CFormLabel htmlFor="validationCustom03">
                        Ciudad*
                      </CFormLabel>
                      {
                        cities.length > 0 && (
                          <InputErrorMessage message={errors.city_id} inputFocus={isPasswordTouched}>
                            <Form.Select
                              name="city_id"
                              aria-label="Default select example"
                              className="selectproduct w-100"
                              value={selectedCity}
                              onFocus={() => setIsPasswordTouched(true)}
                              onBlur={() => setIsPasswordTouched(false)}
                              onChange={handlerSelect}
                              style={{ border: 'solid 0.5px gray', padding: 8 }}
                            >
                              <option value={0}>Seleccionar ciudad</option>
                              {
                                cities.map((city: any) => (
                                  <option key={city.id} value={city.id}>{city.name}</option>
                                ))
                              }
                            </Form.Select>
                          </InputErrorMessage>
                        )
                      }
                      {/* <CFormFeedback invalid>Seleciona una ciudad</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                      <CFormLabel htmlFor="validationCustom03">
                        Unidades*
                      </CFormLabel>
                      <InputErrorMessage message={errors.units_total} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="number"
                          id="validationCustom03"
                          name="units_total"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          value={units_total}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>Porfavor provee una Unidad</CFormFeedback> */}
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                      <CFormLabel htmlFor="validationCustom03">
                        Unidades Cotizadas
                      </CFormLabel>
                      <InputErrorMessage message={errors.units_budget} inputFocus={isPasswordTouched}>
                        <CFormInput
                          type="number"
                          id="validationCustom03"
                          name="units_budget"
                          onChange={handleChange}
                          onBlur={handleChange}
                          onFocus={() => setIsPasswordTouched(true)}
                          value={units_budget}
                          required
                        />
                      </InputErrorMessage>
                      {/* <CFormFeedback invalid>Porfavor provee una Unidad</CFormFeedback> */}
                    </Col>
                  </Row>

                  {/* email, phone */}
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      {inputsEmail?.map((inputValue, index) => (
                        <React.Fragment key={index}>
                          <CCol style={{ paddingLeft: 0 }}>
                            <div id="multiCollapseExample1">
                              <FormGroup className="form-group">
                                <CFormLabel htmlFor="validationCustom03">
                                  {index === 0
                                    ? "Correo*"
                                    : `Correo-${index + 1}`}
                                </CFormLabel>
                                <div className="d-flex">
                                  <InputErrorMessage message={index === 0 ? errors[`email`] : errors[`email${index + 1}`]} inputFocus={isPasswordTouched}>
                                    <Form.Control
                                      name={index === 0 ? "email" : `email${index + 1}`}
                                      onFocus={() => setIsPasswordTouched(true)}
                                      onBlur={(e) => { handleChange(e, index); }}
                                      onChange={(e) => {
                                        handleChange(e, index);
                                      }}

                                      value={((index === 0) ? email : (index === 1) ? email2 : email3) || inputValue.value}
                                      type="email"
                                    />
                                  </InputErrorMessage>
                                  {inputValue.showRemove ? (
                                    <BtnSubsInput
                                      name={"email"}
                                      index={index}
                                      handleSubsInputType={
                                        handleRemoveInputEmail
                                      }
                                    />
                                  ) : (
                                    <BtnAddInput
                                      handleAddInputType={handleAddInputEmail}
                                      isDisabled={inputValue.isDisabled}
                                    />
                                  )}
                                </div>
                              </FormGroup>
                            </div>
                          </CCol>
                        </React.Fragment>
                      ))}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      {inputsPhone?.map((inputValue, index) => (
                        <React.Fragment key={index}>
                          <CCol style={{ paddingLeft: 0 }}>
                            <div id="multiCollapseExample1">
                              <FormGroup className="form-group">
                                <CFormLabel htmlFor="validationCustom03">
                                  {index === 0
                                    ? "Telefono*"
                                    : `Telefono-${index + 1}`}
                                </CFormLabel>
                                <div className="d-flex">
                                  <InputErrorMessage message={index === 0 ? errors[`phone`] : errors[`phone${index + 1}`]} inputFocus={isPasswordTouched}>
                                    <Form.Control
                                      name={index === 0 ? "phone" : `phone${index + 1}`}
                                      onFocus={() => setIsPasswordTouched(true)}
                                      // onBlur={handleChange}
                                      onBlur={(e) => {
                                        handleChange(e, index);
                                      }}
                                      onChange={(e) => {
                                        handleChange(e, index);
                                      }}
                                      value={((index === 0) ? phone : (index === 1) ? phone2 : phone3) || inputValue.value}
                                      type="text"
                                    />
                                  </InputErrorMessage>
                                  {inputValue.showRemove ? (
                                    <BtnSubsInput
                                      name={"phone"}
                                      index={index}
                                      handleSubsInputType={
                                        handleRemoveInputPhone
                                      }
                                    />
                                  ) : (
                                    <BtnAddInput
                                      handleAddInputType={handleAddInputPhone}
                                      isDisabled={inputValue.isDisabled}
                                    />
                                  )}
                                </div>
                              </FormGroup>
                            </div>
                          </CCol>
                        </React.Fragment>
                      ))}
                    </Col>
                  </Row>

                  <CCol md={4} className="d-flex align-items-end w-100">
                     <LocalizationProvider dateAdapter={AdapterDayjs}>

                      <DatePicker
                        disablePast
                        label="Fecha de la asamblea"
                        openTo="day"
                        views={["day", "month", "year"]}
                        value={date || dayjs()}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </CCol>
                  <CCol className=" d-flex justify-content-end mt-5">
                    <CCol className=" d-flex justify-content-end ">
                      <Link to={`${process.env.PUBLIC_URL}/nexos/cotizar`}>
                        <CButton
                          color="primary"
                          onClick={() => removeLocalStorage()}
                        >
                          Volver
                        </CButton>
                      </Link>
                    </CCol>
                    {/* <Link to={`${process.env.PUBLIC_URL}/nexos/serviciosacotizar`}> */}
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={
                        /*
                        isEmpty(data.ciudad) ||
                        isEmpty(inputsPhone[0].value) ||
                        isEmpty(inputsEmail[0].value) ||
                        isEmpty(data.direccion) ||
                        isEmpty(data.unidad) ||
                        isEmpty(data.dirigir) ||
                        isEmpty(data.entidad) ||
                        date?.format("L LT") === "Invalid Date" ||
                        date?.format("L LT") === undefined
                        */
                        hasErrors
                      }
                    >
                      Continuar
                    </CButton>
                    {/* </Link> */}
                  </CCol>
                </CForm>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default CotizacionFormulario;