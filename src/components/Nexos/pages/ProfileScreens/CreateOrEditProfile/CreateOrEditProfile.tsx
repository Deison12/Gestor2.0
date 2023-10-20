import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import validator from "validator";
import { useAlert, useFetch } from "../../../hooks";

import { TitleComponent, BreadCrumb, ConfirmationCardButton } from "../../../Global";

interface Profile {
  id: number;
  name: string;
  status_id: number;
}

const CreateOrEditProfile: React.FC = () => {
  // State variables
  const [name, setName] = useState<string>("");
  const [isActive, setIsActive] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [originalName, setOriginalName] = useState<string>("");
  const [originalStatusId, setOriginalStatusId] = useState<number>(1);
  const params = useParams<{ id?: string }>();
  const location: any = useLocation();
  const [inputFocus, setInputFocus] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const { handleSuccessAlert, handleErrorAlert, handleEditConfirmation } = useAlert();
  const { postData, putData, error: hasError } = useFetch();

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  // Validation function for profile name
  const validateProfileName = (name: string): string => {
    if (nameTouched && !name.trim()) { // Envía el error solo cuando el campo está tocado y vacío
      return "El campo nombre no puede estar vacío.";
    }
    if (!validator.isAlpha(name.replace(/ /g, ""), "es-ES")) { // Elimina espacios en blanco y verifica si contiene solo letras
      return "No se permiten números o caracteres especiales en el nombre.";
    }
    return "";
  };

  // Validation function for profile status
  const validateProfileStatus = (status: string): string => {
    if (status !== "Activo") {
      return "El estado debe ser 'Activo' para crear un perfil.";
    }
    return "";
  };

  // Event handlers
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Eliminar los números del valor ingresado
    const cleanedValue = value.replace(/\d/g, '');

    setName(cleanedValue.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase()));
    if (!nameTouched && value.trim() !== "") {
      setNameTouched(true);
    }
  };
  
  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsActive(parseInt(e.target.value));
  };

  // Confirmation dialog for editing profile
  const handleEditConfirmationFn = async () => {
    const result: any = await handleEditConfirmation("¿Estás seguro de que deseas editar el perfil?");

    if (result.isConfirmed) {
      const jsonData: Profile = {
        name,
        status_id: isActive,
        id: location?.state?.id ? parseInt(location?.state?.id, 10) : 0,
      };

      try {
        await putData(jsonData, "users/profiles/edit", "listarperfiles");
      } catch (error) {
        console.error("Error al editar el perfil:", error);
        handleErrorAlert("Error, No se pudo editar el perfil.");
      }
    }
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameError = validateProfileName(name);

    // Allow "Inactivo" status only for editing profiles
    const statusError = location?.state?.id ? "" : validateProfileStatus("Activo");

    console.log("Status Error");
    
    if (nameError && statusError) {
      setError(`${nameError}\n${statusError}`);
      return;
    }
    if (nameError) {
      setError(nameError);
      return;
    }
    if (statusError) {
      setError(statusError);
      return;
    }

    if (location?.state?.id) {
      handleEditConfirmationFn();
    } else {
      if (isActive !== 1) {
        handleErrorAlert("Error, Solo se puede agregar un perfil con estado 'Activo'.");
      } else {
        const jsonData: Profile = {
          name,
          status_id: isActive,
          id: location?.state?.id ? parseInt(location?.state?.id, 10) : 0,
        };

        try {
          await postData(jsonData, "users/profiles/create");
        } catch (error) {
          console.error("Error al crear el perfil:", error);
        }
      }
    }
  };

  // Fetch profile data for editing (if editing mode)
  const getData = () => {
    if (location?.state?.id) {
      const profile: any = location.state;
      if (profile) {
        setName(profile.name);
        setIsActive(profile.status_id);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [location?.state?.id]);

  // Function to check if the button should be enabled
  const isButtonEnabled = () => {
      return name.trim() === "" || isActive !== 1;
  };

  if (hasError) {
    return (
      <ConfirmationCardButton
          baseURL="#"
          title="Error"
          subtitle={`${hasError?.message}`}
      />
    )
  }

  return (
    <>
      {/* breadcrumb */}
      <BreadCrumb
        items={['inicio', 'perfiles', location?.state?.id ? "Editar perfil" : "Agregar perfil"]}
        baseURL={['inicio', 'listprofiles', location?.state?.id ? "editprofile/" + location?.state?.id : "createprofile"]}
      />
      {/* Title */}
      <TitleComponent
        title={location?.state?.id ? "Editar perfil" : "Agregar perfil"}
        align="center"
      />
      {/* Create and Edit Form */}
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="row-sm ">
              <Col sm={12} md={12} lg={6} xl={6} className="text-center">
                <h5>Nombre de perfil</h5>
                <br />
                <Form.Group>
                  {/* <InputErrorMessage message={validateProfileName(name)} inputFocus={inputFocus}> */}
                  <Form.Control
                    className="text-capitalize"
                    type="text"
                    onFocus={handleInputFocus}
                    name="name"
                    placeholder="Nombre"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {/* </InputErrorMessage> */}
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={6} xl={6} className="text-center">
                <h5>Estado</h5>
                <br />
                <div className="d-flex justify-content-evenly">
                  <Form.Label className="custom-control custom-radio">
                    <Form.Control
                      type="radio"
                      className="custom-control-input"
                      name="status_id"
                      value="1"
                      checked={isActive === 1}
                      onChange={handleStateChange}
                    />
                    <span className="custom-control-label">ACTIVO</span>
                  </Form.Label>
                  <Form.Label className="custom-control custom-radio">
                    <Form.Control
                      type="radio"
                      className="custom-control-input"
                      name="status_id"
                      value="0"
                      checked={isActive === 0}
                      onChange={handleStateChange}
                    />
                    <span className="custom-control-label">INACTIVO</span>
                  </Form.Label>
                </div>
              </Col>
            </Row>
            <div className="text-center text-md-end text-lg-end mt-4">
              <Button variant="" type="submit" className="btn btn-primary" disabled={location?.state?.id ? false : isButtonEnabled()}>
                {location?.state?.id ? "Editar perfil" : "Agregar perfil"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateOrEditProfile;
