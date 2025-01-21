export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Sizes[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  gender: Gender
}


export interface CartProduct {
  id: string;
  slug:string;
  title:string
  price: number;
  quantity: number;
  size: Sizes;
  image:string;
}

export type Sizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
export type Gender = 'men'|'women'|'kid'|'unisex';
