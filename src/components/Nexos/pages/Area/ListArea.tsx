

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
        Header: "Area",
        accessor: "name",
        className: "wd-25p borderrigth",
        Cell: ({ value }: { value: string }) => <span>{value.toUpperCase()}</span>,
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
                    to={`${process.env.PUBLIC_URL}/nexos/creararea`}
                    state={row.original}
                >
                    <span className="material-icons md-5 md-dark">&#xe3c9;</span>
                </Link>
            )
        },
    }
]

const ListArea = () => {
    //geting data
    const [data, setData] = useState<any>([]);
    const { getAllData, isLoading, error } = useFetch();

    useEffect(() => {
        const getData = async () => {
            try {
                const response: Response = await getAllData('api/services/types');
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
                items={['inicio', 'agendamiento', 'lista de areas']}
                baseURL={['inicio', 'nexos/agendamiento', 'nexos/listaareas']}
            />

            {/* Component Title */}
            <TitleComponent
                title={'LISTA DE AREAS'}
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
                        addButtonLink={`${process.env.PUBLIC_URL}/nexos/creararea`}
                        isLoading={isLoading}
                    />
                )
            }

        </div>
    )
}

export default ListArea;