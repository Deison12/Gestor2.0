import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { TitleComponent, BreadCrumb, BasicDataTable, ConfirmationCardButton } from "../../../Global";
import { useFetch } from "../../../hooks/useFetch";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/* Columns for the Data Table */
const columns: any[] = [
  {
    Header: "#",
    accessor: "",
    className: "wd-10p borderrigth",
    Cell: ({ row }: { row: any }) => {
      const { index } = row;
      const consecutiveNumber = index + 1;
      return <span>{consecutiveNumber}</span>;
    },
  },
  {
    Header: "Cliente",
    accessor: "residential_name",
    className: "wd-25p borderrigth",
  },
  {
    Header: "Fecha de agendamiento",
    accessor: "demo_date",
    className: "wd-25p borderrigth",
    Cell: ({ value }: any) => {
      return <p>{dayjs(value).format("DD/MM/YYYY")}</p>;
    },
  },
  {
    Header: "Tipo de agendamiento",
    accessor: "schedule_type",
    className: "wd-25p borderrigth",
  },
  {
    Header: "Agendado por",
    accessor: "user_name",
    className: "wd-20p borderrigth",
  },
  {
    Header: "Acción",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/visitasdemosreunionesform`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      );
    },
  },
];

const VisitsDemosMeetings = () => {
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();
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
      setEndDate(valueEndDate);
    } else {
      setEndDate(valueEndDate);
    }
  };
  

  // Efecto para obtener los datos al cargar el componente
  const getData = async () => {
    try {
      const newStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const newEndDate = dayjs(endDate).format("YYYY-MM-DD");
      const response: any = await getAllData(`api/residential/demoScheduling/list/${newStartDate}/${newEndDate}`);
      console.log({response})
      setData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Efecto para filtrar los datos por fecha
  useEffect(() => {
    if (dayjs(startDate).isValid() && dayjs(endDate).isValid() && (dayjs(startDate).isBefore(endDate) || dayjs(startDate).isSame(endDate, "date"))) {
      // && dayjs(endDate).isValid() && dayjs(endDate).isBefore(startDate)
      getData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "lista visitas, demos, reuniones"]}
        baseURL={["inicio", "nexos/visitasdemosreuniones"]}
      />
      {/* Component Title */}
      <TitleComponent title={"VISITAS, DEMOS, REUNIONES"} />
      {
        (error) && (
          <ConfirmationCardButton
            baseURL='#'
            title='Error'
            subtitle={`${error?.message}`}
          />
        )
      }

      <div>
        <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            className="ms-3 text-primary"
            label="Fecha Desde"
            inputFormat="DD/MM/YYYY"
            value={startDate || dayjs()}
            onChange={(newValue) => handleStartDate(newValue)} // Modifica esta línea
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider style={{ height: 10 }} dateAdapter={AdapterDayjs}  >
          <DesktopDatePicker
            className="ms-3 text-primary"
            label="Fecha Hasta"
            inputFormat="DD/MM/YYYY"
            value={endDate || dayjs()}
            onChange={(newValue) => handleEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      {
        /* Data Grid Table */
        <BasicDataTable
          columns={columns}
          data={data}
          addButtonLink={`${process.env.PUBLIC_URL}/nexos/visitasdemosreunionesform`}
          isLoading={isLoading}
          exceptionTitleText='Por favor, selecciona un rango de fechas para mostrar los datos'
          exceptionSubtitleText=''
        />
      }
    </div>
  );
};

export default VisitsDemosMeetings;
