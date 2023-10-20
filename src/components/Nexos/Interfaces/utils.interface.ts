export interface Response {
  success: boolean;
  message: string;
  content: City[];
}

export interface City {
  id:        number;
  name:      string;
  status_id: number;
}