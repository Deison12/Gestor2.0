import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import {
  TitleComponent,
  BreadCrumb,
  BasicDataTable,
  ConfirmationCardButton,
} from "../../Global";
import { useFetch } from "../../hooks";

/* Interfaces */
export interface Content {
  id: number;
  name: string;
  status_id: number;
}
function capitalizeWords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
/* Columns for the Data Table */
export const columns: any[] = [
  {
    Header: "#",
    accessor: "",
    className: "wd-20p borderrigth",
    Cell: ({ row }: { row: any }) => {
      const { index } = row;
      // Adding 1 to the index to display the number starting from 1 instead of 0
      const consecutiveNumber = index + 1;
      return <span>{consecutiveNumber}</span>;
    },
  },
  {
    Header: "Nombre",
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
    Header: "Editar",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      console.log(row.original);

      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/estadocotizacion`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      );
    },
  },
];

const ListQuoteState = () => {
  // State to store the data for the Data Table
  const [data, setData] = useState<Content[]>([]);
  const { getAllData, isLoading, error } = useFetch();

  // Fetch the profiles data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch profile data from the server
  const fetchData = async () => {
    try {
      const newData = await getAllData("api/quoteStatus/list");
      setData(newData);
    } catch (error) {
      console.log("Error fetching profiles:", error);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "lista estados cotizacion"]}
        baseURL={["inicio", "listaestadoscotizacion"]}
      />

      {/* Component Title */}
      <TitleComponent title={"LISTA DE ESTADOS DE COTIZACIONES"} />

      {error && (
        <ConfirmationCardButton
          baseURL="#"
          title="Error"
          subtitle={`${error?.message}`}
        />
      )}

      {
        /* Data Grid Table */
        !error && (
          <BasicDataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            addButtonLink={`${process.env.PUBLIC_URL}/nexos/estadocotizacion`}
          />
        )
      }
    </div>
  );
};

export default ListQuoteState;
