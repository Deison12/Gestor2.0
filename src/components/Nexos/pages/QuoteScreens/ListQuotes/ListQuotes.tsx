import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../../../hooks/useFetch';
import { useEffect, useState } from "react";

import { TitleComponent, BreadCrumb, BasicDataTable, Loader } from '../../../Global';
import { Button, Card, Form } from "react-bootstrap";

// GlobalFilter component
const GlobalFilter = ({ search, setSearch, hasAddButton, getData }: any) => {
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      getData();
    }
  }
  return (
    <span className={`d-flex ${hasAddButton ? 'w-75' : 'w-100'}`}>
      <Form.Control value={search || ""} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} className="form-control mb-4" placeholder="Busca tus cotizaciones..." />
    </span>
  );
};

const SearchBtn = ({ search, setSearch, addButtonLink = true, getData }: any) => {
  const handleConsultClick = () => {
    localStorage.removeItem('form_nit');
    localStorage.removeItem('form_quote_id');
    localStorage.removeItem('form_client_id');
    localStorage.removeItem('create_quote_id');
    getData();
  };
  const handleAddClick = () => {
    localStorage.removeItem('form_nit');
    localStorage.removeItem('form_quote_id');
    localStorage.removeItem('form_client_id');
    localStorage.removeItem('form1-ID');
    localStorage.removeItem('create_quote_id');
  };
  return (
    <Card>
      <Card.Body className="p-0 px-2 pt-4">
        <div className="d-flex justify-content-evenly">
          {/* Global filter component */}
          <GlobalFilter search={search} setSearch={setSearch} getData={getData} hasAddButton={"!!addButtonLink"} />
          {/* AddButton */}
          <Link onClick={handleConsultClick} to={""} state={""} className="text-muted">
            <p className="btn btn-primary d-block d-md-none p-2 px-3 h5"> 🔍︎ </p>
            <Button  className="btn btn-primary d-none d-md-block w-100">
              CONSULTAR
            </Button>
          </Link>
          {/* RedirectButton */}
          <Link onClick={handleAddClick} to={`${process.env.PUBLIC_URL}/nexos/cotizar`} state={""} className="text-muted">
            <p className="btn btn-primary d-block d-md-none p-2 px-3 h5">+</p>
            <Button  className="btn btn-primary d-none d-md-block w-100">
              AGREGAR
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  )
}

const ListQuotes = () => {

  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [firstQuery, setFirstQuery] = useState(false);
  const { postData, isLoading } = useFetch();
  const navigate = useNavigate();

  const columns = [
    {
      Header: '#',
      accessor: 'id',
      className: 'text-center',
    },
    {
      Header: 'Conjunto',
      accessor: 'name',
      className: 'text-center',
    },
    {
      Header: 'Nit',
      accessor: 'nit',
      className: 'text-center',
    },
    {
      Header: 'Consecutivo',
      accessor: 'number',
      className: 'text-center',
    },
    {
      Header: 'Estado',
      accessor: 'status',
      className: 'text-center',
    },
    {
      Header: 'Ver',
      accessor: '',
      Cell: ({ row }: { row: any }) => {
        const redirect = () => {
          localStorage.setItem("form_nit", row?.original?.nit);
          localStorage.setItem("form1-ID", row?.original?.quote_type_id);
          localStorage.setItem("form_client_id", row?.original?.id);
          localStorage.setItem("form_quote_id", row?.original?.quote_id);

          navigate(`${process.env.PUBLIC_URL}/nexos/cotizacionpdf`, {
            state: row?.original
          });
        }
        return (
            <span onClick={redirect} className="cursor-pointer material-icons md-3 md-dark">&#xf88c;</span>
        )
      },
    },

    {
      Header: 'Mas',
      accessor: '',
      Cell: ({ row }: { row: any }) => {
        return (
          <Link
            to={`${process.env.PUBLIC_URL}/nexos/cotizacionescliente/${row.original.id}`}
          >
            <span className="material-icons md-5 md-dark cursor-pointer">&#xe145;</span>
          </Link>
        )
      },
    },
  ];

  const getData = async () => {
    const body: any = {
      "criteria": search
    };
    try {
      const response: Response = await postData(body, 'quotes/clients/criteria');
      setData(response);
      setFirstQuery(true);
    } catch (error) {
      console.log('error => ', error)
    }
  }

  return (
    <div>
      {/* breadcrumb */}
      <BreadCrumb
        items={['INICIO', 'VENTAS', 'LISTA COTIZACIONES']}
        baseURL={['inicio', 'nexos/ventasconfirmaciones', 'COTIZACIONES']}
      />
      {/* Title */}
      <TitleComponent
        title='LISTA COTIZACIONES'
      />

      {/* search */}
      <SearchBtn search={search} setSearch={setSearch} getData={getData} />
      {/* BasicDataTable */}
      <div>
        {
          (isLoading) && (<Loader />)
        }
        {
          (!isLoading && data.length > 0) && ((<BasicDataTable data={data} columns={columns} addButtonLink={`${process.env.PUBLIC_URL}/nexos/cotizar`} searchFilter={false} />))
        }
        {
          (!isLoading && data.length === 0 && firstQuery) && (
            <span className="d-flex justify-content-center">No se encontraron cotizaciones en la búsqueda</span>
          )
        }
      </div>


    </div>
  );
};

export default ListQuotes;