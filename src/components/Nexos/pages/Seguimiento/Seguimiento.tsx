
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { BasicDataTable, TitleComponent, BreadCrumb } from '../../Global';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { useFetch } from '../../hooks';

const Seguimiento = () => {
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getAllData, isLoading } = useFetch();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "month"));
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const handleInitialChange = (valueStartDate: Dayjs | null, valueEndDate: Dayjs | null) => {
    const filteredData = data.filter((item: any) => {
      return (new Date(dayjs(valueStartDate).format("MM/DD/YYYY")).getTime() <= new Date(dayjs(item.meeting_date).format("MM/DD/YYYY")).getTime()) && (new Date(dayjs(valueEndDate).format("MM/DD/YYYY")).getTime() >= new Date(dayjs(item.meeting_date).format("MM/DD/YYYY")).getTime())
    });
    setStartDate(valueStartDate!);
    setEndDate(valueEndDate!)
    setFilteredData(filteredData);
  };

  // Función para manejar cambios en las fechas de inicio
  const handleStartDate = (valueStartDate: Dayjs | null) => {
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
      setEndDate(valueEndDate);
    } else {
      setEndDate(valueEndDate);
    }
  };

  const columns = [
    {
      Header: "#",
      accessor: "",
      className: "wd-10p borderrigth",
      Cell: ({ row }: { row: any }) => {
        const { index } = row;
        // Adding 1 to the index to display the number starting from 1 instead of 0
        const consecutiveNumber = index + 1;
        return <span>{consecutiveNumber}</span>;
      },
    },
    {
      Header: 'Conjunto',
      accessor: 'name',
    },
    {
      Header: 'Nit',
      accessor: 'nit',
    },
    {
      Header: 'Consecutivo',
      accessor: 'email',
    },
    {
      Header: 'Fecha Asamblea',
      accessor: 'meeting_date',
      Cell: ({ value }: { value: any }) => {
        return (
          <span>{
            value === "None"
              ? "NA"
              : dayjs(value).format("DD/MM/YYYY")
          }</span>
        )
      }
    },
    {
      Header: 'Estado',
      accessor: 'status',
    },
    {
      Header: 'Fecha Seguimiento',
      accessor: 'created_at',
      Cell: ({ value }: { value: any }) => {
        return (
          <span>{
            value === "None"
              ? "NA"
              : dayjs(value).format("DD/MM/YYYY")
          }</span>
        )
      }
    },
    {
      Header: 'Seguimiento',
      accessor: 'seguimiento',
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            to={`${process.env.PUBLIC_URL}/nexos/seguimientoorganizacion`}
            state={row.original.id}
          >
            <span className="material-icons md-5 md-dark">&#xe3c9;</span>
          </Link>
        )
      }
    },
  ];

  const getData = async () => {
    try {
      const newStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const newEndDate = dayjs(endDate).format("YYYY-MM-DD");
      const response: any = await getAllData(`api/quotes/followup/list/${newStartDate}/${newEndDate}`);
      setFilteredData(response);
      setData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (dayjs(startDate).isValid() && dayjs(endDate).isValid() && (dayjs(startDate).isBefore(endDate) || dayjs(startDate).isSame(endDate, "date"))) {
      // && dayjs(endDate).isValid() && dayjs(endDate).isBefore(startDate)
      getData();
    }
  }, [startDate, endDate]);
  return (
    <div>
      {/* breadcrumb */}
      <BreadCrumb
        items={["INICIO", "VENTAS", 'SEGUIMIENTO']}
        baseURL={["/", "nexos/ventasconfirmaciones", ""]}
      />
      {/* Component Title */}
      <TitleComponent
        title={'MODULO DE SEGUIMIENTO'}
        align='center'
      />

      <div>
        <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            className="ms-3 text-primary"
            label="Fecha Desde"
            inputFormat="DD/MM/YYYY"
            value={startDate || dayjs()}
            onChange={(newValue) => handleInitialChange(newValue, endDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            className="ms-3 text-primary"
            label="Fecha Hasta"
            inputFormat="DD/MM/YYYY"
            value={endDate || dayjs()}
            onChange={(newValue) => handleInitialChange(startDate, newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      {/* Component Table */}
      <BasicDataTable
        data={filteredData}
        columns={columns}
        /* filter date */
        isLoading={isLoading}
      />
    </div>
  );
}

export default Seguimiento;