export interface MenuData {
  table_id: number;
  menu_id: number;
  Image: string;
  menu_item_name: string;
  Description: string;
  Price: number;
  category_name: string;
  quantity: number;
}

export interface IAddMenuForm {
  menu_item_name: string;
  Description: string;
  Price: number;
  category_id: number;
  image: File | null;
}

export interface Category {
  category_id: number;
  category_name: string;
}