import { useCallback, useEffect, useState } from "react";
import {
  BasicDataTable,
  TitleComponent,
  BreadCrumb,
} from "../../Global";
import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Checkbox } from "@mui/material";
import ModalSeguimientoOrganizacion from "./ModalSeguimientoOrganizacion";
import { useAlert, useFetch } from "../../hooks";
import dayjs from 'dayjs';
import ModalMensajes from "./ModalMensajes";
import "./ModalMensajes.scss";
import Alert from 'react-bootstrap/Alert';
import ModalSeguimientoVerificacion from "./ModalSeguimientoVerificacion";

const SeguimientoOrganizacion = () => {
  const location = useLocation();
  const [dataTable, setDataTable] = useState<any>([]);
  const [dataSelect, setDataSelect] = useState<any>([]);
  const [dataCheckRow, setDataCheckRow] = useState<any>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const { postData, putData, getAllData, getById } = useFetch();
  const { handleEditConfirmation } = useAlert()
  const [selectedOption, setSelectedOption] = useState("");
  const [messageName, setMessageName] = useState<any>();
  const [refreshTable, setRefreshTable] = useState(0);

  let rowIndex = location.state;
  let statusBadgeClass = '';
  /* modals */
  const [showModalSeguimiento, setShowModalSeguimiento] = useState(false);
  const [showModalMensajes, setShowModalMensajes] = useState(false);
  const [showModalVerificacion, setShowModalVerificacion] = useState(false);
  const [showFullNote, setShowFullNote] = useState(false);
  const [dataMessages, setDataMessages] = useState<any[]>([]);
  const nameSessionStorage = sessionStorage.getItem('nombre')
  const [selectedFilter, setSelectedFilter] = useState("Mostrar todos");

  const handleVerClick = (index: number) => {
    setShowFullNote(true);
  };

  const handleVerMenosClick = () => {
    setShowFullNote(false);
  };

  const handleModalClose = () => {
    setShowModalSeguimiento(false);
  };

  const handleSubmitModal = async ({ message, selectedRowId, priority }: any) => {
    try {
      const payload = { quote_id: selectedRowId, message: message, priority: priority == '' ? 0 : priority }
      let res = await postData(payload, 'quotes/message/save', false, "");
      setMessageName(nameSessionStorage)
      if (res) {
        await fetchDataMessages(selectedRowId)
        handleModalClose();
      }
    } catch (error) {
      handleModalClose();
      console.error("Error en createItem:", error);
    }
  };

  const handleSendMessage = async ({ selectedRowId }: any) => {
    try {
      const payload = {
        quoteId: selectedRowId,
        content: 'Cotización de Nexos Grupo Empresarial S.A.S',
      }
      //await postData(payload, 'quotes/sendEmail', false, "");
    } catch (error) {
      handleModalClose();
      console.error("Error en createItem:", error);
    }
  };

  const handleCheckboxChange = useCallback((rowIndex: number, rowId: number, rowAll: any) => {
    console.log("rowId", rowId, 'selectedRowId', selectedRowId);
    if (rowId === selectedRowId) {
      setSelectedRowId(null);
      setDataCheckRow([]);
      setDataMessages([]);
    } else {
      setDataCheckRow(rowAll);
      setSelectedRowId(rowId);
      fetchDataMessages(rowId);
      setSelectedOption("");
    }
  }, [selectedRowId]);

  const columns = [
    {
      Header: "Seleccionar",
      accessor: "id",
      Cell: ({ value, row }: { value: number; row: any }) => (
        <Checkbox
          color={value === selectedRowId ? "warning" : "warning"}
          onChange={() => handleCheckboxChange(row.index, value, row.original)}
          checked={value === selectedRowId ? true : false}
        />
      ),
    },
    {
      Header: "Cotización",
      accessor: "number",
    },
    {
      Header: "Nombre del cliente",
      accessor: "client_name",
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: 'Fecha Seguimiento',
      accessor: 'meeting_date',
      Cell: ({ value }: { value: any }) => {
        return (
          <span>{
            value === "None"
              ? "NA"
              : dayjs(value).format("DD-MM-YYYY")
          }</span>
        )
      }
    },
    {
      Header: "Ver",
      accessor: "",
      className: "wd-10p borderrigth ",
      Cell: ({ row }: { row: any }) => {
        const handleQuoteClick = () => {
          localStorage.setItem('form_quote_id', String(row.original.id));
          localStorage.setItem('form_nit', String(row.original.nit));
          localStorage.setItem('form1-ID', String(row.original.quote_type_id));
        };
        return (
          <Link
            to={`${process.env.PUBLIC_URL}/nexos/cotizacionpdf`}
            state={row.original}
            onClick={handleQuoteClick}
          >
            <svg
              onClick={handleQuoteClick}
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z" fill="rgba(234,113,46,1)"></path></svg>
          </Link>
        );
      },
    },
  ];

  const handleChangeSelect = async (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleEdit = async () => {
    if (selectedOption && selectedRowId) {
      const payload = {
        id: selectedRowId,
        status: selectedOption
      };
      const confirmChange = await handleEditConfirmation("¿Deseas continuar con el cambio de estado de la cotización?");
      if (confirmChange.isConfirmed) {
        setRefreshTable(refreshTable + 1);
        setDataCheckRow({ ...dataCheckRow, status: selectedOption });
        if (selectedOption === "Contratado") {
          setShowModalVerificacion(true);
        } else {
          await putData(payload, `quotes/edit/status`, "", false);
        }
      } else {
        setSelectedOption("");
      }
    }
  };

  const handleSendMail = () => {
    alert('mensaje enviado')
    console.log('sending email', selectedRowId)
  }
  if (!!dataCheckRow && !!dataCheckRow.status) {
    switch (dataCheckRow.status.toLowerCase()) {
      case 'pendiente' :
        statusBadgeClass = 'custom-badge-warning';
        break;
      case  'seguimiento':
        statusBadgeClass = 'custom-badge-info';
        break;
      case  'contratado':
        statusBadgeClass = 'custom-badge-success';
        break;
      case 'no contratado':
        statusBadgeClass = 'custom-badge-danger';
        break;
      default:
        statusBadgeClass = 'custom-badge';
    }
  }

  const fetchData = async () => {
    try {
      if (rowIndex) {
        const res: any = await getById(`api/quotes/list/${rowIndex}`);
        setDataTable(res)
      }
      const response: any = await getAllData("api/quoteStatus/list/active");
      setDataSelect(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDataMessages = async (quoteId?: number | null) => {
    try {
      if (!!quoteId) {
        const resMessages: any = await getAllData(`api/quotes/messages/sent/${quoteId}`);
        setDataMessages(resMessages);
      } else {
        setDataMessages([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTable]);

  // Declaración de las listas de mensajes con prioridad 1 y 0
  const [priority1Messages, setPriority1Messages] = useState<any>([]);
  const [priority0Messages, setPriority0Messages] = useState<any>([]);

  const handlePriority = async () => {
    let row1: any = []
    let row2: any = []

    for (let i = 0; i < dataMessages.length; i++) {
      if (dataMessages[i].priority === 1) {
        row1.push(dataMessages[i])
      } else{
        row2.push(dataMessages[i])
      }
    }
    setPriority1Messages(row1)
    setPriority0Messages(row2)
  }

  useEffect(() => {
    handlePriority()
  }, [dataMessages]);

  // Obtener la última alerta blanca (prioridad 0)
  const lastMessage = () => {
    return priority0Messages && priority0Messages.length > 0
      ? priority0Messages[priority0Messages.length - 1]
      : [];
  }

  // Formatear el número de teléfono
  if (dataCheckRow && dataCheckRow.contact_phone) {
    var telefono = dataCheckRow.contact_phone.toString();
    var telefonoFormateado = telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }

  const handleChangeFilterSelect = async (e: any) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
  };

  // Filtra la data según el estado seleccionado (insensible a mayúsculas/minúsculas)
  const filteredData = selectedFilter === "Mostrar todos"
    ? dataTable
    : dataTable.filter((row: any) =>
      row.status.toLowerCase() === selectedFilter.toLowerCase()
    );

  return (
    <>
      {/* modals */}
      <ModalSeguimientoOrganizacion
        showModal={showModalSeguimiento}
        onClose={() => setShowModalSeguimiento(false)}
        onSubmit={handleSubmitModal}
        selectedRowId={selectedRowId}
      />

      <ModalMensajes
        showModal={showModalMensajes}
        onClose={() => setShowModalMensajes(false)}
        messages={dataMessages}
        maxMessagesPerRow={3}
        inCharge={!!dataCheckRow ? dataCheckRow.contact_person : null}
      />

      <ModalSeguimientoVerificacion
        state={dataCheckRow}
        showModal={showModalVerificacion}
        onClose={() => setShowModalVerificacion(false)}
        onSubmit={() => setShowModalVerificacion(false)}
        selectedRowId={selectedRowId}
        dataCheckRow={dataCheckRow}
      />

      {/* breadcrumb */}
      < BreadCrumb
        items={["INICIO", "VENTAS", 'SEGUIMIENTO', "SEGUIMIENTO ORGANIZACIÓN"]}
        baseURL={["/", "nexos/ventasconfirmaciones", 'nexos/seguimiento', "nexos/seguimientoorganizacion"]}
      />
      {/* Component Title */}
      < TitleComponent
        title={"SEGUIMIENTO ORGANIZACIÓN"}
        subtitle="CONJUNTO RESIDENCIAL CASTILLA RESERVADO"
        align="center"
      />
      <hr />
      <Row className="w-100 text-uppercase mt-4">
        <Col xs={12} sm={12} md={12} lg={3} xl={3}>
          <Row>
            <p>
              <b className="text-uppercase">Estado: </b>{" "}
              <span className="text-uppercase ms-2">
                <Badge className={statusBadgeClass}>
                  {!!dataCheckRow ? dataCheckRow.status : null}
                </Badge>
              </span>
            </p>
          </Row>
          <Row>
            <p>
              <b className="text-uppercase">Encargado: </b> {" "}  <span className="text-uppercase ms-2">{!!dataCheckRow ? dataCheckRow.contact_person : null}</span>
            </p>{" "}
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3} xl={3}>
          <Row>
            <p>
              <b className="text-uppercase">Telefono: </b> {" "}  <span className="text-uppercase ms-2">{!!dataCheckRow ? telefonoFormateado : null}</span>
            </p>{" "}
          </Row>
          <Row>
            <p>
              <b className="text-uppercase">Correo: </b> {" "} <span className="text-capitalize ms-2">{!!dataCheckRow ? dataCheckRow.email : null}</span>
            </p>{" "}
          </Row>
        </Col>
      </Row>
      
      {/* Component Table */}
      <Row className="w-100">
        <Col sm={12} xl={7} xxl={8}>
          <Form.Select
            aria-label="Default select example"
            value={selectedFilter}
            onChange={handleChangeFilterSelect}
          >
            <option value="Mostrar todos">Mostrar todos</option>
            {dataSelect.map((item: any) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <BasicDataTable
            data={filteredData}
            columns={columns}
            searchFilter={false}
          />
        </Col>
        <Col className="d-flex flex-column" sm={12} xl={5} xxl={5}>
          <Row className="text-capitalize d-flex justify-content-center gap-2">
            <Col xs={12} sm={12} md={12} lg={5} xl={5}>
              <Row className="">
                <Button className="w-100 mb-2" onClick={() => setShowModalSeguimiento(true)} disabled={selectedRowId ? false : true}>
                  Mensaje
                </Button>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={12} lg={5} xl={5}>
              <Row className="">
                <Button className="w-100 mb-2" onClick={handleSendMail} disabled={selectedRowId ? false : true} >Enviar Correo</Button>
              </Row>
            </Col>
          </Row>
          <Row className="my-2">
            <Col xs={10}>
              <Form.Select
                aria-label="Default select example"
                value={selectedOption}
                onChange={handleChangeSelect}
                disabled={selectedRowId ? false : true}
              >
                <option value="">Selecciona una opción</option>
                {dataSelect.map((item: any) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={2}>
              <Row className="text-capitalize d-flex justify-content-center gap-2">
                <Button
                  className="w-100 mb-2 "
                  onClick={handleEdit}
                  disabled={selectedRowId && selectedOption ? false : true}
                >
                  <svg
                    width={20}
                    className="p-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </Button>
              </Row>
            </Col>
          </Row>
          {
            !lastMessage() || !lastMessage().message ? (
              <Card className="p-4 text-center">
                <h4 className="text-center">No tienes mensajes</h4>
              </Card>
            ) : (
              <>
                {/*  card message  */}
                <Button
                  className="mb-3"
                  onClick={() => setShowModalMensajes(true)}
                  disabled={selectedRowId ? false : true}
                >
                  Todos los mensajes
                </Button>
                {priority1Messages && priority1Messages.length > 0 ? (
                  <>
                    <b>Notas Prioritarias</b>
                    <Alert variant={'danger'}>
                      <div className="d-flex flex-column">
                        {priority1Messages.slice(-4).map((m: any) => (
                          <div key={m.id}>
                            <b>Usuario:</b>{" "}
                            <h6 className="text-capitalize">
                              {m.name} - {dayjs(m.created_at).format("DD-MM-YYYY - HH:mm A")}
                            </h6>
                            <b>Nota: </b>
                            {showFullNote ? (
                              <div>
                                <p>{m.message}</p>
                                <div className="text-end">
                                  <Button
                                    variant="link"
                                    className="btn-message-hover"
                                    onClick={handleVerMenosClick}
                                  >
                                    Ver menos
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="mb-2">
                                <p>
                                  {m.message.length > 100
                                    ? m.message.slice(0, 100) + "..."
                                    : m.message}
                                </p>
                                {m.message.length > 100 && (
                                  <div className="text-end">
                                    <Button
                                      variant="link"
                                      className="btn-message-hover"
                                      onClick={() => handleVerClick(m)}
                                    >
                                      Ver más
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </Alert>
                  </>
                ) : null}
                <Card className="pt-4 pb-1 px-4 mb-3">
                  <span className="mb-2">
                    <b>Usuario:</b>{" "}
                    <p>
                      {messageName ? messageName : lastMessage().name} -{" "}
                      {dayjs(lastMessage().created_at).format("DD-MM-YYYY - HH:mm A")}
                    </p>
                  </span>
                  <span>
                    <b>Nota:</b>
                  </span>
                  {showFullNote ? (
                    <div>
                      <p>{lastMessage().message}</p>
                      <div className="text-end">
                        <Button
                          variant="link"
                          className="btn-message-hover"
                          onClick={handleVerMenosClick}
                        >
                          Ver menos
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-2">
                      <p>
                        {lastMessage().message.length > 100
                          ? lastMessage().message.slice(0, 100) + "..."
                          : lastMessage().message}
                      </p>
                      {lastMessage().message.length > 100 && (
                        <div className="text-end">
                          <Button
                            variant="link"
                            className="btn-message-hover"
                            onClick={() => handleVerClick(lastMessage())}
                          >
                            Ver más
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </>
            )}
        </Col >
        <div className="w-100 d-flex justify-content-end">
          <Link
            to={`${process.env.PUBLIC_URL}/nexos/seguimiento`}
          >
            <Button>Volver</Button>
          </Link>
          <Button
            className="ms-2"
            onClick={handleSendMessage}
            disabled={selectedRowId ? false : true}
          >Agendar</Button>
        </div>
      </Row >
    </>
  );
};

export default SeguimientoOrganizacion;
