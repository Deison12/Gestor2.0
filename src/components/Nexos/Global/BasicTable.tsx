import { Button, Card, Col, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    useTable, useGlobalFilter
} from "react-table";

interface TableProps {
    data: any[];
    columns: any[];
    addButtonLink: string;
}

export const BasicTable: React.FC<TableProps> = ({ data, columns, addButtonLink }) => {
    const tableInstance = useTable(
        {
            columns: columns,
            data: data,
        },
        useGlobalFilter,
    );

    const {
        state,
        setGlobalFilter,
      }: any = tableInstance;
      const { globalFilter, pageIndex, pageSize } = state;
      const isDataEmpty = data.length === 0;
    
    return (
        <>

            <Card>
                <Card.Body className="p-0 pt-4">
                    <div className="d-flex justify-content-evenly">
                        {/* Global filter component */}
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

                        {/* Add new button with link */}
                        <Link to={addButtonLink} className="text-muted ms-sm-3">
                            {/* Show "+" icon on mobile */}
                            <p className="btn btn-primary d-block d-md-none p-2 px-3">+</p>

                            {/* Show "AGREGAR NUEVO" text on non-mobile devices */}
                            <Button style={{}} className="btn btn-primary d-none d-md-block">
                                AGREGAR NUEVO
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
            <Col xl={12}>
                <Card>
                    <Card.Header className=" pb-0">
                        <div className="d-flex justify-content-between">
                            <h4 className="card-title mg-b-0">SIMPLE TABLE</h4>
                        </div>
                        <p className="tx-12 tx-gray-500 mb-2">
                            Example of Nowa Simple Table. <Link to="#">Learn more</Link>
                        </p>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive">
                            <Table className="table mg-b-0 text-md-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {data.map((list: any, index: any) => (
                                        <tr key={index}>
                                            <th scope="row">{list.id}</th>
                                            <td>{list.name}</td>
                                            <td>{list.status_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

// GlobalFilter component
const GlobalFilter = ({ filter, setFilter }: any) => {
    return (
        <span className="d-flex w-75">
            <Form.Control value={filter || ""} onChange={(e) => setFilter(e.target.value)} className="form-control mb-4" placeholder="Search..." />
        </span>
    );
};
