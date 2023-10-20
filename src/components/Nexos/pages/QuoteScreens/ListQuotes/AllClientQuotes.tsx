import { Link, useNavigate, useParams } from "react-router-dom";
import {
  TitleComponent,
  BreadCrumb,
  BasicDataTable,
  ConfirmationCardButton,
} from "../../../Global";
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import dayjs from "dayjs";


const AllClientQuotes = () => {
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();
  const { id }: any = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      Header: "#",
      accessor: "quote_id",
      className: "text-center",
    },
    {
      Header: "Conjunto",
      accessor: "name",
      className: "text-center",
    },
    {
      Header: "Nit",
      accessor: "nit",
      className: "text-center",
    },
    {
      Header: "Consecutivo",
      accessor: "number",
      className: "text-center",
    },
    {
      Header: "Fecha creación",
      accessor: "created_at",
      className: "text-center",
      Cell: ({ value }: any) => {
        return <p>{dayjs(value).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      Header: "Estado",
      accessor: "status",
      className: "text-center",
    },
    {
      Header: "Ver/Editar",
      accessor: "",
      Cell: ({ row }: { row: any }) => {
        const redirect = () => {
          localStorage.setItem("form_nit", row?.original?.nit);
          localStorage.setItem("form1-ID", row?.original?.quote_type_id);
          localStorage.setItem("form_client_id", row?.original?.id);
          localStorage.setItem("form_quote_id", row?.original?.quote_id);
          navigate(`${process.env.PUBLIC_URL}/nexos/cotizacionformulario`, {
            state: row.original,
          });
        };
        return (
            <span onClick={redirect} className="material-icons md-3 md-dark cursor-pointer">&#xe873;</span>
        );
      },
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response: Response = await getAllData(`api/quotes/client/${id}`);
        setData(response);
      } catch (error) {
        console.log("error => ", error);
      }
    };

    if (!!id) {
      getData();
    }
  }, [id]);

  return (
    <div>
      {/* breadcrumb */}
      <BreadCrumb
        items={["INICIO", "COTIZACIONES CLIENTE"]}
        baseURL={["inicio", "COTIZACIONES CLIENTE"]}
      />
      {/* Title */}
      <TitleComponent title="COTIZACIONES CLIENTE" />

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
            addButtonLink={`${process.env.PUBLIC_URL}/nexos/cotizar`}
            isLoading={isLoading}
          />
        )
      }
    </div>
  );
};

export default AllClientQuotes;
