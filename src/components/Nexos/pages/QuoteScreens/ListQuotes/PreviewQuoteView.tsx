import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PDFViewer } from "../../../Global"; // Asegúrate de importar correctamente el componente PDFViewer
import { BreadCrumb, TitleComponent } from "../../../Global"; // Importa los componentes BreadCrumb y TitleComponent
import { removeAll } from "../../../../../helpers";
import { useFetch } from "../../../hooks";

interface objButtons {
  id: number;
  name: string;
  icon: React.ReactNode;
  click: () => void;
}

const PreviewQuoteView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const storageQuoteId = localStorage.getItem("form_quote_id");
  console.log("PDF VIEWER:", location.state);
  const buttons: objButtons[] = [
    {
      id: 1, name: 'Nueva Cotización', icon: "", click: () => {
        navigate(`${process.env.PUBLIC_URL}/nexos/cotizar`)
        removeAll()
      }
    },
    { id: 2, name: 'Modificar Datos Cliente', icon: "", click: () => navigate(`${process.env.PUBLIC_URL}/nexos/cotizacionformulario`, { state: location?.state }) },
    {
      id: 3, name: 'Modificar Items', icon: "", click: () => {
        navigate(`${process.env.PUBLIC_URL}/nexos/seleccionarserviciosacotizar`)
        localStorage.setItem('create_quote_id', "0");
      }
    },
    {
      id: 4, name: 'Aplicar Descuentos', icon: "", click: () => navigate(`${process.env.PUBLIC_URL}/nexos/descuentosaaplicar`)
    },
  ];
  const { getAllData } = useFetch();
  const getData = async () => {
    if (storageQuoteId) {
      try {
        const res: any = await getAllData(`api/quotes/document/${storageQuoteId}`, false)
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setData('');
    }
  }
  useEffect(() => {
    getData();
  }, []); 


  return (
    <>
      <BreadCrumb
        items={['inicio', 'cotización PDF']}
        baseURL={['inicio', 'nexos/cotizacionpdf']}
      />
      {/* Title */}
      <TitleComponent title={"Cotización - PDF"} />

      <Card>
        <Card.Body>
          <Row>
            <Col xs={12} lg={8}>
              <div style={{ width: '100%', height: '600px'/* , overflow: 'auto' */ }}>
                <PDFViewer pdfUrl={data} />
              </div>
            </Col>
            <Col xs={12} lg={4} className="d-flex flex-column justify-content-start pb-4">
              <h3 className="text-center fw-bold">ACCIONES</h3>
              {buttons.map((btn: objButtons) => (
                <Row key={btn.id}>
                  <Button
                    variant="primary"
                    className="btn btn-primary mb-2 w-100 fw-normal"
                    type="submit"
                    onClick={btn.click}
                  >
                    {btn.icon} {btn.name}
                  </Button>
                </Row>
              ))}
              {/* <Row>
                <Button
                  variant="primary"
                  className="btn btn-primary mb-2 mt-4 w-100 fw-normal"
                  type="submit"
                >
                  Enviar Cotización
                </Button>
              </Row> */}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
PreviewQuoteView.propTypes = {};
PreviewQuoteView.defaultProps = {};
export default PreviewQuoteView;