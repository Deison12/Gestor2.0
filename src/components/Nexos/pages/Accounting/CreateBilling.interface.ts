export interface AdvancePaymentNote {
    id:                    number;
    number:                string;
    description:           string;
    quote_id:              number;
    status:                string;
    meeting_date:          Date;
    booking_status:        string;
    accountable_status:    string;
    meeting_time_register: string;
    meeting_time_init:     string;
    client_name:           string;
    nit:                   string;
    contact_name:          string;
    meeting_type:          string;
    contact_phone:         string;
    address:               string;
    city:                  string;
    phone:                 string;
    observations:          string;
    document:              string;
    items: ItemPaymentNote[];
}

export interface ItemPaymentNote {
    id:                     number;
    name:                   string;
    quote_id:               number;
    price:                  string;
    quantity:               number;
    total:                  string;
    order:                  number;
    item_price_id:          number;
    price_fraction:         string;
    service_condition:      string;
    discount:               string;
    is_discount_percentage: number;
}