export type Variant = 'v1' | 'v2' | 'v3';

export type QuoteData = {
  zip: string;
  ownership: string;
  homeType: string;
  bill: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  trustedFormCertUrl?: string;
  leadidToken?: string;
};

export const emptyQuote = (): QuoteData => ({
  zip: '',
  ownership: '',
  homeType: '',
  bill: '',
  address: '',
  name: '',
  email: '',
  phone: '',
});
