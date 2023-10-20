import { useEffect, useState } from "react";
import { FormGroup, } from "@mui/material";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, } from "react-router-dom";
import { useAlert, useFile, useFetch, useFormUsers } from "../../../hooks";
import { TitleComponent, BreadCrumb, InputErrorMessage, ConfirmationCardButton } from "../../../Global";

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const initialState = {
  id: 0,
  name: "",
  email: "",
  password: "",
  phone: "",
  profiles: [],
  file: "",
  status_id: 1,
};


const CreateUsers = () => {
  const location: any = useLocation();

  const [user, setUser] = useState<any>(initialState);
  const [profiles, setProfiles] = useState<any>([]);
  const { getAllData, postData, putData, isLoading, error } = useFetch();

  const { handleAdd, fileInputRef, image, handleButtonClick, handleDelete, handleChangeImage } = useFile(setUser);

  const { handleChange, showHide, typePassword, setUserProfiles, isPasswordTouched, setIsPasswordTouched, resetForm, setErrors, setHasErrors, userProfiles, isLocked, errors, hasErrors } = useFormUsers(setUser, user);

  const { handleSuccessAlert, handleErrorAlert, handleEditConfirmation } = useAlert();

  const selectFunction = () => {
    if (location?.state?.id != null) {
      editUser();
    } else {
      createUser();
    }
  };

  const createUser = async () => {
    try {
      const response = await postData(user, "users/create");
      handleSuccessAlert("Usuario creado exitosamente", "listarusuarios");
    } catch (error) {
      setErrors({ msg: "Error, no se pudo crear el usuario" });
      handleErrorAlert("Error, no se pudo crear el usuario");
    }
  };

  const editUser = async () => {
    try {
      const result = await handleEditConfirmation("¿Seguro que desea editar este usuario?");
      if (result.isConfirmed) {
        const { password, ...rest } = user;
        if (password == "") {
          // console.log("REST: ", rest);
          const response = await putData(rest, "users/edit", "listarusuarios");
        } else {
          const response = await putData(user, "users/edit", "listarusuarios");
        }
        //handleSuccessAlert("Usuario editado exitosamente.", "listarusuarios");
      }
    } catch (error) {
      setErrors({ msg: "Error, no se pudo editar el usuario" });
      handleErrorAlert("Error, no se pudo editar el usuario");
    }
  };

  /* GetUsers and GetProfiles */
  const getData = async () => {
    const response: any = location.state;

    if (response?.photo) {
      handleChangeImage(response?.photo);
    }
    // En caso de que el arreglo de profiles sea null. Se setea como un arreglo vacío
    let arrayProfiles: any = [];
    const newProfile = response?.profiles == null ? [] : [...response?.profiles];

    if (newProfile.length > 0) {
      newProfile.forEach((pr) => {
        arrayProfiles.push(pr.profile_id);
      });
    }

    console.log("userProfiles:", arrayProfiles);
    console.log("arrayProfiles:", arrayProfiles);
    console.log("newProfile:", newProfile);

    setUserProfiles([...userProfiles, ...arrayProfiles]);
    setUser({ ...response, profiles: arrayProfiles });
  }

  const getProfiles = async () => {
    const response = await getAllData("api/users/profiles");
    setProfiles(response);
  }

  /* Alerts */
  useEffect(() => {
    // Atualiza los perfiles en caso de haber un usuario (editar)
    setIsPasswordTouched(false);
    getProfiles();

    if (location?.state?.id != null) {
      getData();
      if (location?.state?.profiles?.length === 0) {
        // En caso de que algun usuario no tenga perfiles, obliga a validar que tenga al menos uno antes de desabilitar el form
        setErrors({ profiles: "" });
      } else {
        setHasErrors(false);
        setErrors({});
      }
      // setHasErrors(false);
    } else {
      setHasErrors(true);
      resetForm();
      handleChangeImage("");
    }
  }, [location]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    selectFunction();
  }

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['inicio', 'lista usuarios', location?.state?.id ? "EDITAR USUARIO" : "Agregar USUARIO",]}
        baseURL={['inicio', 'nexos/listarusuarios', location?.state?.id ? "nexos/editarusuarios" : "nexos/crearusuarios",]}
      />
      {/* Componente Titulo  */}
      <TitleComponent title={location?.state?.id ? "EDITAR USUARIO" : "Agregar USUARIO"} align="center" />
      {/* FORM */}
      <Card className="box-shadow-0">
        <Card.Body className="p-4">
          <Form className="form-horizontal" onSubmit={handleSubmit}>
            <Row>
              <Col lg={4} xl={4} md={6} sm={6}>
                <FormGroup className="form-group">
                  <FormGroup className="control-group form-group">
                    <Form.Label className="form-label">
                      Nombre y Apellido*
                    </Form.Label>
                    < InputErrorMessage message={errors.name} inputFocus={isPasswordTouched} >
                      <Form.Control
                        type="text"
                        className="form-control text-capitalize"
                        placeholder=""
                        name="name"
                        required
                        value={user?.name ? user?.name : ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                        onFocus={() => setIsPasswordTouched(true)}
                      />
                    </InputErrorMessage>
                  </FormGroup>
                  <FormGroup className="control-group form-group">
                    <Form.Label className="form-label">Contraseña {!location?.state?.id && "*"} {location?.state?.id && ("(opcional)")}</Form.Label>
                    <div className="input-group ">
                      < InputErrorMessage message={errors.password} inputFocus={isPasswordTouched} >
                        <>
                          <Form.Control
                            type={typePassword.type}
                            className="form-control w-100"
                            placeholder=""
                            name="password"
                            value={user?.password ? user?.password : ""}
                            onChange={handleChange}
                            onFocus={() => setIsPasswordTouched(true)}
                            onBlur={handleChange}
                            autoComplete="off"
                          />
                          <span className="input-group-text cursor-pointer h-100" onClick={showHide}>
                            <i className={`${isLocked ? 'fa fa-eye' : 'fa fa-eye-slash'}`}></i>
                          </span>
                        </>
                      </InputErrorMessage>
                    </ div>
                  </FormGroup>
                  <FormGroup className="control-group form-group">
                    <Form.Label className="form-label">
                      Correo electronico*
                    </Form.Label>
                    < InputErrorMessage message={errors.email} inputFocus={isPasswordTouched} >
                      <Form.Control
                        type="email"
                        className="form-control"
                        required
                        placeholder=""
                        name="email"
                        value={user?.email ? user?.email : ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                        onFocus={() => setIsPasswordTouched(true)}
                      />
                    </InputErrorMessage>
                  </FormGroup>
                  <div className="control-group form-group mb-0">
                    <Form.Label className="form-label">Telefono*</Form.Label>
                    <InputErrorMessage message={errors.phone} inputFocus={isPasswordTouched}>
                      <Form.Control
                        name="phone"
                        type="text"
                        className="form-control"
                        required
                        value={user?.phone ? user?.phone : ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                        onFocus={() => setIsPasswordTouched(true)}
                      />
                    </InputErrorMessage>
                  </div>
                </FormGroup>
              </Col>
              {/* Checkboxes */}
              <Col lg={4} xl={4} md={6} sm={6}>
                <FormGroup className="form-group m-0">
                  <Form.Label className="form-label ">
                    Seleccione los perfiles a asignar
                  </Form.Label>
                  <InputErrorMessage message={errors.profiles} inputFocus={isPasswordTouched} >
                    <div className="custom-controls-stacked">
                      {
                        (profiles.length > 0) ? profiles?.map((item: { id: number; name: string, status_id: number }) => {
                          return (
                            <Form.Label
                              className="custom-control custom-checkbox"
                              key={`${item?.id}-${item?.name}`}
                            >
                              <Form.Control
                                type="checkbox"
                                className="custom-control-input"
                                name="profiles"
                                value={item?.id}
                                checked={user?.profiles?.includes(item?.id)}
                                // user?.profiles?.some((obj: any) => obj.profile_id == item?.id)
                                onChange={handleChange}
                              />
                              <span className="custom-control-label">{item?.name}</span>
                            </Form.Label>
                          )
                        }) : null
                      }
                    </div>
                  </InputErrorMessage>
                </FormGroup>
              </Col>

              {/* Checkboxes */}
              {/* File Uploader and State */}
              <Col lg={4} xl={4} md={12} sm={12} className="mt-sm-4 mt-lg-0 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column align-items-center ">
                  <Form.Label>Suba aquí la foto del usuario</Form.Label>
                  <div className="position-relative rounded-circle hover_opacity_btn">
                    <img
                      src={(!image) ? "https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-upload-4341320_120532.png" : image}
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
                      top: "68%",
                      left: "90%",
                      cursor: "pointer",
                    }}>
                      <HighlightOffIcon fontSize="large" color="action" />
                    </div>

                  </div>
                </div>
                <FormGroup className="form-group text-center">
                  <Form.Label className="form-label">Estado</Form.Label>
                  <div className="custom-controls-stacked d-flex justify-content-center gap-2">
                    <Form.Label className="custom-control custom-radio">
                      <Form.Control
                        type="radio"
                        className="custom-control-input"
                        name="status_id"
                        checked={user?.status_id == 1}
                        value={1}
                        onChange={handleChange}
                      />
                      <span className="custom-control-label">Activo</span>
                    </Form.Label>
                    <Form.Label className="custom-control custom-radio">
                      <Form.Control
                        type="radio"
                        className="custom-control-input"
                        name="status_id"
                        checked={user?.status_id == 0}
                        value={0}
                        onChange={handleChange}
                      />
                      <span className="custom-control-label">Inactivo</span>
                    </Form.Label>
                  </div>
                  <span className="tag-outline-info text-primary">{errors.status_id}</span>
                </FormGroup>
                <Button
                  variant=""
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  type="submit"
                  disabled={hasErrors}
                >
                  Guardar
                </Button>
              </Col>
              {/* Photo and State */}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div >
  );
};

export default CreateUsers;
