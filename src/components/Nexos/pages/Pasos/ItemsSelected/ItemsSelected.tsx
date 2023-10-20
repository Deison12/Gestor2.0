import { useEffect, useState } from "react";
import { TitleComponent, BreadCrumb, BasicDataTable } from "../../../Global";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { Button } from "react-bootstrap";
import { useTokenQuoteCheck } from "../../../hooks";
import { formatNumber } from "../../../../../helpers";

const Paso4 = () => {
  const storageQuoteId = localStorage.getItem("form1-ID");
  //geting data
  const [data, setData] = useState<any>({
    quoteId: storageQuoteId,
    items: []
  });
  const location: any = useLocation();
  const navigate: any = useNavigate();
  const { handlerRedirect } = useTokenQuoteCheck();
  const { postData } = useFetch();
  const create_quote_id = localStorage.getItem('create_quote_id');
  const client_id = localStorage.getItem('form_client_id');

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
      Header: "Nombre",
      accessor: "name",
      className: "wd-25p borderrigth",
      Cell: ({ value }: { value: string }) => (
        <span>{value.toUpperCase()}</span>
      ),
    },
    {
      Header: "Cantidad",
      accessor: "value",
      className: "wd-20p borderrigth",
    },
    {
      Header: "Precio",
      accessor: "price",
      className: "wd-20p borderrigth",
      Cell: ({ value }: { value: string }) => (
        <span>
          { `$ ${formatNumber(value, 2)}` }
        </span>
      ),
    },
    {
      Header: "Quitar",
      accessor: "",
      className: "wd-15p borderrigth",
      // Custom cell rendering for the "Accion" column with a link to edit the profile
      Cell: ({ row }: { row: any }) => {
        const handleDelete = (id: number) => {
          const filteredData = data?.items.filter(
            (item: any) => item.item_id !== id
          );
          setData((prev: any) => ({
            ...prev,
            items: [...filteredData]
          }));
        };
        return (
          <div
            className="d-flex align-items-center gap-1"
            onClick={() => handleDelete(row?.original?.item_id)}
          >
            <span className="material-icons md-5 md-dark cursor-pointer">&#xe872;</span>
            Quitar
          </div>
        );
      },
    },
  ];

  const handlerRedirects = () => {
    if (!location.state.items || location.state.items.length === 0) {
      navigate(`${process.env.PUBLIC_URL}/nexos/seleccionarserviciosacotizar`);
    }
    handlerRedirect(storageQuoteId);
  }

  useEffect(() => {
    handlerRedirects();
    const getData = async () => {
      const response = location?.state?.items;
      setData((prev: any) => ({
        ...prev,
        items: [...response]
      }));
    };
    getData();
  }, [location, storageQuoteId]);

  const handleSubmit = async () => {
    const form_quote_id = localStorage.getItem("form_quote_id");

    const newArray = data?.items.map((item: any) => ({
      item_id: Number(item.item_id),
      value: Number(item.value),
      discount: 0,
      is_discount_percentage: 0
    }));

    const body = {
      quote_id: create_quote_id ? create_quote_id : form_quote_id,
      client_id: client_id,
      items: newArray
    };

    try {
      await postData(body, "quotes/items/save");
      navigate(`${process.env.PUBLIC_URL}/nexos/cotizacionpdf`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['INICIO', 'VENTAS', 'LISTA COTIZACIONES', "vista previa"]}
        baseURL={['inicio', 'nexos/ventasconfirmaciones', 'COTIZACIONES', "nexos/listarusuarios"]}

      />
      {/* Component Title */}
      <TitleComponent
        title={"PASO 4"}
        subtitle="ITEMS SELECCIONADOS"
        align="center"
      />
      {/* Data Grid Table */}
      <BasicDataTable
        columns={columns}
        data={data?.items}
        addButtonLink={`${process.env.PUBLIC_URL}/nexos/seleccionarserviciosacotizar`}
        btnText="MODIFICAR ITEMS"
        addButtonState={data}
      />

      <div className="w-100 d-flex justify-content-end mb-5">
        <Button onClick={handleSubmit} style={{}} className="btn btn-primary d-none d-md-block">
          GUARDAR ITEMS
        </Button>
      </div>
    </div>
  );
};

export default Paso4;
