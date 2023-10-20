import React, { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TitleComponent, BreadCrumb, InputErrorMessage } from "../../Global";
import ItemsContainer from '../../../../containers/ItemsContainer'


const CreateOrEditItem: React.FC = () => {
    const location: any = useLocation();
    const { state: editItemData } = location;
    const {
        item,
        //BUTTON
        handleAdd,
        handleDelete,
        handleAddRow,
        handleDeleteRow,
        handleButtonClick,
        //IMAGE
        fileInputRef,
        image,
        //INPUTS
        handleChangeName,
        handleChange,
        handleFocus,
        handleBlur,
        //BUTTON SUBMIT
        handleSubmit,
        //QUOTES        
        getAvailableQuoteTypes,
        handleChangeOrderAndQuoteType,
        handleInputFocus,
        inputFocus,
        errors,
        combineErrors,
        disabledButton
    } = ItemsContainer(editItemData, location);

    const formatNumberInput = (inputValue: string) => {
           // Quita cualquier coma existente para evitar problemas
    const numericValue = parseFloat(inputValue.replace(/,/g, ''));
    
    // Verifica si el valor es un número válido
    if (!isNaN(numericValue)) {
      // Formatea el número con comas como separadores de miles y dos decimales
      return numericValue.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2 });
    } else {
      // Si no es un número válido, muestra el valor tal como está
      return inputValue;
    }
    }

    // Función para eliminar los separadores de miles y convertir a número
  const parseNumberInput = (inputValue: string) => {
    // Elimina todas las comas de la cadena
    const numericValue = parseFloat(inputValue.replace(/,/g, ''));
    // Verifica si el valor es un número válido
    if (!isNaN(numericValue)) {
      return numericValue;
    } else {
      // Si no es un número válido, muestra el valor tal como está
      return inputValue;
    }
  };

    const [priceCurrency, setPriceCurrency] = useState("");
    const [normalPrice, setNormalPrice] = useState(0);

    const handleCurrency = (e: any) => {
        // Limpiar caracteres no numéricos
        const inputValue = e.target.value.replace(/[^\d]/g, "");

        const newValueNumber = parseNumberInput(inputValue);
        const newValueNotNumber = formatNumberInput(inputValue);
        setPriceCurrency(newValueNotNumber);
        console.log({newValueNumber});
        console.log({newValueNotNumber});
    }



    return (
        <>
            {/* breadcrumb */}
            <BreadCrumb
                items={['inicio', 'Configuraciones', 'lista items', location?.state?.id ? "Editar item" : "Agregar item"]}
                baseURL={['inicio', 'nexos/configuraciones', 'nexos/listaritems', location?.state?.id ? "editprofile/" + location?.state?.id : "createprofile"]}
            />
            {/* Title */}
            <TitleComponent
                title={location?.state?.id ? "Editar item" : "Agregar item"}
                align="center"
            />

            {/* Create and Edit Form */}
            <Card className="box-shadow-0">
                <Card.Body className="p-4">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                <FormGroup className="form-group">
                                    <FormGroup className="control-group form-group">
                                        <Form.Label className="form-label">
                                            Nombre item
                                        </Form.Label>
                                        <InputErrorMessage message={errors.name} inputFocus={inputFocus}>
                                            <input
                                                type="text"
                                                className={`form-control text-capitalize`}
                                                placeholder=""
                                                name="name"
                                                required
                                                onChange={handleChangeName}
                                                onFocus={handleInputFocus}
                                                value={item?.name ?? ""}
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <FormGroup className="control-group form-group">
                                        <Form.Label className="form-label">
                                            Nota
                                        </Form.Label>
                                        <InputErrorMessage message={errors.note} inputFocus={inputFocus}>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                name="note"
                                                required
                                                value={item?.note ?? ""}
                                                onChange={handleChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>

                                </FormGroup>
                                <FormGroup className="form-group">
                                    <FormGroup className="control-group form-group">
                                        <Form.Label className="form-label">
                                            Valor 4 horas
                                        </Form.Label>
                                        <InputErrorMessage message={errors.price} inputFocus={inputFocus}>
                                            <Form.Control
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                name="price"
                                                required
                                                value={item.price ?? ""}
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <FormGroup className="control-group form-group">
                                        <Form.Label className="form-label">
                                            Valor 1 hora adicional
                                        </Form.Label>
                                        <InputErrorMessage message={errors.price_fraction} inputFocus={inputFocus}>
                                            <Form.Control
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                name="price_fraction"
                                                required
                                                value={item?.price_fraction ?? ""}
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <FormGroup className="control-group form-group">
                                        <Form.Label className="form-label">
                                            Condiciones del servicio
                                        </Form.Label>
                                        <InputErrorMessage message={errors.service_condition} inputFocus={inputFocus}>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                name="service_condition"
                                                required
                                                value={item?.service_condition ?? ""}
                                                onFocus={handleInputFocus}
                                                onChange={handleChange}
                                            />
                                        </InputErrorMessage>
                                    </FormGroup>
                                </FormGroup>
                            </Col>

                            {/* tipo cotizacion, orden, detalle del servicio */}
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-sm-4 mt-lg-0">
                                <Row>
                                    <Col xs={1} sm={1} md={1} lg={1} xl={1} className="d-flex align-items-center ps-0">
                                        <Form.Label className="form-label">FM</Form.Label>
                                    </Col>
                                    <Col xs={7} sm={7} md={7} lg={7} xl={7} className="d-flex align-items-center ps-0">
                                        <Form.Label className="form-label">Tipos de cotización</Form.Label>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-sm-4 mt-lg-0">
                                        <Form.Label className="form-label">Orden</Form.Label>
                                    </Col>
                                </Row>
                                {/* quotes  */}
                                {Array.isArray(item.quotes) &&
                                    item.quotes.map((itemQuote: any, index: number) => (
                                        <Row key={index} className="mb-3">
                                            <>
                                                <Col xs={1} sm={1} md={1} lg={1} xl={1} className="d-flex align-items-center ps-0">
                                                    <FormGroup className="form-group m-0">
                                                        <div className="custom-controls-stacked">
                                                            <Form.Label className="custom-control custom-checkbox">
                                                                <Form.Control
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    name="is_default"
                                                                    checked={itemQuote.is_default === 1}
                                                                    onChange={(e) =>
                                                                        handleChangeOrderAndQuoteType(
                                                                            index,
                                                                            "is_default",
                                                                            (e.target as HTMLInputElement).checked ? 1 : 0
                                                                        )
                                                                    }
                                                                />
                                                                <span className="custom-control-label"></span>
                                                            </Form.Label>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={7} sm={7} md={7} lg={7} xl={7} className="d-flex align-items-center ps-0">
                                                    <FormGroup className="form-group w-100 m-0">
                                                        <FormGroup className="control-group form-group m-0 d-flex">
                                                            <div className="d-flex align-items-start flex-column w-100">
                                                                <Form.Select
                                                                    name="quote_type_id"
                                                                    aria-label="Default select example"
                                                                    value={itemQuote?.quote_type_id ?? ""}
                                                                    onChange={(e) => handleChangeOrderAndQuoteType(index, "quote_type_id", e.target.value)}
                                                                >
                                                                    <option></option>
                                                                    {
                                                                        getAvailableQuoteTypes(index)?.map((quote: any) => (
                                                                            <option key={quote.id} value={quote.id}>
                                                                                {quote.name}
                                                                            </option>
                                                                        ))}
                                                                </Form.Select>
                                                            </div>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="d-flex align-items-end justify-content-center  p-0">
                                                    <div className="d-flex align-items-start flex-column w-100">
                                                        <Form.Control
                                                            type="number"
                                                            className="form-control w-100"
                                                            name="sort"
                                                            value={itemQuote?.sort ?? ""}
                                                            onChange={(e) => handleChangeOrderAndQuoteType(index, "sort", e.target.value)}
                                                        />
                                                    </div>
                                                    <DeleteForeverIcon
                                                        fontSize="medium"
                                                        className="text-primary mt-1 mx-2  cursor-pointer mb-2"
                                                        onClick={() => handleDeleteRow(index)}
                                                    />
                                                </Col>
                                            </>
                                        </Row>
                                    ))}
                                {/* quotes  */}
                                <div className="d-flex justify-content-evenly align-items-center" >
                                    <InputErrorMessage message={combineErrors()} inputFocus={inputFocus}><></></InputErrorMessage>

                                    <div className="text-end">
                                        <AddCircleOutlineIcon
                                            fontSize="medium"
                                            className="text-primary ms-2 cursor-pointer"
                                            onClick={handleAddRow}
                                        />
                                    </div>
                                </div>
                                <FormGroup>
                                    <Form.Label>Detalle del servicio</Form.Label>
                                    <InputErrorMessage message={errors.details} inputFocus={inputFocus}>
                                        <Form.Control
                                            style={{ height: "5.5cm", maxHeight: "8.25cm" }}
                                            as="textarea"
                                            name="details"
                                            value={item?.details ?? ""}
                                            onChange={handleChange}
                                            placeholder="Detalles del servicio..."
                                            required
                                        />
                                    </InputErrorMessage>
                                </FormGroup>
                            </Col>

                            {/* File Uploader and State */}
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mt-sm-4 mt-lg-0 d-flex flex-column justify-content-between">
                                {/* Image Upload */}
                                <div className="d-flex flex-column align-items-center ">
                                    <Form.Label>Suba aquí la foto del item</Form.Label>
                                    <div className="position-relative rounded-circle hover_opacity_btn">
                                        <img
                                            src={image || item?.photo || "https://cdn.icon-icons.com/icons2/1880/PNG/512/iconfinder-upload-4341320_120532.png"}
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
                                            bottom: "0",
                                            left: "90%",
                                            cursor: "pointer",
                                        }}>
                                            <HighlightOffIcon fontSize="medium" color="action" />
                                        </div>
                                    </div>
                                </div>
                                {/* estado */}
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                        {/* estado */}
                                        <FormGroup className="form-group text-center">
                                            <Form.Label className="form-label">Estado</Form.Label>
                                            <div className="custom-controls-stacked d-flex justify-content-center gap-2">
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="status_id"
                                                        value={1}
                                                        checked={item?.status_id === 1}
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
                                                        checked={item?.status_id === 0}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Inactivo</span>
                                                </Form.Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/* contable, muestra */}
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={6} >
                                        {/* contable */}
                                        <FormGroup className="form-group text-center">
                                            <Form.Label className="form-label">Contable</Form.Label>
                                            <div className="custom-controls-stacked d-flex justify-content-center gap-2">
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="contable"
                                                        value={1}
                                                        checked={item?.contable === 1}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Activo</span>
                                                </Form.Label>
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="contable"
                                                        value={0}
                                                        checked={item?.contable === 0}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Inactivo</span>
                                                </Form.Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={6} >
                                        {/* muestra cantidad */}
                                        <FormGroup className="form-group text-center">
                                            <Form.Label className="form-label">Muestra Cantidad</Form.Label>
                                            <div className="custom-controls-stacked d-flex justify-content-center gap-2">
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="show_quantity"
                                                        value={1}
                                                        checked={item?.show_quantity === 1}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Activo</span>
                                                </Form.Label>
                                                <Form.Label className="custom-control custom-radio">
                                                    <Form.Control
                                                        type="radio"
                                                        className="custom-control-input"
                                                        name="show_quantity"
                                                        value={0}
                                                        checked={item?.show_quantity === 0}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="custom-control-label">Inactivo</span>
                                                </Form.Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button
                                    variant=""
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                    type="submit"
                                    disabled={disabledButton}
                                >
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body >
            </Card >


        </>
    );
};

export default CreateOrEditItem;
