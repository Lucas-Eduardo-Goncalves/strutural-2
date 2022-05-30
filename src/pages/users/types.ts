import moment from 'moment';

export type Option = {
  value: string;
  label: string;
};

export type IDependences = {
  cidades: Option[];
  escolaesferas: Option[];
  escolagraus: Option[];
};

export type IFilters = {
  search: string;
  status?: any;
  categoryId?: string;
  createdAt?: [moment.Moment, moment.Moment];
};

export type IUserProps = {
  Bairro: string | null;
  CPF: string | null;
  Cep: string | null;
  Cidade: string | null;
  Complemento: string | null;
  DataFim: string | null;
  DataInicio: string | null;
  Endereco: string | null;
  IP: string | null;
  Numero: string | null;
  UF: string | null;
  affiliate_amount: string | null;
  affiliate_code: string | null;
  affiliate_comission: string | null;
  affiliate_id: string | null;
  affiliate_indications: string | null;
  auth_token: string;
  created_at:  string;
  deleted_at:  string;
  description: string | null;
  documento2: string | null;
  documentos: string | null;
  email:  string;
  email_verified_at: string | null;
  id: 424
  is_acessed: string | null;
  is_active: 1
  is_aproved: string | null;
  is_deleted: 0
  is_whatsapp: string | null;
  last_viewed:  string;
  name:  string;
  phone:  string;
  referral_code: string | null;
  rg: string | null;
  role: string | null;
  sankhya_login:  string;
  sankhya_pass:  string;
  updated_at:  string;
  user_category_id: string | null;
  user_type: string;
}

export type IFetchPropsContacts = IUserProps[]