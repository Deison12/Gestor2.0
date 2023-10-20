import { useState, useEffect } from 'react';
import { Card, Col, Form, FormGroup, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TitleComponent, BreadCrumb } from '../../Global';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';


const Cotizar = () => {
  const [data, setData] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { getAllData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: Response = await getAllData('api/quoteTypes/getActiveRecords');
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const hendlerSelect = (e: any) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId); // Update selected option
  };

  const handleContinueClick = () => {
    // Navigate to the desired route
    localStorage.setItem('form1-ID', selectedId!);
    navigate(`${process.env.PUBLIC_URL}/nexos/cotizacionformulario/`);
  };

  // Check if the selected option exists
  const isOptionSelected = selectedId !== null;


  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['inicio', 'LISTA COTIZACIONES', 'SELECCIONAR SERVICIO']}
        baseURL={['inicio', 'nexos/listarcotizaciones', 'SELECCIONAR SERVICIO']}
      />
      {/* Componente Titulo  */}
      <TitleComponent title='PASO 1' subtitle='SELECCIONE EL SERVICIO QUE DESEA COTIZAR' align='center' />
      {/* card */}
      <div className="row justify-content-center mt-5 px-3">
        <Card className='w-100 '>
          <Card.Body className='w-100'>
            {data.length === 0 ? (
              <div className='text-center h5'>No hay datos disponibles.</div>
            ) : (
              <Col className=" mt-4 mt-xl-0 d-flex justify-content-center mx-auto ">
                <FormGroup className="form-group ">
                  <div className="custom-controls-stacked">
                    <div>
                      {data.map((item: any) => (
                        <div key={item.id}>
                          <Form.Label className="custom-control custom-radio custom-control-md">
                            <Form.Control
                              type="radio"
                              className="custom-control-input"
                              name="example-radios1"
                              value={item.id}
                              onChange={hendlerSelect}
                            />
                            <OverlayTrigger
                              trigger={["hover", "focus"]}
                              placement="right"
                              overlay={
                                <Popover className="popover-primary">
                                  <Popover.Body style={{ margin: "0px" }}>
                                    {item.description}
                                  </Popover.Body>
                                </Popover>
                              }
                            >
                                <span className="custom-control-label custom-control-label-md tx-17 px-3 ">
                                  {item.name}
                                </span>
                            </OverlayTrigger>
                          </Form.Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormGroup>
              </Col>
            )}

            <div className="d-flex justify-content-end">
              <Button
                variant=""
                className="btn me-5 mt-3 px-5 py-3 btn-primary"
                disabled={!isOptionSelected}
                onClick={handleContinueClick}
              >
                CONTINUAR
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Cotizar;
