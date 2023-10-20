export interface Response {
  success: boolean;
  message: string;
  content: Cotizacion[];
}

export interface Cotizacion {
  id: number;
  name: string;
  status_id: number;
  price: string;
  photo: null | string;
  price_fraction: string;
  note: string;
  details: null | string;
  service_condition: string;
  contable: number;
  item_type: number;
  voting_details: string;
  show_quantity: number;
  observation_of_service: null | string;
  quotes: Quote[];
}

export interface Quote {
  item_price_id: number;
  quote_type_id: number;
  sort: number;
  quote_name: string;
}

/* Buscar por Nit */
export interface ItemCotizacionByNit {
  id: number;
  name: string;
  email: string;
  status_id: number;
  nit: string;
  description: null | string;
  phone: string;
  city_id: number | null;
  address: string;
  email2: string | null;
  email3: string | null;
  phone2: string | null;
  phone3: string | null;
  city_name: string;
  contact_person: string | null;
  contact_phone: string | null;
  units_total: string;
  units_budget: string;
  created_at: string;
}

export interface ItemCotizacionByNitForm2 {
  id: number;
  name: string;
  email: string;
  status_id: number;
  nit: string;
  description: null | string;
  phone: string;
  city_id: number | null;
  address: string;
  email2: string | null;
  email3: string | null;
  phone2: string | null;
  phone3: string | null;
  units_total: string;
  units_budget: string;
}
