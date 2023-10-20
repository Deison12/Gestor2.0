import { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import { TitleComponent, BreadCrumb, BasicDataTable, ConfirmationCardButton } from '../../Global'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ItemBilling } from './ListBillings.interface';


const ListBillings = () => {
  //geting data
  const [data, setData] = useState<ItemBilling[]>([]);
  const [meetingTypes, setMeetingTypes] = useState([]);

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "month"));

  const [dateSelected, setDateSelected] = useState<boolean>(false); // Nuevo estado

  // Función para manejar cambios en las fechas de inicio
  const handleStartDate = (valueStartDate: Dayjs | null) => {
    //const inputDate = e.target.value;
    // Validar la fecha de inicio aquí
    if (!dayjs(valueStartDate).isValid()) {
      //setError('La fecha de inicio no es válida');
    } else {
      //setError('');
      setStartDate(valueStartDate);
    }
  };

  // Función para manejar cambios en las fechas de hasta
  const handleEndDate = (valueEndDate: Dayjs | null) => {
    if (!dayjs(valueEndDate).isValid()) {

    } else if (dayjs(endDate).isBefore(startDate)) {
      
    } else {
      setEndDate(valueEndDate);
    }
  };

  const { getAllData, isLoading, error } = useFetch();

  const getData = async () => {
    try {
      // 2022-08-06
        const newStartDate = dayjs(startDate).format("YYYY-MM-DD");
        const newEndDate = dayjs(endDate).format("YYYY-MM-DD");
        const response: any = await getAllData(`api/sales/order/billing/list/${newStartDate}/${newEndDate}`);
        setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (dayjs(startDate).isValid() && dayjs(endDate).isValid() && dayjs(startDate).isBefore(endDate)) {
      // && dayjs(endDate).isValid() && dayjs(endDate).isBefore(startDate)
      getData();
    }
  }, [startDate, endDate]);

  /* Columns for the Data Table */
const columns: any[] = [
  {
    Header: "N°",
    accessor: "",
    className: "wd-5p borderrigth",
    Cell: ({ row }: { row: any }) => {
      const { index } = row;
      const consecutiveNumber = index + 1;
      return <span>{consecutiveNumber}</span>;
    },
  },
  {
    Header: "Conjunto",
    accessor: "client_name",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "NIT",
    accessor: "nit",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Administrador",
    accessor: "contact_name",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Telefono",
    accessor: "contact_phone",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Tipo de asamblea",
    accessor: "meeting_type",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Hr. Registro",
    accessor: "meeting_time_register",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Hr. Inicio",
    accessor: "meeting_time_init",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Estado cotización",
    accessor: "status",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value}</span>,
  },
  {
    Header: "Estado reserva",
    accessor: "booking_status",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span className='text-capitalize'>{value}</span>,
  },
  {
    Header: "Estado nota contable",
    accessor: "accountable_status",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span className='text-capitalize'>{value}</span>,
  },
  {
    Header: "VERIFICA",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/verificaciones`}
          state={row.original}
        >
          <button className='btn btn-primary w-100 d-flex justify-content-center'>
            <span className="material-icons md-5 md-dark">&#xe2e6;</span>
          </button>
        </Link>
      )
    },
  }
]

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['inicio', 'configuraciones', 'facturacion']}
        baseURL={['inicio', 'nexos/configuraciones', 'nexos/facturaciones']}
      />

      <Row className='d-flex align-items-end gap-2 gap-md-0'>
      <Col className='d-flex justify-content-sm-center justify-content-md-start flex-item order-2 order-md-1' xs={12} sm={12} md={4} lg={4} xl={4}>
      <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            disablePast
            className="ms-3 text-primary w-100"
            label="Fecha Desde"
            inputFormat="DD/MM/YYYY"
            value={startDate || dayjs()}
            onChange={(newValue) => handleStartDate(newValue)} // Modifica esta línea
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            disablePast
            className="ms-3 text-primary w-100"
            label="Fecha Hasta"
            inputFormat="DD/MM/YYYY"
            value={endDate || dayjs()}
            onChange={(newValue) => handleEndDate(newValue)} // Modifica esta línea
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Col>

        <Col className='flex-item order-1 order-md-2' xs={12} sm={12} md={4} lg={4} xl={4}>
        {/* Component Title */}
      <TitleComponent
        title={'FACTURACIÓN'}
        align='center'
      />
        </Col>
      </Row>

{
        (error) && (
          <ConfirmationCardButton
          baseURL='#'
          title='Error'
          subtitle={`${error?.message}`}
        />
        )
      }


      {/* Data Grid Table */}
      {
        (!error) && (
          <BasicDataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          exceptionTitleText='Por favor, selecciona un rango de fechas para mostrar los datos'
          exceptionSubtitleText=''
        />
        )
      }

    </div>
  )
}

export default ListBillings;
/* 06/08/2022 */
