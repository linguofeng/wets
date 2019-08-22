export interface IOrder {
  id: string;
  num: string;
  message: string;
  count: number;
  totalFee: number;
  createdAt: string;
  status: string;
  paidAt: string;
  paidOrderId: string;
  imageUrl: string;
  address: IOrderAddress;
  tracking: IOrderTracking;
  invoice: IOrderInvoice;
  items: IOrderProduct[];
  operations: IOrderOperations;
}

export interface IOrderAddress {
  name: string;
  phone: string;
  address: string;
}

export interface IOrderTracking {
  id: string;
  company: string;
  num: string;
  status: string;
}

export interface IOrderInvoice {
  id: string;
  title?: string;
  titleType?: string;
  titleTypeValue?: string;
}

export interface IOrderOperations {
  canCancel: boolean;
  canDelete: boolean;
  canConfirm: boolean;
  canInvoice: boolean;
  canPaid: boolean;
  canTracking: boolean;
}

export interface IInvoice {
  id?: string;
  type: number;
  titleType: number;
  content: number;
  title?: string;
  taxCode?: string;
  typeName?: string;
}

export interface IOrderProduct {
  id?: string;
  skuId?: string;
  name: string;
  imageUrl: string;
  desc: string;
  count: number;
  price: number;
  status?: number;
  statusStr?: string;
}

export interface IProductPropAttr {
  id: string;
  value: string;
}

export interface IProp {
  name: string;
  attrs: IProductPropAttr[];
}

export interface ISku {
  id: string;
  price: number | string;
  inventory: number;
  imageUrl: string;
  propIds: string[];
}

export interface IProductExt {
  price: string;
  priceRange: string;
  inventory: number;
}

export interface IProduct extends IProductExt {
  id: string;
  name: string;
  desc: string;
  status: string;
  minPrice: number;
  maxPrice: number;
  viewType: number;
  imageUrl: string;
  imageUrls: string[];
  detailImageUrls: string[];
  props: IProp[];
  skus: ISku[];
}

export interface IAddress {
  id: string;
  name: string;
  phone: string;
  provinceId: number;
  cityId: number;
  areaId: number;
  provinceName?: string;
  cityName?: string;
  areaName?: string;
  address: string;
  fullAddress?: string;
  selected?: boolean;
}

export interface IGeoItem {
  id: number;
  name: string;
  items: IGeoItem[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICartItem {
  id: string;
  count: number;
  name: string;
  productId: string;
  price: number;
  desc: string;
  selected: boolean;
  imageUrl: string;
  status: string;
  inventory: number;
  statusStr?: '';
}

export interface IUser {
  username: string;
  avatarUrl: string;
}
