interface ISelectProps {
  label: string; 
  value: string;
}

export interface ISelectSegmentoComponent {
  title: string;
  data?: ISelectProps[];
  postUrl?: string;
  refetch: () => void;
  selectValue: ISelectProps;
  setSelectValue: (event: ISelectProps) => void;
}