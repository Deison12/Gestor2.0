import React, { useEffect } from "react";
import { TitleComponent, BreadCrumb } from "../../../Global";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTokenQuoteCheck } from "../../../hooks";

const Paso3 = () => {
  const storageQuoteId = localStorage.getItem("form1-ID");
  const { handlerRedirect } = useTokenQuoteCheck();
 
  useEffect(() => {
    handlerRedirect(storageQuoteId);
  }, [storageQuoteId]);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "cotización", "vista previa"]}
        baseURL={["inicio", "nexos/listarusuarios", "nexos/listarusuarios"]}
      />

      <Row className="d-flex justify-content-end container">
        <Col sm={2} className="d-flex justify-content-end">
          <Link to={"inicio"} className="text-muted ms-sm-3">
            <Button style={{}} className="btn btn-primary">
              VOLVER
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={4} lg={6} className="d-flex justify-content-center">
          {/* Component Title */}
          <TitleComponent
            title={"PASO 3"}
            subtitle={"FORMATO BÁSICO"}
            align="center"
          />
        </Col>
      </Row>

      <Row className="row-sm d-flex justify-content-center align-items-center gap-4 mx-4 h-100">
        <Col lg={5} md={5} xl={4} style={{ height: "160px" }}>
          {/* <!--Page Widget Error--> */}
          <Card className="bd-0 mg-b-20 text-center card-hover h-100">
            <Card.Body className="d-flex justify-content-center align-items-center br-5" style={{ backgroundColor: "#fd7e14" }}>
              <Link
                to={`${process.env.PUBLIC_URL}/nexos/seleccionarserviciosacotizar`}
                className="text-muted"
              >
                <h3 className="mg-b-10 mg-t-15 tx-18 text-dark">
                  USAR FORMATO BÁSICO
                </h3>
              </Link>
            </Card.Body>
          </Card>
          {/* <!--Page Widget Error--> */}
        </Col>
        <Col lg={5} md={5} xl={4} style={{ height: "160px" }}>
          {/* <!--Page Widget Error--> */}
          <Card className="bd-0 mg-b-20 text-center card-hover h-100">
            <Card.Body className="d-flex justify-content-center align-items-center br-5" style={{ backgroundColor: "#e3e3e3" }}>
              <Link
                to={`${process.env.PUBLIC_URL}/nexos/seleccionarserviciosacotizar`}
                className="text-muted"
              >
                <h3 className="mg-b-10 mg-t-15 tx-18 text-dark">
                  SELECCIONAR FORMATO
                </h3>
              </Link>
            </Card.Body>
          </Card>
          {/* <!--Page Widget Error--> */}
        </Col>
      </Row>
    </div>
  );
};

export default Paso3;