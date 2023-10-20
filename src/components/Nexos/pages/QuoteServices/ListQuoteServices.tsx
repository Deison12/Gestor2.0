import { Avatar, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Response } from "../../Interfaces/Pages/Item.interface";
import {
  BasicDataTable,
  BreadCrumb,
  ConfirmationCardButton,
  TitleComponent,
} from "../../Global";
import { useEffect, useState } from "react";

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
    Header: "Foto",
    accessor: "photo",
    className: "wd-10p borderrigth",
    Cell: ({ value }: any) => <Avatar alt="User Avatar" src={value} />,
  },
  {
    Header: "Nombre",
    accessor: "name",
    className: "wd-25p borderrigth",
    Cell: ({ value }: { value: string }) => <span>{value.toUpperCase()}</span>,
  },
  {
    Header: "Descripción",
    accessor: "description",
    className: "wd-20p borderrigth",
  },
  {
    Header: "Indicativo",
    accessor: "custom_identifier",
    className: "wd-20p borderrigth",
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
    Header: "Accion",
    accessor: "",
    className: "wd-15p borderrigth",
    // Custom cell rendering for the "Accion" column with a link to edit the profile
    Cell: ({ row }: { row: any }) => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/nexos/editarserviciocotizar/${row.id}`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      );
    },
  },
];

const ListQuoteServices = () => {
  //geting data
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: Response = await getAllData("api/quoteTypes");
        setData(response);
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={["inicio", "Configuraciones", "lista Servicios a Cotizar"]}
        baseURL={["inicio", "nexos/configuraciones", "listarservicioscotizar"]}
      />

      {/* Component Title */}
      <TitleComponent title={"lista Servicios a Cotizar"} />

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
            addButtonLink={`${process.env.PUBLIC_URL}/nexos/crearserviciocotizar`}
            isLoading={isLoading}
          />
        )
      }
    </div>
  );
};

export default ListQuoteServices;
