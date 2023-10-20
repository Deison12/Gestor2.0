import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { BreadCrumb, PDFViewer, TitleComponent } from "../../Global";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks";
import { AdvancePaymentNote } from "./CreateBilling.interface";
import dayjs from "dayjs";

const dataCheckRow = {
  contact_person: "JOSÉ DAVID",
};

const CreateBilling = () => {
  const [paymentNote, setPaymentNote] = useState<AdvancePaymentNote>();
  const { getAllData } = useFetch();

  const data = [
    {
      id: "1",
      Name: "Joan Powell",
      Position: "Associate Developer",
      Salary: "$450,870",
    },
    {
      id: "2",
      Name: "Gavin Gibson",
      Position: "Account manager",
      Salary: "$230,540",
    },
    {
      id: "3",
      Name: "Julian Kerr",
      Position: "Senior Javascript Developer",
      Salary: "$55,300",
    },
    {
      id: "4",
      Name: "Cedric Kelly",
      Position: "Accountant",
      Salary: "$234,100",
    },
    {
      id: "5",
      Name: "Samantha May",
      Position: "Junior Technical Author",
      Salary: "$43,198",
    },
  ];

  const getDataPaymentNote = async () => {
    try {
      const response: any = await getAllData(
        `api/sales/order/advancePaymentNote/26`
      );
      setPaymentNote(response[0]);
      console.log({ response });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getDataPaymentNote();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "contabilidad", "facturacion"]}
        baseURL={["inicio", "nexos/facturaciones", "nexos/crearfacturacion"]}
      />

      <div className="mt-4 p-4">
        <Row>
          {/* get Data Form  */}
          <Col xs={12} sm={12} md={12} lg={7} xl={7}>
            <h4 className="text-center text-uppercase mb-4">
              Evidencia nota contable
            </h4>
            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Row>
                  <p>
                    <b className="text-uppercase">NIT: </b>
                    <span className="text-uppercase ms-2">
                      {!!paymentNote ? paymentNote?.nit : null}
                    </span>
                  </p>
                </Row>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Row>
                  <p>
                    <b className="text-uppercase">Tipo de asamblea: </b>
                    <span className="text-uppercase ms-2">
                      {!!paymentNote ? paymentNote?.meeting_type : null}
                    </span>
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Nombre del Cliente: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.client_name : null}
                  </span>
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Dirección del comercial: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.address : null}
                  </span>
                </p>
              </Col>
            </Row>

            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              </Col>
            </Row>

            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Nombre del Encargado: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.contact_name : null}
                  </span>
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Hora de Registro: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote
                      ? paymentNote?.meeting_time_register
                      : null}
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Hora de Inicio: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.meeting_time_init : null}
                  </span>
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Fecha del evento: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote
                      ? dayjs(paymentNote?.meeting_date).format("YYYY-MM-DD")
                      : null}
                  </span>
                </p>
              </Col>
            </Row>

            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              </Col>
            </Row>

            <Row className="d-flex">
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Telefonos: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.contact_phone : null}
                  </span>
                </p>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <p>
                  <b className="text-uppercase">Ciudad: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.city : null}
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="d-flex">
              <Col xs={12} >
                <p>
                  <b className="text-uppercase">Observaciones: </b>
                  <span className="text-uppercase ms-2">
                    {!!paymentNote ? paymentNote?.observations : null}
                  </span>
                </p>
              </Col>
             
            </Row>

            <Card>
              <Card.Header className=" pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 ">TABLA LISTA DE ITEMS</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table className="table table-bordered table-striped mg-b-0 text-md-nowrap">
                    <thead>
                      <tr className="text-center">
                        <th
                          style={{
                            borderRight: "2px solid #333",
                            borderBottom: "2px solid #333",
                          }}
                        ></th>
                        <th
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          HORAS COTIZACIÓN
                        </th>
                        <th
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          HORA ADICIONAL
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr className="text-center">
                        <th
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          EQUIPOS Y SERVICIOS
                        </th>
                        <th
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          3
                        </th>
                        <th
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          1
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentNote?.items.map((item: any, index: any) => (
                        <tr key={index}>
                          <td style={{ border: "2px solid #333" }}>
                            <div className="w-100">
                              <tr className="w-100 d-flex justify-content-between">
                                <span>{item?.name}</span>
                                <span>{item?.quantity}</span>
                                <span>{item?.price_fraction}</span>
                              </tr>
                            </div>
                          </td>
                          <td style={{ border: "2px solid #333" }}>
                            {item?.total}
                          </td>
                          <td style={{ border: "2px solid #333" }}>
                            {item?.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-dark text-white text-center font-weight-bold">
                        <td colSpan={1} style={{ border: "2px solid #333" }}>
                          DESCUENTO CLIENTE ESPECIAL SE CONTRATA ANTES DEL 10 DE
                          SEPTIEMBRE
                        </td>
                        <td style={{ border: "2px solid #333" }}>$4.300.560</td>
                        <td style={{ border: "2px solid #333" }}>$4.560</td>
                      </tr>

                      <tr className="text-center font-weight-bold">
                        <td
                          style={{
                            border: "2px solid #333",
                            backgroundColor: "#fd7e14",
                          }}
                        >
                          TOTAL:
                        </td>
                        <td style={{ border: "2px solid #333" }}>$4.300.560</td>
                        <td style={{ border: "2px solid #333" }}>$4.560</td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                {/*<!-- bd --> */}
              </Card.Body>
              {/*<!-- bd --> */}
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5} xl={5}>
            <h4 className="text-center text-uppercase mb-4">
              Evidencia nota contable
            </h4>
            <PDFViewer pdfUrl="https://nexos-cdn.sfo3.cdn.digitaloceanspaces.com/Quotes/quote-virtual.pdf" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateBilling;
