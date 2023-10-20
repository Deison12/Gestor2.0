/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAlert, useFile } from ".";
import { useFetch } from "./useFetch";
import validator from "validator";
import { useErrors } from "./";

const initialState = {
    id: 0,
    name: "",
    price: "",
    price_fraction: "",
    details: "",
    note: "",
    contable: 1,
    status_id: 1,
    show_quantity: 1,
    file: "",
    quotes: [] as Array<{ quote_type_id: string; id: number; sort: string, is_default: number }>,
};

const useFormItems = (
    editItemData?: any,
    location?: any,
) => {
    const initialItemState = editItemData
        ? {
            ...editItemData,
            quotes: editItemData.quotes?.map((quote: any) => ({ ...quote })) || [],
        }
        : { ...initialState, quotes: [{ quote_type_id: "", sort: "", is_default: 0 }] };

    const { getAllData, postData, putData } = useFetch();
    const { errors, setError, clearError } = useErrors();
    const [inputFocus, setInputFocus] = useState(false);
    const [item, setItem] = useState<any>(initialItemState);
    const [orderAndQuoteType, setOrderAndQuoteType] = useState<[]>([]);
    const [quoteTypes, setQuoteTypes] = useState<any>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const { handleAdd, fileInputRef, image, handleButtonClick, handleDelete } = useFile(setItem);
    const { handleEditConfirmation, handleSuccessAlert, handleErrorAlert } = useAlert();
    //Errors
    const validateErrors = (nameData: any, valueData: any) => {
        const validationErrors: any = { ...errors };
        if (nameData === "name") {
            if (validator.isEmpty(valueData)) {
                validationErrors.name = ["El campo nombre es obligatorio"];
            } else {
                delete validationErrors.name;
            }
        }
        if (nameData === "note") {
            if (validator.isEmpty(valueData)) {
                validationErrors.note = ["El campo nota es obligatorio"];
            } else {
                delete validationErrors.note;
            }
        }
        if (nameData === "price") {
            if (validator.isEmpty(valueData)) {
                validationErrors.price = ["El campo valor es obligatorio"];
            } else if (!validator.isNumeric(valueData)) {
                validationErrors.price = ["El campo valor debe ser numérico"];
            } else {
                delete validationErrors.price;
            }
        }
        if (nameData === "price_fraction") {
            if (validator.isEmpty(valueData)) {
                validationErrors.price_fraction = "El campo valor adicional es obligatorio";
            } else if (!validator.isNumeric(valueData)) {
                validationErrors.price_fraction = "El campo valor adicional debe ser numérico";
            } else {
                delete validationErrors.price_fraction;
            }
        }
        if (nameData === "service_condition") {
            if (validator.isEmpty(valueData)) {
                validationErrors.service_condition = "El campo condiciones del servicio es obligatorio";
            } else {
                delete validationErrors.service_condition;
            }
        }
        if (nameData === "quote_type_id") {
            if (validator.isEmpty(valueData)) {
                validationErrors.quote_type_id = "Debe seleccionar al menos un tipo de cotización";
            } else {
                delete validationErrors.quote_type_id;
            }
        }
        if (nameData === "sort") {
            if (validator.isEmpty(valueData)) {
                validationErrors.sort = "El campo orden es obligatorio";
            } else {
                delete validationErrors.sort;
            }
        }
        if (nameData === "details") {
            if (validator.isEmpty(valueData)) {
                validationErrors.details = "El campo detalles del servicio es obligatorio";
            } else {
                delete validationErrors.details;
            }
        }
        // Set the errors for each field separately
        setError("name", validationErrors.name);
        setError("note", validationErrors.note);
        setError("price", validationErrors.price);
        setError("price_fraction", validationErrors.price_fraction);
        setError("service_condition", validationErrors.service_condition);
        setError("quote_type_id", validationErrors.quote_type_id);
        setError("sort", validationErrors.sort);
        setError("details", validationErrors.details);
    };
    const combineErrors = () => {
        const errorMessages = [];
        if (errors.quote_type_id) errorMessages.push(errors.quote_type_id);
        if (errors.sort) errorMessages.push(errors.sort);
        const arrayErrors = errorMessages.map((error) => (Array.isArray(error) ? error[0] : error));
        return arrayErrors
    };
    const handleAddRow = () => {
        const newQuotes = [...item.quotes];
        newQuotes.push({ quote_type_id: "", sort: "" });
        setItem({
            ...item,
            quotes: newQuotes,
        });
    };
    const handleDeleteRow = (index: number) => {
        const newQuotes = [...item.quotes];
        newQuotes.splice(index, 1);
        setItem({
            ...item,
            quotes: newQuotes,
        });
    };
    const handleChangeName = (e: any) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === "name") {
            updatedValue = value.toUpperCase();
        }
        setItem((prev: any) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };
    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        let newValue = type === "radio" ? parseInt(value) : value;
        // Prevent negative numbers for "number" type inputs
        if (type === "number" && newValue < 0) {
            newValue = 0;
        }
        setItem({
            ...item,
            [name]: newValue,
        });
        const nameData = e.target.name;
        const valueData = e.target.value;
        clearError(name);
        validateErrors(nameData, valueData);
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "0.00" || value === "") {
            setItem((prev: any) => ({
                ...prev,
                [name]: "",
            }));
        }
        setInputFocus(false);
    };
    const handleInputFocus = () => {
        setInputFocus(true);
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "") {
            setItem((prev: any) => ({
                ...prev,
                [name]: "0.00",
            }));
        }
    };
    const selectFunction = () => {
        if (location?.state?.id != null) {
            editItem();
        } else {
            createItem();
        }
    };
    const createItem = async () => {
        try {
            await postData(item, 'itemPrice/storeRecord', false, "listaritems");
        } catch (error) {
            console.error("Error en createItem:", error);
            handleErrorAlert("Error al crear el item.");
        }
    };

    const editItem = async () => {
        try {
            // Mostrar la confirmación antes de editar el item
            const confirmationResult = await handleEditConfirmation("¿Estás seguro que deseas editar este item?");
            if (confirmationResult.isConfirmed) {
                const { item_price_id, quote_name, photo, ...rest } = item;
                const payload = {
                    ...rest,
                    quotes: item.quotes.map((quote: any) => ({
                        quote_type_id: quote.quote_type_id,
                        sort: quote.sort,
                        is_default: quote.is_default
                    })),
                    voting_details: "",
                    file: image,
                };
                console.log('payload', payload)

                const res = await putData(payload, 'itemPrice/edit');
                if (!res.success) {
                    handleErrorAlert("Error al editar el item.");
                } else {
                    handleSuccessAlert("El item se editó exitosamente.", "listaritems");
                }
            }
        } catch (error) {
            console.error("Error en editItem:", error);
            handleErrorAlert("Error al editar el item.");
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        selectFunction();
    };
    const fetchQDataQuoteTypes = async () => {
        const res = await getAllData('api/quoteTypes/getActiveRecords');
        setQuoteTypes(res);
    };
    const getAvailableQuoteTypes = (index: number) => {
        const selectedTypes = item.quotes
        return quoteTypes?.filter(
            (quote: any) => !selectedTypes.includes(quote.id) || selectedTypes[index].quote_type_id === quote.id
        );
    };
    const handleChangeOrderAndQuoteType = (
        index: number,
        field: string,
        value: any,
    ) => {
        if (field === "sort" && value < 0) {
            value = 0;
        }

        if (field === "is_default") {
            value = value ? 1 : 0;
        }

        let itemsQuote = [...item.quotes]; // Copia el array para no mutarlo directamente
        itemsQuote[index] = {
            ...itemsQuote[index],
            [field]: value,
        };

        setItem((prev: any) => ({
            ...prev,
            quotes: itemsQuote,
        }));

        const nameData = field;
        const valueData = value;
        clearError(nameData);
        validateErrors(nameData, valueData);
    };
    useEffect(() => {
        if (editItemData) {
        }
        if (!dataLoaded) {
            fetchQDataQuoteTypes();
            setDataLoaded(true);
        }
    }, [dataLoaded, fetchQDataQuoteTypes]);

    useEffect(() => {
        if (!!editItemData) {
            setOrderAndQuoteType(editItemData.quotes);
        }
    }, [editItemData, dataLoaded, fetchQDataQuoteTypes]);
    return {
        item,
        //BUTTON
        handleAdd,
        handleDelete,
        handleAddRow,
        handleDeleteRow,
        handleButtonClick,
        //IMAGE
        fileInputRef,
        image,
        //INPUTS
        handleChangeName,
        handleChange,
        handleFocus,
        handleBlur,
        handleInputFocus,
        inputFocus,
        //BUTTON SUBMIT
        handleSubmit,
        //QUOTES        
        getAvailableQuoteTypes,
        handleChangeOrderAndQuoteType,
        //ERRORS
        errors,
        combineErrors
    }
};

export default useFormItems;
