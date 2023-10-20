import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { TitleComponent } from "../../Global/TitleComponent";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useFetch, useFile } from "../../hooks";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { InputErrorMessage } from "../../Global";

const initialForm = {
  id: 0,
  meeting_time_register: null,
  meeting_time_init: null,
  meeting_date: null,
  message: "",
  file: "",
};

const initialErrors = {
  meeting_time_register: "",
  meeting_time_init: "",
  meeting_date: "",
  message: "",
};

const ModalSeguimientoVerificacion = ({
  state,
  showModal,
  onClose,
  onSubmit,
  selectedRowId,
}: any) => {
  const [form, setForm] = useState<any>(initialForm);
  const { handleAdd, fileInputRef, image, handleButtonClick, handleDelete } =
    useFile(setForm);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [hasErrors, setHasErrors] = useState(true);
  const [isOnFocus, setOnFocus] = useState(false);

  const { postData } = useFetch();

  const handleSubmit = async () => {
    const { id, ...rest } = form;

    let payload = {
      ...rest,
      quote_id: state.id,
      meeting_date: dayjs(rest?.meeting_date).format("YYYY-MM-DD"),
      meeting_time_register: dayjs(rest?.meeting_time_register, "HH:mm").format(
        "HH:mm:ss"
      ),
      meeting_time_init: dayjs(rest?.meeting_time_init, "HH:mm").format(
        "HH:mm:ss"
      ),
      quote_number: state?.quote_number,
      meeting_type: state?.meeting_type,
    };

    console.log("payload", payload);

    // Envía los datos del formulario al servidor o realiza otras acciones aquí
    await postData(payload, "sales/evidence/save");
    onClose();
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (name: any, value: any) => {
    console.log({ name, value });
    const validationErrors: any = { ...errors };

    if (name === "meeting_date") {
      // Validar el campo de fecha
      if (!dayjs(value).isValid()) {
        validationErrors.meeting_date = "La fecha es obligatoria";
      } else if (
        dayjs(value).isBefore(dayjs()) &&
        !dayjs(value).isSame(dayjs(), "day")
      ) {
        validationErrors.meeting_date =
          "La fecha no puede ser anterior a la actual";
      } else {
        delete validationErrors.meeting_date;
      }
      console.log("ISVALID:::", dayjs(value).isValid());
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }

    if (name === "meeting_time_register") {
      // Validar el campo de nombre (required)
      if (!value) {
        validationErrors.meeting_time_register =
          "La hora de registro es obligatoria";
      } else {
        delete validationErrors.meeting_time_register;
      }
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }

    if (name === "meeting_time_init") {
      // Validar el campo de nombre (required)
      if (!value) {
        validationErrors.meeting_time_init = "La hora de inicio es obligatoria";
      } else {
        delete validationErrors.meeting_time_init;
      }
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }

    if (name === "message") {
      // Validar el campo de message (required)
      if (!value) {
        validationErrors.message = "El mensaje es obligatorio";
      } else {
        delete validationErrors.message;
      }
      setForm((prev: any) => ({ ...prev, [name]: value }));
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

  const handleModalClose = async () => {
    onClose();
    setForm({
      id: 0,
      meeting_time_register: null,
      meeting_time_init: null,
      meeting_date: null,
      message: "",
      file: "",
    });
  };

  const resetChangeErrors = (item: any) => {
    setOnFocus(false);
    setHasErrors(true);
    const objErrors: any = {
      meeting_time_register: !item.meeting_time_register
        ? "El campo está vacío"
        : null,
      meeting_time_init: !item.meeting_time_init ? "El campo está vacío" : null,
      meeting_date: !item.meeting_date ? "El campo está vacío" : null,
      message: !item.message ? "El campo está vacío" : null,
    };
    console.log({ objErrors });
    // Elimina los campos que no tienen error (valor es null)
    Object.keys(objErrors).forEach((key) => {
      if (objErrors[key] == null) {
        delete objErrors[key];
      }
    });
    if (Object.keys(objErrors).length === 0) {
      setOnFocus(false);
      setHasErrors(false);
    }
    setErrors(objErrors);
  };

  useEffect(() => {
    resetChangeErrors(form);
  }, [showModal]);

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={showModal /* showModal */}
      onClose={handleModalClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent className="px-5">
        <Form.Group>
          <TitleComponent title="RESERVACION" subtitle="MODAL DATOS DE RESERVACIÓN" align="center" />
          <h5 className="text-center">
            {" "}
            Tipo de asamblea:{" "}
            <b className="text-primary text-uppercase">
              {" "}
              {state?.meeting_type} {/* {data} */}
            </b>{" "}
          </h5>
          <h5 className="text-center">
            {" "}
            Número de cotización:{" "}
            <b className="text-primary text-uppercase">
              {" "}
              {state?.quote_number} {/* {data} */}{" "}
            </b>{" "}
          </h5>
          <hr />
        </Form.Group>

        <Row className="mt-1 d-flex justify-content-center">
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Label className="form-label text-center text-capitalize">
              Fecha Asamblea* :
            </Form.Label>
            <InputErrorMessage message={errors.meeting_date} inputFocus={true}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
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
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Label className="form-label text-capitalize">
              Hora de registro* :
            </Form.Label>
            <InputErrorMessage
              message={errors.meeting_time_register}
              inputFocus={true}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  id="time"
                  label=" "
                  className="w-100 cursor-pointer"
                  size="small"
                  type="time"
                  value={form?.meeting_time_register}
                  required
                  onChange={(e) =>
                    handleChange("meeting_time_register", e.target.value)
                  }
                  defaultValue={form?.meeting_time_register}
                />
              </LocalizationProvider>
            </InputErrorMessage>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Label className="form-label text-capitalize">
              Hora de inicio* :
            </Form.Label>
            <InputErrorMessage
              message={errors.meeting_time_init}
              inputFocus={true}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  id="time"
                  label=" "
                  className="w-100 cursor-pointer"
                  size="small"
                  type="time"
                  value={form?.meeting_time_init}
                  onChange={(e) =>
                    handleChange("meeting_time_init", e.target.value)
                  }
                  defaultValue={form?.meeting_time_init}
                />
                {/*  <TimePicker
                className="w-100"
                label=" "
                value={form.meeting_time_init}
                onChange={(value) => handleChange("meeting_time_init", value)}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              </LocalizationProvider>
            </InputErrorMessage>
          </Col>
        </Row>
        <Row>
          <Form.Label>Observacion de reserva* :</Form.Label>
          <InputErrorMessage message={errors.message} inputFocus={true}>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </InputErrorMessage>
        </Row>
        <Row className="mt-1">
          {/*  */}
          {/* File Uploader and State */}
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className=" d-flex justify-content-center  "
          >
            {/* Image Upload */}
            <div className="d-flex flex-column align-items-center ">
              <Form.Label>
                Suba aquí el adjunto de la reservación (imagénes, documentos,
                etc...)
              </Form.Label>
              <div className="position-relative rounded-circle hover_opacity_btn">
                <img
                  src={
                    image ||
                    // form?.file ||
                    "https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-upload-4341320_120532.png"
                  }
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
                <div
                  onClick={handleButtonClick}
                  style={{
                    zIndex: 96,
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="50"
                    height="50"
                  >
                    <path
                      d="M21 9.5V12.5C21 14.9853 16.9706 17 12 17C7.02944 17 3 14.9853 3 12.5V9.5C3 11.9853 7.02944 14 12 14C16.9706 14 21 11.9853 21 9.5ZM3 14.5C3 16.9853 7.02944 19 12 19C16.9706 19 21 16.9853 21 14.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5V14.5ZM12 12C7.02944 12 3 9.98528 3 7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5C21 9.98528 16.9706 12 12 12Z"
                      fill="rgba(34, 34, 34, 0.644)"
                    ></path>
                  </svg>
                </div>
                <div
                  onClick={handleDelete}
                  style={{
                    position: "absolute",
                    zIndex: 99,
                    bottom: "0",
                    left: "90%",
                    cursor: "pointer",
                  }}
                >
                  <HighlightOffIcon fontSize="medium" color="action" />
                </div>
              </div>
            </div>
          </Col>
          {/*  */}
        </Row>
      </DialogContent>
      <DialogActions className="mt-3">
        <Button variant="dark" onClick={handleModalClose}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            //handleModalClose()
          }}
          disabled={hasErrors}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSeguimientoVerificacion;