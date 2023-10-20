import React, { useEffect, useState } from "react";
import {
  TitleComponent,
  BreadCrumb,
  InputErrorMessage,
  Loader,
  ConfirmationCardButton,
} from "../../../Global";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  ItemsByQuoteId,
  SeleccionarServiciosACotizarUI,
  SelectedItems,
  SelectedQuoteItem,
} from "../../../Interfaces/Pages/SeleccionarServiciosACotizar.interface";
import { InputContainer } from "../../../../../containers";
import { useTokenQuoteCheck } from "../../../hooks";

const ServiciosACotizar = () => {
  const storageQuoteTypeId = localStorage.getItem("form1-ID");
  const storageQuoteId = localStorage.getItem("form_quote_id");

  //geting data
  const [data, setData] = useState<SeleccionarServiciosACotizarUI[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedQuoteItem>({
    quote_id: storageQuoteId,
    discount_id: 0,
    items: [],
  });
  const [units, setUnits] = useState(null);

  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getAllData, isLoading, error } = useFetch();
  const { handlerRedirect } = useTokenQuoteCheck();
  const location: any = useLocation();
  const navigate = useNavigate();

  const handleSelectedServices = (item: any, e: string = "") => {
    if (item.contable === 0) {
      handleCheckboxChange(item);
    } else {
      handleInputChange(item, e);
    }
  };

  const handleInputChange = (item: any, e: any) => {
    const { id, ...rest } = item;
    let value = e.target.value.replace(/^0+|[^0-9]/g, "");

    const flatFilteredService = selectedServices.items.some(
      (service: any) => service.item_id == item.id
    );


    const updatedItemsData = data.map((service: any) => {
      if (service.id === item.id) {
        return { ...service, quotes: value };
      }
      return service;
    });

    // Válida que no exista el item dentro del arreglo y lo agrega nuevo
    if (!flatFilteredService && !(Number(value) == 0 || value == "")) {
      setSelectedServices((prev: any) => ({
        ...prev,
        items: [...prev.items, { item_id: item.id, value, ...rest }],
      }));
    } else {
      // En caso de existir lo elimina
      if (Number(value) === 0 || value === "") {
        const updatedItemsServices = selectedServices.items.filter(
          (service: any) => service.item_id != item.id
        );
        setSelectedServices((prev: any) => ({
          ...prev,
          items: updatedItemsServices,
        }));
      } else {
        const updatedItemsServices = selectedServices.items.map(
          (service: any) => {
            if (service.item_id === item.id) {
              return { ...service, value };
            }
            return service;
          }
        );
        setSelectedServices((prev: any) => ({
          ...prev,
          items: updatedItemsServices,
        }));
      }
    }
    setData(updatedItemsData);
  };

  const handleCheckboxChange = (item: any) => {
    // Check si el objeto se encuentra dentro del array y devuelve un booleano
    const { id, ...rest } = item;
    const flatFilteredService = selectedServices.items.some(
      (service: any) => service.item_id === item.id
    );

    // Si es falso no se encuentra y se agrega al arreglo
    if (!flatFilteredService) {
      // Acá se setean los inputs que se pintan en la vista
      const updatedItemsData = data.map((service: any) => {
        if (service.id === item.id) {
          if (item.id === 1 || item.id === 2) {
            console.log("ENTRA EN QUOTE ITEM")
            return { ...service, quotes: 1, value: units };
          } else {
            return { ...service, quotes: 1 };
          }
        }
        return service;
      });

      // Agregarle al item la cantidad de unidades cotizadas en caso de ser dispositivos de votación o votación con tarjeta de código de barras
      if (item.id === 1 || item.id === 2) {
        // Acá se setean los inputs que se llevan a la otra vista (PASO 4 - Items Seleccionados)
        console.log("ENTRA EN EL ID:", units)
      setSelectedServices((prev: any) => ({
        ...prev,
        items: [...prev.items, { ...rest, item_id: item.id, value: units }],
      }));
    } else {
      // En caso contrario. Agregar 1 en la cantidad
      setSelectedServices((prev: any) => ({
        ...prev,
        items: [...prev.items, { ...rest, item_id: item.id, value: 1 }],
      }));
    }
     
      console.log({updatedItemsData})
      setData(updatedItemsData);
    } else {
      // Si es verdadero se filtra y se elimina del arreglo
      const updatedItemsData = data.map((service: any) => {
        if (service.id === item.id) {
          return { ...service, quotes: 0 };
        }
        return service;
      });

      const updateSelectedServices = selectedServices.items.filter(
        (service: any) => service.item_id != item.id
      );
      setSelectedServices((prev: any) => ({
        ...prev,
        items: updateSelectedServices,
      }));

      setData(updatedItemsData);
    }
  };

  useEffect(() => {
    handlerRedirect(storageQuoteTypeId);
    const getData = async () => {
      try {
        // setIsLoading(true);
        const response1: any = await getAllData(
          `api/items/forQuoteType/${storageQuoteTypeId}`
        );
        
        setData((prev: any) => [...response1]);

        // EN CASO DE HACER CORRECTAMENTE LAS PETICIONES AGREGARLE LAS UNIDADES COTIZADAS
        if (storageQuoteTypeId && storageQuoteId) {
          const responseItemsSave = await getAllData(
            `api/quotes/items/${storageQuoteId}`
          );
          setUnits(responseItemsSave?.units);

          if (!location.state) {
            const responseItemsSave = await getAllData(
              `api/quotes/items/${storageQuoteId}`
            );
  
                      // Acá se setean los inputs que se pintan en la vista
            const updatedInputElements = response1.map(
              (
                inputData: SeleccionarServiciosACotizarUI
              ): SeleccionarServiciosACotizarUI => {
                // En caso de existir items por ese quote_id. Agregarlos
                const matchingData: ItemsByQuoteId = responseItemsSave?.content.find(
                  (item: ItemsByQuoteId) => item.item_price_id == inputData.id
                );
                // Válida que se haya hecho match con los items asociados a esa cotización
                if (matchingData) {
                  return {
                    ...inputData,
                    id: matchingData.item_price_id,
                    name: matchingData.name,
                    quotes: matchingData?.quantity!,
                  };
                } else {
                  // En caso de no haber items agregados ateriormente en esa cotización
                  // Validaciones recepción de firmas
                  if (inputData.id === 3) {
                    // Por cada 100 unidades habrá un item de recepción de firmas
                    const calculateInitFirms = Math.round(responseItemsSave?.units / 100);
                    return { ...inputData, quotes: calculateInitFirms }
                  } else {
                    return { ...inputData };
                  }
                }
              }
            );
  
            // Acá se setean los inputs que se llevan a la otra vista (PASO 4 - Items Seleccionados)
            const updatedSendElements: SelectedItems[] = [];
  
            response1.forEach((inputData: SeleccionarServiciosACotizarUI) => {
              // En caso de existir items por ese quote_id. Agregarlos
              const matchingData: ItemsByQuoteId = responseItemsSave?.content.find(
                (item: ItemsByQuoteId) => item.item_price_id == inputData.id
              );
              // Válida que se haya hecho match con los items asociados a esa cotización
              if (matchingData) {
                updatedSendElements.push({
                  item_id: matchingData.item_price_id,
                  name: matchingData?.name,
                  value: matchingData?.quantity!,
                  discount: matchingData?.discount,
                  is_discount_percentage: matchingData?.is_discount_percentage,
                  price: matchingData?.price,
                });
              } else {
                console.log({inputData})
                // En caso de no haber items agregados ateriormente en esa cotización
                  // Validaciones recepción de firmas
                  if (inputData.id === 3) {
                    // Por cada 100 unidades habrá un item de recepción de firmas
                    const calculateInitFirms = Math.round(responseItemsSave?.units / 100);
                    updatedSendElements.push({
                      item_id: inputData.id,
                      name: inputData?.name,
                      value: calculateInitFirms,
                      discount: 0,
                      is_discount_percentage: 0,
                      price: inputData?.price,
                    });
                  }
              }
            });
  
            setSelectedServices((prev: any) => ({
              ...prev,
              items: updatedSendElements,
            }));
  
            setData(updatedInputElements);
          }
        }

        

        if (location?.state) {
          setSelectedServices(location?.state);
          const arrayCombined = response1?.map((item1: any) => {
            const item2 = location?.state?.items.find(
              (item2: any) => item2.item_id === item1.id
            );
            if (item2) {
              return {
                ...item1,
                quotes: item2.value,
              };
            } else {
              return item1;
            }
          });

          setData(arrayCombined);
        }

        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
      }
    };
    getData();
  }, [storageQuoteTypeId]);

  const handleSubmit = () => {
    localStorage.removeItem('create_quote_id')
    navigate(`${process.env.PUBLIC_URL}/nexos/seleccionados/`, {
      state: selectedServices,
    });

  };

  if (error) {
    return (
      <ConfirmationCardButton
        baseURL="#"
        title="Error"
        subtitle={`${error?.message}`}
      />
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["INICIO", "VENTAS", "LISTA COTIZACIONES", "vista previa"]}
        baseURL={[
          "inicio",
          "nexos/ventasconfirmaciones",
          "nexos/listarcotizaciones",
          "",
        ]}
      />

      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={4} lg={6} className="d-flex justify-content-center">
          {/* Component Title */}
          <TitleComponent
            title={"PASO 4"}
            subtitle="SELECCIONE LOS SERVICIO A COTIZAR"
            align="center"
          />
        </Col>
      </Row>
      <Container className="d-flex flex-column justify-content-center align-items-center">
        {isLoading && <Loader />}

        {!error && (
          <InputContainer
            inputsData={data}
            handleSelectedServices={handleSelectedServices}
          />
        )}

        {!isLoading && !error && (
          <div className="w-100 d-flex justify-content-end mb-5">
            <Button
              style={{}}
              className="btn btn-primary d-none d-md-block"
              onClick={handleSubmit}
              // disabled={selectedServices?.items.length === 0}
            >
              CONTINUAR
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServiciosACotizar;
