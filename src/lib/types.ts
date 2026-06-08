export type Variant = 'v1' | 'v2' | 'v3';

export type QuoteData = {
  zip: string;
  ownership: string;
  homeType: string;
  bill: string;
  roofShade: string;
  address: string;
  name: string;
  email: string;
  phone: string;
};

export const emptyQuote = (): QuoteData => ({
  zip: '',
  ownership: '',
  homeType: '',
  bill: '',
  roofShade: '',
  address: '',
  name: '',
  email: '',
  phone: '',
});
