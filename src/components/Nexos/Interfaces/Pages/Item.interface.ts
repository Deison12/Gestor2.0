export interface Response {
  success: boolean;
  message: string;
  content: Item[];
}

export interface Item {
  id: number;
  name: string;
  status_id: number;
  price: string;
  quote_type_id: number;
  photo: null | string;
  price_fraction: string;
  note: string;
  details: null | string;
  service_condition: string;
  contable: number;
  item_type: number;
  voting_details: string;
  order: number;
  show_quantity: number;
  observation_of_service: null | string;
}

export interface ItemCreateCotizacion {
  id: number;
  nit: string;
  name: string;
  email: string;
  email2: string;
  email3: string;
  phone: string;
  phone2: string;
  phone3: string;
  city_id: number;
  address: string;
  units_total: string;
  units_budget: string;
  contact_phone: string;
  contact_person: string;
  quote_id: number;
  quote_type_id: number;
}
export interface ItemCreateCotizacionForm2 {
  id: number;
  name: string;
  email: string;
  nit: string;
  email2: string;
  email3: string;
  phone: string;
  phone2: string;
  phone3: string;
  city_id: number;
  address: string;
  units_total: string;
  units_budget: string;
}