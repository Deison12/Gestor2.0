export interface ItemBilling {
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
    bookingStatus:         string;
    accountableStatus:     string;
}