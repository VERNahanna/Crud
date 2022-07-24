
export interface Categories {
  id: number;
  name: string;

}

export interface ICategoriesViewModel {
  statusCode: number;
  message: string;
  data: Categories[];
}
export interface IFAQViewModel {
  statusCode: number;
  message: string;
  data:FAQ[];
}
export interface Icategories {

  id: number;
  name: string;
  faqs: FAQ[];
}


export interface FAQ {
  id: number;
  name: string;
  question:string;
  answer:string;
  categoryId: number;
  faqId: number;
}
