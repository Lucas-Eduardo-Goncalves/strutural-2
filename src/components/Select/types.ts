interface ISelectProps {
  label: string; 
  value: string;
}

export interface ISelectSegmentoComponent {
  title: string;
  fetchUrl: string;
  postUrl?: string;
  selectValue: ISelectProps;
  setSelectValue: (event: ISelectProps) => void;
}

export interface IFetchProps {
  name: string;
  id: string;
}