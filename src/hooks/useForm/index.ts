import { ChangeEvent, FormEvent, useState } from "react";
import { useValidator } from "../useValidator";
import { IErrorsMessages, IRules, IValidatorData } from "../useValidator/types";
import { TSubmitHandler } from "./types";

interface IUseFormProps<FormValues> {
  defaultValues: FormValues;
  rules?: IRules;
}

const createNewErrors = (errors: IErrorsMessages, deleteField: string) => {
  return Object.keys(errors).reduce((obj, keyError) => {
    if (keyError !== deleteField) {
      obj[keyError] = errors[keyError];
    }
    return obj;
  }, {} as IErrorsMessages);
};

const isEmpty = (obj: unknown) => {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be an object");
  }
  return Object.keys(obj as object).length === 0;
};

export const useForm = <FormValues extends IValidatorData>({
  defaultValues,
  rules = {},
}: IUseFormProps<FormValues>) => {
  const { errors, validate, checkField, fails, setErrors } = useValidator<FormValues>();
  const [values, setValues] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);

  const setValue = (name: any, value: FormValues[keyof FormValues]) => {
    const errorMessage = checkField({ fieldRules: rules[name], value, fields: values });
    if (!isEmpty(rules)) {
      if (Boolean(errorMessage)) {
        setErrors({ ...errors, [name]: errorMessage as string });
      } else {
        setErrors(createNewErrors(errors, name as string));
      }
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue(name, value as FormValues[keyof FormValues]);

  const handleSubmit = (onSubmit: TSubmitHandler<FormValues>) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!isEmpty(rules)) {
      const errorsMessages = validate(values, rules);
      const errors = fails(errorsMessages);

      if (!errors.status) {
        setSubmitting(false);
        return;
      }
    }
    await onSubmit(values, e);
    setSubmitting(false);
  };

  return { values, handleChange, handleSubmit, setValue, submitting, errors };
};
