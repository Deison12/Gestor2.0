import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import dayjs from 'dayjs';
import { useAlert, useFetch } from "../components/Nexos/hooks";

const SeguimientoOrganizacionContainer = (
    location?: any,
) => {

    const [dataTable, setDataTable] = useState<any>([]);
    const [dataSelect, setDataSelect] = useState<any>([]);
    const [dataCheckRow, setDataCheckRow] = useState<any>([]);

    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const { postData, putData, getAllData, getAllDataStringify } = useFetch();
    const { handleEditConfirmation, handleSuccessAlert } = useAlert()
    const [selectedOption, setSelectedOption] = useState("");
    let rowIndex = location.state;

    /* modals */
    const [showModalSeguimiento, setShowModalSeguimiento] = useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [showFullNote, setShowFullNote] = useState(false);
    const [expandedNoteIndex, setExpandedNoteIndex] = useState<number | null>(null);

    const handleVerClick = (index: number) => {
        setExpandedNoteIndex(index);
        setShowFullNote(true);
    };

    const handleVerMenosClick = () => {
        setExpandedNoteIndex(null);
        setShowFullNote(false);
    };

    const handleModalClose = () => {
        setShowModalSeguimiento(false);
    };

    const handleSubmitModal = async ({ message, selectedRowId }: any) => {
        try {
            const payload = { quote_id: selectedRowId, message: message }
            const resPost = await postData(payload, 'quotes/message/save', false, "");
            console.log(resPost)
            handleSuccessAlert('Mensaje creado exitosamente', '')
            handleModalClose();
        } catch (error) {
            handleModalClose();
            console.error("Error en createItem:", error);
        }
    };

    const handleCheckboxChange = useCallback((rowIndex: number, rowId: number, rowAll: any) => {
        if (rowId === selectedRowId) {
            setSelectedRowId(null);
            setDataCheckRow([])
        } else {
            setDataCheckRow(rowAll)
            setSelectedRowId(rowId);
            setSelectedOption("")
        }
    }, [selectedRowId]);

    const columns = [
        {
            Header: "Seleccionar",
            accessor: "id",
            Cell: ({ value, row }: { value: number; row: any }) => (
                <Checkbox
                    color={value === selectedRowId ? "warning" : "warning"}
                    onChange={() => handleCheckboxChange(row.index, value, row.original)}
                    checked={value === selectedRowId ? true : false}
                />
            ),
        },
        {
            Header: "Cotización",
            accessor: "number",
        },
        {
            Header: "Nombre del cliente",
            accessor: "contact_person",
        },
        {
            Header: "Estado",
            accessor: "status",
        },
        {
            Header: 'Fecha Seguimiento',
            accessor: 'meeting_date',
            Cell: ({ value }: { value: any }) => {
                return (
                    <span>{
                        value === "None"
                            ? "NA"
                            : dayjs(value).format("DD/MM/YYYY")
                    }</span>
                )
            }
        },
        {
            Header: "Ver",
            accessor: "",
            className: "wd-10p borderrigth ",
            Cell: ({ row }: { row: any }) => {
                const handleQuoteClick = () => {
                    localStorage.setItem('form_quote_id', String(row.original.id));
                };
                return (
                    <Link
                        to={`${process.env.PUBLIC_URL}/nexos/cotizacionpdf`}
                        state={row.original}
                        onClick={handleQuoteClick}
                    >
                        <svg
                            onClick={handleQuoteClick}
                            className="svg-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="25px"
                            height="25px"
                            viewBox="0 0 24 24"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM12.1779 7.17624C11.4834 7.48982 11 8.18846 11 9C11 10.1046 11.8954 11 13 11C13.8115 11 14.5102 10.5166 14.8238 9.82212C14.9383 10.1945 15 10.59 15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C11.41 7 11.8055 7.06167 12.1779 7.17624Z" fill="rgba(234,113,46,1)"></path></svg>
                    </Link>
                );
            },
        },
    ];

    const handleChangeSelect = async (e: any) => {
        setSelectedOption(e.target.value);
    };

    const handleEdit = async () => {
        if (selectedOption && selectedRowId) {
            const payload = {
                id: String(selectedRowId),
                status: selectedOption
            };
            const confirmChange = await handleEditConfirmation("¿Deseas continuar con el cambio de estado de la cotización?");
            if (confirmChange.isConfirmed) {

                await putData(payload, "quotes/edit/status");

            } else {
                setSelectedOption("");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (rowIndex) {
                    const res: any = await getAllDataStringify(`api/quotes/list/${rowIndex}`);
                    setDataTable(res)
                }
                const response: any = await getAllData("api/quoteStatus/list/active");
                setDataSelect(response);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [getAllData, getAllDataStringify, rowIndex, setDataTable, setDataSelect]);

    const dataMessages = [
        {
            name: "Deison",
            text: " Lorem ipsum dolor sit amet!",
            date: "21/08/2021",
        },
        {
            name: "Xavi",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!!Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Deison",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia! Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Xavi",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Deison",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Xavi",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Deison",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
        {
            name: "Xavi",
            text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem a vitae cupiditate praesentium.Officia!",
            date: "21/08/2021",
        },
    ]

    const limitedMessages = dataMessages.slice(0, 1);
    if (dataCheckRow && dataCheckRow.contact_phone) {
        var telefono = dataCheckRow.contact_phone.toString();
        var telefonoFormateado = telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }

    return {
        columns,
        dataTable,
        setDataTable,
        dataSelect,
        setDataSelect,
        dataCheckRow,
        setDataCheckRow,
        selectedRowId,
        setSelectedRowId,
        postData,
        putData,
        getAllData,
        getAllDataStringify,
        handleEditConfirmation,
        handleSuccessAlert,
        selectedOption,
        setSelectedOption,
        rowIndex,
        showModalSeguimiento,
        setShowModalSeguimiento,
        showModalMensajes,
        setShowModalMensajes,
        showFullNote,
        setShowFullNote,
        expandedNoteIndex,
        setExpandedNoteIndex,
        handleVerClick,
        handleVerMenosClick,
        handleModalClose,
        handleSubmitModal,
        handleCheckboxChange,
        handleChangeSelect,
        handleEdit,
        dataMessages,
        limitedMessages,
        telefonoFormateado,
    };
};

export default SeguimientoOrganizacionContainer;