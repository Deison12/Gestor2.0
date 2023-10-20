import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import { ConfirmationCardButton, Loader } from "./";
/* Date Filter */
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Interface for table props
interface TableProps {
  data: any[];
  columns: any[];
  addButtonLink?: string;
  addButtonState?: any;
  searchFilter?: boolean;
  filterDate?: boolean;
  date?: string;
  isLoading?: boolean;
  btnText?: string;
  exceptionTitleText?: string;
  exceptionSubtitleText?: string;
  handleChange?: (newValue: Dayjs | null) => void;
  value?: Dayjs | null;
  totalFunc?: () => void; // Include the totalFunc prop here
}

// BasicDataTable component
export const BasicDataTable: React.FC<TableProps> = ({
  data,
  columns,
  addButtonLink = "",
  addButtonState = {},
  searchFilter = true,
  filterDate = false,
  value,
  isLoading,
  exceptionTitleText = "La tabla está vacía",
  exceptionSubtitleText = "No hay datos",
  btnText = "AGREGAR NUEVO",
  date,
  handleChange,
  totalFunc,
}) => {
  // Get table instance with sorting, global filtering, and pagination hooks
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Destructure the properties from the table instance
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  }: any = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const isDataEmpty = !isLoading && data.length === 0;

  return (
    <>
      <div className="w-100 text-end mb-2">
        {/* filter date */}
        {filterDate && handleChange ? (
          <LocalizationProvider
            style={{ height: 10 }}
            dateAdapter={AdapterDayjs}
          >
            <DesktopDatePicker
              className="ms-3 text-primary"
              label="Fecha Actual"
              inputFormat="DD/MM/YYYY"
              value={value || dayjs()}
              onChange={(newValue) => handleChange(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : null}
      </div>

      {/* Card for search and add button */}
      {searchFilter && (
        <Card>
          <Card.Body className="p-0 px-2 pt-4">
            <div className="d-flex justify-content-evenly">
              {/* Global filter component */}
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilter}
                hasAddButton={!!addButtonLink}
              />
              {/* AddButton */}
              {addButtonLink === "" ? null : (
                <Link
                  to={addButtonLink}
                  state={addButtonState}
                  className="text-muted ms-sm-3"
                >
                  <p className="btn btn-primary d-block d-md-none p-2 px-3">
                    +
                  </p>
                  <Button
                    style={{}}
                    className="btn btn-primary d-none d-md-block"
                  >
                    {btnText}
                  </Button>
                </Link>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Card for displaying the table */}
      <Card className="mt-0">
        <Card.Body className="p-0">
          {isLoading && ( // Shows loader if data is empty
            <Loader />
          )}

          {isDataEmpty && (
            <ConfirmationCardButton
              baseURL="#"
              title={exceptionTitleText}
              subtitle={exceptionSubtitleText}
            />
          )}

          {!isLoading && data.length > 0 && (
            <div
              className="table-responsive rounded"
              style={{ borderTop: "1px solid #9c9ca1" }}
            >
              <table {...getTableProps()} className="table table-hover mb-0">
                <thead>
                  {/* Render header rows */}
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className={column.className}
                          style={{
                            borderRight: "1px solid #9c9ca1",
                            borderLeft: "1px solid #9c9ca1",
                          }}
                        >
                          {/* Show column header */}
                          <span className="tabletitle">
                            {column.render("Header")}
                          </span>

                          {/* Show sort icons */}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <i className="fa fa-angle-down"></i>
                              ) : (
                                <i className="fa fa-angle-up"></i>
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {/* Render data rows */}
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              className="borderrigth"
                              {...cell.getCellProps()}
                              style={{
                                borderTop: "1px solid #9c9ca1",
                                borderBottom: "1px solid #9c9ca1",
                              }}
                            >
                              {/* Show cell content */}
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
      {/* Conditionally render the TotalCard component */}
      {totalFunc && totalFunc()}

      {/* Card for pagination */}
      <Card className="mt-2">
        <Card.Body className="px-3 py-1 ">
          <div className="d-flex align-items-center d-sm-flex m-0 p-0">
            <span className="">
              {/* Show page index and page count */}
              Pagina{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
            <span className="ms-sm-auto">
              {/* Pagination buttons */}
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-1"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {" << "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-1"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {" < "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-1"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {" > "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-1"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {" >> "}
              </Button>
            </span>
            {/* Select dropdown for page size */}
            <select
              className="p-2 selectpage border me-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

// GlobalFilter component
const GlobalFilter = ({ filter, setFilter, hasAddButton }: any) => {
  return (
    <span className={`d-flex ${hasAddButton ? "w-75" : "w-100"}`}>
      <Form.Control
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Search..."
      />
    </span>
  );
};
