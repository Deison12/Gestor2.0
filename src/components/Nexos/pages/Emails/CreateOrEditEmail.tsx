import React from "react";
import { Card, Col, Row, Button, Form, FormGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAlert, useFetch } from "../../hooks";
import { TitleComponent, BreadCrumb, InputErrorMessage } from "../../Global";
import validator from "validator";
import { CFormInput } from "@coreui/react";
import { Icon, IconButton, Typography } from "@mui/material";

import { Modal, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";

const InitValues = {
  id: 0,
  name: "",
  status_id: 1,
  status_files: 1,
  files: [],
  deleted: []
};

const initialErrors = {
  subject: "",
  message: "",
  service_id: "",
  name_email: "",
};

const CreateOrEditEmail = () => {
  const location: any = useLocation();
  const { state: editItemData } = location;
  const [form, setForm] = useState<any>(InitValues);
  const { getAllData, postData } = useFetch();
  const [activeAreas, setActiveAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(0);
  const { handleEditConfirmation, handleErrorAlert } = useAlert();
  const [inputFocus, setInputFocus] = useState(false);
  const [errors, setErrors] = useState<any>(initialErrors);
  const [hasErrors, setHasErrors] = useState(true);

  const getBase64 = (file: RcFile): any => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <Icon style={{ fontSize: "70px" }}>add_circle</Icon>
      <div style={{ marginTop: 8 }}>Subir Archivo</div>
    </div>
  );

  const handleChange = (e: any) => {
    const validationErrors: any = { ...errors };
    let { name, value, type } = e.target;

    let newValue = type === "radio" ? parseInt(value) : value;

    if (name === "name_email" && inputFocus) {
      value = value.trim();
      if (value === "" || validator.isEmpty(value)) {
        validationErrors.name_email = "El campo nombre es obligatorio";
      } else {
        delete validationErrors.name_email;
      }
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (name === "subject" && inputFocus) {
      value = value.trim();
      if (value === "" || validator.isEmpty(value)) {
        validationErrors.subject = "El campo asunto es obligatorio";
      } else {
        delete validationErrors.subject;
      }
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (name === "status_files") {
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (name === "service_id") {
      if (value === "0" || validator.isEmpty(value)) {
        validationErrors.service_id = "El campo área es obligatorio";
      } else {
        delete validationErrors.service_id;
      }
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (name === "message" && inputFocus) {
      value = value.trim();
      if (value === "" || validator.isEmpty(value)) {
        validationErrors.message = "El campo mensaje es obligatorio";
      } else {
        delete validationErrors.message;
      }
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
      }));
    }

    if (name === "status_id") {
      setForm((prev: any) => ({
        ...prev,
        [name]: newValue,
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

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  const handlesubmit = (e: any) => {
    e.preventDefault();
    selectFunction();
  };

  const handlerNewBase64 = () => {
    const base64Objs: any[] = [];
    fileList.forEach((file: any) => {
      if (file.url) {
        base64Objs.push({
          file: file.url,
        });
      }
    });
    return base64Objs;
  }

  const selectFunction = () => {
    if (location?.state?.id != null) {
      editForm();
    } else {
      createForm();
    }
  };

  const createForm = async () => {
    try {
      const { name, status_files, ...rest } = form;
      const payload = {
        ...rest,
        files: handlerNewBase64(),
      };

      console.log({ payload });

      await postData(payload, "email/save", false, "listacorreos");
    } catch (error) {
      console.error("Error en createForm:", error);
      handleErrorAlert("Error al crear el form.");
    }
  };

  const editForm = async () => {
    try {
      // Mostrar la confirmación antes de editar el form
      const confirmationResult = await handleEditConfirmation(
        "¿Estás seguro que deseas editar este servicio?"
      );

      if (confirmationResult.isConfirmed) {
        const { id, status_file, ...rest } = form;
       
        
        const payload = {
          ...rest,
          id: location?.state?.id,
          files: handlerNewBase64(),
        };
        await postData(payload, "email/save", false, "listacorreos");
      }
    } catch (error) {
      console.error("Error en editForm:", error);
      handleErrorAlert("Error al editar el form.");
    }
  };

  const handlerSelect = (e: any) => {
    setSelectedArea(e.target.value);
    e.target.value = e.target.value.toString();
    handleChange(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getActiveAreas = async () => {
    try {
      const response = await getAllData("api/services/activeTypes");
      setActiveAreas(response);
    } catch (error) {
      console.log(error);
    }
  };
  const resetChangeErrors = (item: any) => {
    setInputFocus(false);
    setHasErrors(true);
    const objErrors: any = {
      name_email: !item.name_email ? "El campo está vacío" : null,
      subject: !item.subject ? "El campo está vacío" : null,
      message: !item.message ? "El campo está vacío" : null,
      service_id: !item.service_id ? "El campo está vacío" : null,
    };
    // Elimina los campos que no tienen error (valor es null)
    Object.keys(objErrors).forEach((key) => {
      if (objErrors[key] == null) {
        delete objErrors[key];
      }
    });
    if (Object.keys(objErrors).length === 0) {
      setInputFocus(false);
      setHasErrors(false);
    }
    setErrors(objErrors);
  };

  useEffect(() => {
    if (editItemData?.id) {
      let status_files = 0;
      if (editItemData?.files?.length > 0) {
        const files: any = [];
        editItemData?.files.forEach((file: any, index: number) => {
          files.push({
            id: `${file?.id}`,
            name: `Adjunto ${index + 1}`,
            url: file?.photo,
          });
        });
        status_files = 1;
        setFileList(files);
      } else {
        status_files = 0;
      }

      setForm({
        ...editItemData,
        deleted: [],
        status_files,
      });

      setSelectedArea(editItemData.service_id!);
      resetChangeErrors(editItemData);
    }
  }, [editItemData]);

  useEffect(() => {
    getActiveAreas();
  }, []);

  const handleCustomRequest = (options: any) => {
    // Aquí, puedes manejar la carga del archivo como desees.
    // options.file contiene el archivo que se está cargando.
    // Puedes realizar cualquier lógica que necesites y no necesitas hacer una petición al servidor si no lo deseas.
    // Por ejemplo, puedes cargar el archivo a un servidor diferente o guardar el archivo localmente.
  
    // Cuando hayas terminado de manejar la carga, llama a options.onSuccess o options.onError según corresponda.
  
    // options.onSuccess: Si la carga es exitosa, llama a options.onSuccess y pasa cualquier respuesta requerida como argumento.
    // options.onError: Si ocurre un error en la carga, llama a options.onError y pasa el error como argumento.
    const { onSuccess, onError, file, onProgress } = options;

    const reader = new FileReader();
    reader.addEventListener("load", (ev) => {
      const fileBase64 = ev.target?.result;
      const payload = {
        name: file.name,
        url: fileBase64
      };
      setFileList((prev: any) => [...prev, payload])
    });

    reader.readAsDataURL(file);
  };

  const handleRemove = (file: any) => {
    // Lógica para eliminar el archivo de la lista de adjuntos
    const updatedFileList = fileList.filter((item: any) => item.id !== file.id);
      setForm((prev: any) => ({
        ...prev,
        files: updatedFileList,
        deleted: [{ id: file.id }, ...prev?.deleted]
      }));
    setFileList(updatedFileList);
  };
  
  const checkFilesize = (file: any) => {
    const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB (cambia el tamaño según tus necesidades)
    
    if (file.size > maxSizeInBytes) {
      // message.error('El archivo es demasiado grande. El tamaño máximo permitido es 25 MB.');
      handleErrorAlert("El adjunto no puede superar el tamaño requerido (25 megabytes)");
      return false;
    }

    return true;
  };

  return (
    <>
      {/* <!-- breadcrumb --> */}
      <BreadCrumb
        items={[
          "INICIO",
          "LISTA DE CORREOS",
          location?.state?.id ? "Editar correo" : "Agregar correo",
        ]}
        baseURL={[
          "inicio",
          "nexos/listacorreos",
          location?.state?.id
            ? "editarcorreo/" + location?.state?.id
            : "editarcorreo",
        ]}
      />
      {/* title component */}
      <TitleComponent
        title={location?.state?.id ? "Editar correo" : "Agregar correo"}
      />
      {/* Card */}
      <Form className="form-horizontal" onSubmit={handlesubmit}>
        <Card className="w-100">
          <Card.Body className="w-100">
            <Col sm={12} md={12} lg={12} xl={10} className="mx-auto">
              <Row className="w-100 justify-content-center justify-content-md-between mt-5 mb-3">
                <Col sm={12} md={12} lg={5} xl={5}>
                  <FormGroup className="form-group w-100 m-0">
                    <Form.Label className="mb-3">NOMBRE DEL CORREO</Form.Label>
                    <InputErrorMessage
                      message={errors?.name_email}
                      inputFocus={inputFocus}
                    >
                      <CFormInput
                        type="text"
                        id="quote-autocomplete"
                        name="name_email"
                        onChange={handleChange}
                        onBlur={handleChange}
                        onFocus={handleInputFocus}
                        value={form.name_email ? form.name_email : ""}
                        required
                      />
                    </InputErrorMessage>
                  </FormGroup>
                  <FormGroup className="form-group w-100 m-0">
                    <Form.Label className="mb-3">ASUNTO</Form.Label>
                    <InputErrorMessage
                      message={errors?.subject}
                      inputFocus={inputFocus}
                    >
                      <CFormInput
                        type="text"
                        id="quote-autocomplete"
                        name="subject"
                        onChange={handleChange}
                        onBlur={handleChange}
                        onFocus={handleInputFocus}
                        value={form.subject ? form.subject : ""}
                        required
                      />
                    </InputErrorMessage>
                  </FormGroup>

                  <FormGroup className="form-group text-center mt-5">
                    <Form.Label className="form-label">
                      Documentos Adjuntos
                    </Form.Label>
                    <div className="custom-controls-stacked d-flex justify-content-center gap-5">
                      <Form.Label className="custom-control custom-radio">
                        <Form.Control
                          type="radio"
                          className="custom-control-input"
                          name="status_files"
                          value={1}
                          checked={form?.status_files === 1}
                          onChange={handleChange}
                          onClick={handleInputFocus}
                        />
                        <span className="custom-control-label">Si</span>
                      </Form.Label>
                      <Form.Label className="custom-control custom-radio">
                        <Form.Control
                          type="radio"
                          className="custom-control-input"
                          name="status_files"
                          value={0}
                          checked={form?.status_files === 0}
                          onChange={handleChange}
                          onClick={handleInputFocus}
                        />
                        <span className="custom-control-label">No</span>
                      </Form.Label>
                    </div>
                  </FormGroup>
                </Col>

                <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                  <Form.Label className="mb-3">ÁREA</Form.Label>
                  {activeAreas.length > 0 && (
                    <InputErrorMessage
                      message={errors.service_id}
                      inputFocus={inputFocus}
                    >
                      <Form.Select
                        name="service_id"
                        aria-label="Default select example"
                        className="selectproduct w-100"
                        value={selectedArea}
                        onFocus={handleInputFocus}
                        onBlur={handleInputFocus}
                        onChange={handlerSelect}
                        style={{ border: "solid 0.5px gray", padding: 8 }}
                      >
                        <option value={0}>Seleccionar area</option>
                        {activeAreas.map((area: any) => (
                          <option key={area.id} value={area.id}>
                            {area.name}
                          </option>
                        ))}
                      </Form.Select>
                    </InputErrorMessage>
                  )}

                  <FormGroup className="form-group text-center mt-5">
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

              <Row className="mb-2">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormGroup>
                    <Form.Label>Mensaje</Form.Label>
                    <InputErrorMessage
                      message={errors?.message}
                      inputFocus={inputFocus}
                    >
                      <Form.Control
                        style={{
                          height: "5.5cm",
                          maxHeight: "5.5cm",
                          minHeight: "2.5cm",
                        }}
                        as="textarea"
                        name="message"
                        onFocus={handleInputFocus}
                        onChange={handleChange}
                        value={form?.message ?? ""}
                        // placeholder="Mensaje..."
                        required
                      />
                    </InputErrorMessage>
                  </FormGroup>

                  {form?.status_files === 1 && (
                    <Row className="w-100 d-flex justify-content-around align-items-center my-4">
                      <div className="d-flex justify-content-center">
                        <>
                          <Upload
                            listType="picture-card"
                            accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx" // Sólo imagenes, pdfs y excels
                            fileList={fileList}
                            onPreview={handlePreview}
                            customRequest={handleCustomRequest} // Utiliza tu función personalizada para manejar la carga.
                            onRemove={handleRemove} // Esta línea manejará la eliminación de imágenes
                            beforeUpload={checkFilesize}
                          >
                            {fileList.length >= 10 ? null : uploadButton}
                          </Upload>
                          <Modal
                            open={previewOpen}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                        </>
                      </div>
                    </Row>
                  )}
                </Col>
              </Row>

              <Row className="mb-4">
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
  );
};

export default CreateOrEditEmail;
