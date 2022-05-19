import * as yup from 'yup';
import { IFormData, IFormDataErrors } from '../types';

const schema = yup.object({
  name: yup.string().required('Este Campo é obrigatório'),
 
  
/*   unit: yup.string().required('Campo obrigatório'),
  escolaesferas: yup.array().required('Campo obrigatório'), */
});

export const validate = (form: IFormData) => {
  try {
    schema.validateSync(form, { abortEarly: false });
    return null;
  } catch (error) {
    const validationError = error as yup.ValidationError;
    const errorsMap = validationError.inner.reduce((acc, item) => {
      return { ...acc, [item.path as string]: item.message };
    }, {});
    return errorsMap as IFormDataErrors;
  }
};
