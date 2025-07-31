
export interface RestaurantType {
  id: string;
  name: string;
  subdomain: string;
  qrcode: string;
  currency: string;
  language: string;
  is_active: boolean;
  is_default: boolean;
  google_sheet_id: string;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string;
  parent_store_id: string;
  theme: Theme;
}

export interface Theme {
  color: Color
  mode: string
}

export interface Color {
  primary: string
  secondary: string
  accent: string
  success: string
  warning: string
  error: string
  background: string
  text: string
  textOnPrimary: string
  textOnSecondary: string
}