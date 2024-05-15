import * as Yup from 'yup';

export interface IPolicyFormValues {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'delete' | 'publish' | 'draft';
  icon: string | null;
}

const policiesInitialFormValues: IPolicyFormValues = {
  _id: '',
  title: '',
  description: '',
  status: 'publish',
  icon: null
};

export const yupAddPolicyFormValues = {
  initialValues: policiesInitialFormValues,
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().optional().nullable(),
    icon: Yup.string().optional().nullable()
  })
};

export const yupEditPoliciesFormValues = {
  initialValues: (data: IPolicyFormValues) => ({
    _id: data._id,
    title: data.title,
    description: data.description,
    status: data.status,
    icon: data.icon
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required(' Question is required'),
    description: Yup.string().required('Answer is required'),
    status: Yup.string().optional().nullable(),
    icon: Yup.string().optional().nullable()
  })
};
