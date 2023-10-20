import { useEffect, useState } from "react";
import {
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TitleComponent, BreadCrumb, BasicDataTable, ConfirmationCardButton } from "../../../Global";
import { useFetch } from "../../../hooks/useFetch";

function capitalizeWords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
/* Columns for the Data Table */
const columns: any[] = [
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
    Header: "Tipo de agendamiento",
    accessor: "name",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => (
      <span>{capitalizeWords(value)}</span>
    ),
  },
  {
    Header: "Estado",
    accessor: "status_id",
    className: "wd-20p borderrigth",
    // Custom cell rendering to display status as a Chip component
    Cell: ({ value }: { value: number }) =>
      value === 1 ? (
        <Chip label="Activo" color="success" variant="outlined" />
      ) : (
        <Chip label="Inactivo" color="error" variant="outlined" />
      ),
  },
  {
    Header: "Acción",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/tipoagendamiento`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      );
    },
  },
];

const ListTypesScheduling = () => {
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await getAllData("api/residential/scheduling/type/list/all");
        setData(response);
      } catch (error) {
        console.log("error", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "lista de tipos de agendamiento"]}
        baseURL={["inicio", "nexos/listatiposagendamiento"]}
      />
      {/* Component Title */}
      <TitleComponent title={"LISTA DE TIPOS DE AGENDAMIENTO"} />
      {
        (error) && (
          <ConfirmationCardButton
            baseURL='#'
            title='Error'
            subtitle={`${error?.message}`}
          />
        )
      }
      {
        /* Data Grid Table */
        (!error) && (
          <BasicDataTable
            columns={columns}
            data={data}
            addButtonLink={`${process.env.PUBLIC_URL}/nexos/tipoagendamiento`}
            isLoading={isLoading}
          />
        )
      }
    </div>
  );
};

export default ListTypesScheduling;
