export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentId?: string;
  itemsTotal: number;
  shippingTotal: number;
  taxTotal: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  isShipped: boolean;
  shippedAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}