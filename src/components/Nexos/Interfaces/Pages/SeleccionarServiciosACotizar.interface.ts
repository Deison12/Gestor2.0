export interface SeleccionarServiciosACotizarUI {
    id:                     number;
    name:                   string;
    status_id:              number;
    price:                  string;
    photo:                  string;
    price_fraction:         string;
    note:                   string;
    details:                string;
    service_condition:      string;
    contable:               number;
    item_type:              number;
    voting_details:         string;
    show_quantity:          number;
    observation_of_service: null | string;
    quotes:                 number | null;
}

export interface SelectedQuoteItem {
    quote_id: string | number | null;
    discount_id?: string | number;
    items: SelectedItems[];
}

export interface SelectedItems {
    item_id  : number;
    name: string;
    price: number | string;
    value    :  number;
    discount? :  number | string;
    is_discount_percentage? :   number  | string;
}

export interface SendedItems {
    item_id  : number;
    value    :  number;
    discount? :  number | string;
    is_discount_percentage? :   number  | string;
}

export interface ItemsByQuoteId {
    name:                   string;
    quote_id:               number;
    price:                  string;
    quantity:               number;
    total:                  string;
    item_price_id:          number;
    price_fraction:         string;
    service_condition:      string;
    order:                  number;
    discount:               string;
    is_discount_percentage: number;
}

