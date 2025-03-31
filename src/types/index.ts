export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  modelSrc: string;
  iosSrc: string;
}

export interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
} 