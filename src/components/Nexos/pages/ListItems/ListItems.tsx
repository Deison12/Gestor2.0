import { useEffect, useState } from 'react'
import { Chip, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Response } from '../../Interfaces/Pages/Item.interface';

import { TitleComponent, BreadCrumb, BasicDataTable, ConfirmationCardButton } from '../../Global'
import { formatNumber } from '../../../../helpers';

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
    Cell: ({ value }: { value: string }) => <span>{value.toUpperCase()}</span>,
  },
  {
    Header: "Tipo Cotización",
    accessor: "quotes",
    className: "wd-20p borderrigth",
    Cell: ({ value }: { value: any }) => {
      const [quoteId, setQuoteId] = useState(!value[0]?.quote_type_id ? 0 : value[0]?.quote_type_id);
      const handleChange = (event: SelectChangeEvent) => {
        setQuoteId(event.target.value);
      };

      return (
        (value === null || value.length === 0 || !value) ? (
          <span className='text-danger'>Sin Tipo de Cotización</span>
        ) : (
          <FormControl variant="standard" sx={{ minWidth: 130, width: '100%' }}>
            <Select
              labelId="profiles-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Perfiles"
              sx={{ color: "success.main" }}
              value={quoteId}
              onChange={handleChange}
            >
              {
                value?.map((profile: any) => (
                  <MenuItem key={profile.quote_type_id} value={profile.quote_type_id}> {profile.quote_name} </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        )
      )
    },
  },
  {
    Header: "Valor",
    accessor: "price",
    className: "wd-20p borderrigth",
    Cell: ({ value, row }: { value: string; row: any }) => (
      <span>
        {`$ ${formatNumber(value, 2)}`}
      </span>
    ),
  },
  {
    Header: "Estado",
    accessor: "status_id",
    className: "wd-20p borderrigth",
    // Custom cell rendering to display status as a Chip component
    Cell: ({ value }: { value: number }) => (
      value === 1 ? (
        <Chip label="Activo" color="success" variant="outlined" />
      ) : (
        <Chip label="Inactivo" color="error" variant="outlined" />
      )
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
          to={`${process.env.PUBLIC_URL}/nexos/editaritem`}
          state={row.original}
        >
          <span className="material-icons md-5 md-dark">&#xe3c9;</span>
        </Link>
      )
    },
  }
]

const ListItems = () => {
  //geting data
  const [data, setData] = useState<any>([]);
  const { getAllData, isLoading, error } = useFetch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: Response = await getAllData('api/itemPrice');
        setData(response);
      } catch (error) {
      }
    }
    getData();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={['inicio', 'Configuraciones', 'lista Items']}
        baseURL={['inicio', 'nexos/configuraciones', 'nexos/listaitems']}
      />

      {/* Component Title */}
      <TitleComponent
        title={'LISTA DE ITEMS'}
      />

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
          addButtonLink={`${process.env.PUBLIC_URL}/nexos/crearitem`}
          isLoading={isLoading}
        />
        )
      }

    </div>
  )
}

export default ListItems;