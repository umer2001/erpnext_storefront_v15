export interface ProductList {
  items: Item[];
  filters: Filters;
  settings: Settings;
  sub_categories: any[];
  items_count: number;
  total_items: number;
}

export interface Filters {}

export interface Item {
  web_item_name: string;
  name: string;
  item_name: string;
  item_code: string;
  website_image: string;
  variant_of: null;
  has_variants: number;
  item_group: string;
  web_long_description: null;
  short_description: null;
  route: string;
  website_warehouse: null | string;
  ranking: number;
  on_backorder: number;
  formatted_mrp: null;
  formatted_price: string;
  price_list_rate: number;
  in_stock: boolean;
  in_cart: boolean;
  wished: boolean;
}

export interface Settings {
  name: string;
  owner: string;
  modified: Date;
  modified_by: string;
  docstatus: number;
  idx: string;
  products_per_page: number;
  enable_field_filters: number;
  enable_attribute_filters: number;
  hide_variants: number;
  enable_variants: number;
  show_price: number;
  show_stock_availability: number;
  show_quantity_in_website: number;
  allow_items_not_in_stock: number;
  show_apply_coupon_code_in_website: number;
  show_contact_us_button: number;
  show_attachments: number;
  company: string;
  price_list: string;
  enabled: number;
  default_customer_group: string;
  quotation_series: string;
  enable_checkout: number;
  show_price_in_quotation: number;
  save_quotations_as_draft: number;
  payment_success_url: string;
  enable_wishlist: number;
  enable_reviews: number;
  enable_recommendations: number;
  is_redisearch_enabled: number;
  is_redisearch_loaded: number;
  hide_price_for_guest: number;
  doctype: string;
  filter_fields: any[];
  filter_attributes: any[];
}
