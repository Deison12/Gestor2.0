import { useEffect, useState, useCallback } from 'react'
import { Checkbox } from '@mui/material';
import { Response } from '../../Interfaces/Pages/Item.interface';
import { useFetch } from '../../hooks/useFetch';
import { TitleComponent, BreadCrumb, BasicDataTable } from '../../Global';
import { Card, Button, Form } from 'react-bootstrap';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../../hooks';
import { formatNumber } from '../../../../helpers';

const ListDiscounts = () => {
    const [data, setData] = useState<any>([]);
    const [dataDiscount, setDataDiscount] = useState<any>([]);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const quoteId = localStorage.getItem('form_quote_id');
    const [focus, setFocus] = useState<number>(0);
    const { getAllData } = useFetch();
    const { postData } = useFetch();
    const { handleInfoAlert, handleErrorAlert } = useAlert();
    const navigate = useNavigate();
    const [form, setForm] = useState<any>({
        quote_id: quoteId,
        items: [],
    });

    const isDiscountIdSelected = form.discount_id === "" || form.discount_id === "seleccionar" || form.discount_id === null || form.discount_id === undefined;

    const handleCheckboxChange = useCallback((rowIndex: number) => {
        const updatedSelectedRows = new Set(selectedRows);
        if (updatedSelectedRows.has(rowIndex)) {
            updatedSelectedRows.delete(rowIndex);
            handleChange(rowIndex, 'discount', 0, data[rowIndex].quantity); // Pass quantity here
        } else {
            updatedSelectedRows.add(rowIndex);
            const existingItemIndex = form.items.findIndex(
                (item: any) => item.item_id === data[rowIndex].item_price_id
            );
            if (existingItemIndex !== -1) {
                // Item already exists, update properties
                const newForm = [...form.items];
                newForm[existingItemIndex] = {
                    ...newForm[existingItemIndex],
                    value: data[rowIndex].quantity, // Set value to quantity
                    discount: 0,
                    is_discount_percentage: "0"
                };
                setForm({ ...form, items: newForm });
            } else {
                // Item doesn't exist, add it
                const newForm = [...form.items];
                newForm.push({
                    item_id: data[rowIndex].item_price_id,
                    value: data[rowIndex].quantity, // Set value to quantity
                    discount: 0,
                    is_discount_percentage: "0"
                });
                setForm({ ...form, items: newForm });
            }
        }
        setSelectedRows(updatedSelectedRows);
    }, [selectedRows, data, form]);

    const handleChange = useCallback((rowIndex: number, field: string, value: any, quantity?: number) => {
        setForm((prevForm: any) => {
            const updatedItems = [...prevForm.items];

            if (rowIndex >= updatedItems.length) {
                updatedItems.push({
                    item_id: data[rowIndex].item_price_id,
                    value: quantity,
                    discount: 0,
                    is_discount_percentage: "0",
                });
            }

            if (field === 'is_discount_percentage') {
                updatedItems[rowIndex].is_discount_percentage = value;
                if (value === '1') {
                    // Reset discount if switching to percentage
                    updatedItems[rowIndex].discount = 0;
                } else {
                    // Ensure discount is within the price range
                    const maxDiscount = data[rowIndex].price; // Assuming price is available in data
                    const sanitizedDiscount = Math.max(0, Math.min(value, maxDiscount));
                    updatedItems[rowIndex].discount = sanitizedDiscount;
                }
            } else if (field === 'discount') {
                if (updatedItems[rowIndex].is_discount_percentage === '0') {
                    // Ensure discount is within the price range
                    const maxDiscount = data[rowIndex].price; // Assuming price is available in data
                    const sanitizedDiscount = Math.max(0, Math.min(value, maxDiscount));
                    updatedItems[rowIndex].discount = sanitizedDiscount;
                } else {
                    // When is_discount_percentage is '1', restrict discount to a maximum of 100
                    const maxPercentageDiscount = 100;
                    const sanitizedPercentageDiscount = Math.max(0, Math.min(value, maxPercentageDiscount));
                    updatedItems[rowIndex].discount = sanitizedPercentageDiscount;
                }
            }

            setFocus(rowIndex);
            return {
                ...prevForm,
                items: updatedItems,
            };
        });
    }, [form]);

    const handleStatusChange = (value: any) => {
        setForm((prevForm: any) => ({
            ...prevForm,
            discount_id: parseInt(value),
        }));
    };
    const handleCreate = async () => {
        try {
            const updatedForm = {
                ...form,
                items: form.items.map((item: any) => ({
                    ...item,
                    value: item.value === 0 ? data.find((dataItem: any) => dataItem.item_price_id === item.item_id)?.quantity || "0" : item.value,
                    discount: item.discount || "0",
                    is_discount_percentage: item.is_discount_percentage || "0",
                })),
            };
            await postData(updatedForm, 'quotes/items/save', false, 'cotizacionpdf');
        } catch (error) {
            handleErrorAlert('Ha ocurrido un error con el descuento a aplicar, intente nuevamente')
            console.error("Error in createItem:", error);
        }
    };

    const handleDelete = (item_id: number) => {
        const updatedData = data.filter((item: any) => item.item_price_id !== item_id);
        const updatedFormItems = form.items.filter((item: any) => item.item_id !== item_id);
        setData(updatedData);
        setForm({ ...form, items: updatedFormItems });
    };

    let columns: any[] = [
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
            Header: "Nombre Items",
            accessor: "name",
            Cell: ({ value }: { value: string }) => <span>{value.toUpperCase()}</span>,
        },
        {
            Header: "Cantidad",
            accessor: "quantity",
        },
        {
            Header: "Precio",
            accessor: "price",
            Cell: ({ value, row }: { value: string, row: any }) => (
                <span>
                    {`$ ${value}`}
                </span>
            ),
        },
        {
            Header: "Descuento",
            accessor: "value",
            Cell: ({ value, row }: { value: number; row: any }) => (
                <Checkbox
                    checked={selectedRows.has(row.index)}
                    color={value === 1 ? "success" : "warning"}
                    onChange={() => handleCheckboxChange(row.index)}
                />
            ),
        },
    ]
    if (selectedRows.size > 0) {
        columns = [
            ...columns,
            {
                Header: "Porcentaje",
                accessor: "",
                Cell: ({ row }: { row: any }) => (
                    selectedRows.has(row.index) ? (
                        <Form.Select
                            value={form.items[row.index]?.is_discount_percentage || ""}
                            aria-label="Default select example"
                            onChange={(e) => handleChange(row.index, 'is_discount_percentage', e.target.value)}
                            className="form-control"
                        >
                            <option className='option' value="1">Si</option>
                            <option className='option' value="0">No</option>
                        </Form.Select>
                    ) : null
                ),
            },
            {
                Header: "Valor descuento",
                accessor: "",
                Cell: ({ row }: { row: any }) => (
                    selectedRows.has(row.index) ? (
                        <Form.Control
                            className="form-control"
                            type='text'
                            autoFocus={row.index === focus}
                            required
                            value={form.items[row.index]?.discount || ""}
                            onChange={(e: any) => handleChange(row.index, 'discount', e.target.value)}
                        />
                    ) : null
                ),
            },
        ];
    }
    columns = [
        ...columns,
        {
            Header: "Quitar",
            accessor: "",
            className: "wd-15p borderrigth",
            Cell: ({ row }: { row: any }) => (
                <div
                    className="d-flex align-items-center gap-1 cursor-pointer"
                    onClick={() => handleDelete(row.original.item_price_id)}
                >
                    <span className="material-icons md-5 md-dark">&#xe872;</span>
                    Quitar
                </div>
            ),
        }
    ];
    const totalAmount = quoteId ? data.reduce(
        (total: any, item: any) => total + parseFloat(item.amount),
        0
    ) : 0;

    useEffect(() => {
        const getData = async () => {
            try {
                const response: Response = await getAllData(`api/quotes/items/${quoteId}`);
                const resDataDiscount: Response[] = await getAllData(`api/discount/list/active`);

                if (response.content && Array.isArray(response.content)) {
                    setData(response.content);
                    setForm((prevForm: any) => ({
                        ...prevForm,
                        items: response.content.map((item: any) => ({
                            item_id: item.item_price_id,
                            value: 0,
                            discount: 0,
                            is_discount_percentage: "0",
                        })),
                    }));
                } else {
                    console.error("Respuesta inválida:", response);

                    if (quoteId) {
                        handleInfoAlert('No hay descuentos para aplicar.', '/cotizar');
                    } else {
                        handleInfoAlert('No hay descuentos para aplicar.', '/cotizar');
                    }
                }

                setDataDiscount(resDataDiscount);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [navigate]);

    useEffect(() => {
        if (data.length > 0) {
            const thisIsDiscounts = Array.from(selectedRows).reduce(
                (totalDiscount, rowIndex) => {
                    const item = form.items[rowIndex];
                    if (item && item.is_discount_percentage === '1') {
                        const price = data[rowIndex].price;
                        const discountPercentage = item.discount / 100;
                        totalDiscount += price * discountPercentage;
                    } else {
                        totalDiscount += parseFloat(item.discount || 0);
                    }
                    return totalDiscount;
                },
                0
            );
            setTotalDiscount(thisIsDiscounts);
        }
    }, [selectedRows, data, form.items]);

    const TotalCard: React.FC<{ totalAmount: number }> = ({ totalAmount }) => {
        const totalPriceSum = data.reduce(
            (total: number, item: any) => total + parseFloat(item.price),
            0
        );
        const discount = dataDiscount.find((discount: any) => discount.id === form.discount_id);

        let totalAfterDiscount = totalPriceSum - totalDiscount;
        let discountAmountMap = 0;

        if (discount) {
            if (discount.is_percentage === 0) {
                discountAmountMap = parseFloat(discount.amount); // Convertir a número decimal
                totalAfterDiscount -= discountAmountMap;
            } else if (discount.is_percentage === 1) {
                const discountAmount = (totalPriceSum * parseFloat(discount.amount)) / 100;
                totalAfterDiscount -= discountAmount;
                discountAmountMap = discountAmount;
            }
        }
        if (totalAfterDiscount < 0) {
            handleInfoAlert('Verificar descuentos para poder continuar');
            totalAfterDiscount = 0
            //variable true
        } else {
            //variable false
        }

        return (
            <Card>
                <Card.Body className="px-3">
                    <div className="table-responsive">
                        <table className="table mb-0 ">
                            <tbody>
                                <tr>
                                    <th className='text-center'>
                                        <span className="tabletitle fw-bold text-uppercase">Descuento</span>
                                    </th>
                                    <th className='text-center'>
                                        <div className="d-flex align-items-start flex-column ">
                                            {!form.discount_id ? (
                                                <Form.Select
                                                    name="discount_id"
                                                    aria-label="Default select example"
                                                    onChange={(e) => handleStatusChange(e.target.value)}
                                                    value=""
                                                >
                                                    {dataDiscount.some((discount: any) => discount.name === "No Aplicar Descuento") && (
                                                        <option value="">No aplicar descuento</option>
                                                    )}
                                                    
                                                    {dataDiscount
                                                        .filter((discount: any) => discount.name !== "No aplicar descuento")
                                                        .map((discount: any) => (
                                                            <option key={discount.id} value={discount.id}>
                                                                {discount.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            ) : (
                                                <Form.Select
                                                    name="discount_id"
                                                    aria-label="Default select example"
                                                    onChange={(e) => handleStatusChange(e.target.value)}
                                                    value={form.discount_id}
                                                >
                                                    {dataDiscount.map((discount: any) => (
                                                        <option className='' key={discount.id} value={discount.id}>
                                                            {discount.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            )}
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className='text-center'>
                                        <span className="tabletitle fw-bold text-uppercase">Subtotal</span>
                                    </th>
                                    <th className='text-center'>
                                        <span className="tabletitle"><b>$</b>{formatNumber(totalPriceSum, 2)}</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th className='text-center'>
                                        <span className="tabletitle fw-bold text-uppercase">Descuentos</span>
                                    </th>
                                    <th className='text-center'>
                                        <span className="tabletitle"><b>$</b> {formatNumber(discountAmountMap + totalDiscount, 2)} </span>
                                    </th>
                                </tr>
                                <tr className='bg-darkorange text-light'>
                                    <th className='text-center'>
                                        <span className="tabletitle fw-bold text-uppercase">Total</span>
                                    </th>
                                    <th className='text-center'>
                                        <span className="tabletitle"><b>$</b> {formatNumber(totalAfterDiscount, 2)} </span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div>
            {/* Breadcrumb */}
            <BreadCrumb
                items={['inicio', 'lista DE DESCEUNTOS']}
                baseURL={['inicio', 'nexos/listadescuentos']}
            />
            {/* Component Title */}
            <TitleComponent
                title={'DESCUENTOS A APLICAR'}
            />
            {/* Data Grid Table */}
            <BasicDataTable
                columns={columns}
                data={data}
                totalFunc={() => <TotalCard totalAmount={totalAmount} />}
            />
            <div className='text-end'>
                <Link to={`${process.env.PUBLIC_URL}/nexos/cotizacionpdf`} className="header-logo">
                    <Button
                        variant=""
                        className="btn btn-primary me-2"
                    >
                        Volver
                    </Button>
                </Link>
                <Button
                    variant=""
                    className="btn btn-primary"
                    onClick={handleCreate}
                    disabled={isDiscountIdSelected}
                >
                    Continuar
                </Button>
            </div>
        </div>
    )
}

export default ListDiscounts;