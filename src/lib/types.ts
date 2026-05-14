export type Variant = 'v1' | 'v2' | 'v3';

export type QuoteData = {
  zip: string;
  homeType: string;
  bill: string;
  name: string;
  email: string;
  phone: string;
};

export const emptyQuote = (): QuoteData => ({
  zip: '',
  homeType: '',
  bill: '',
  name: '',
  email: '',
  phone: '',
});
