import { useState } from "react";
import { validationMethods } from "utils/validations";
import { IDataForCheck, IErrorsMessages, IRules, IValidationResponse } from "./types";

export const useValidator = <DefaultFields extends Record<string, any>>() => {
  const [errors, setErrors] = useState<IErrorsMessages>({});

  const validate = (fields: DefaultFields, rules: IRules = {}) => {
    const errorsMessages: IErrorsMessages = {};
    for (const keyRule in rules) {
      const fieldRules = rules[keyRule];
      const messageError = checkField({ fieldRules, value: fields[keyRule], fields });

      if (typeof messageError === "string") {
        errorsMessages[keyRule] = messageError;
      }
    }
    setErrors(errorsMessages);
    return errorsMessages;
  };

  const checkField = ({ fieldRules, value, fields }: IDataForCheck<DefaultFields>) => {
    let checkRole: IValidationResponse = { status: false, errorMessage: "" };
    for (const role in fieldRules) {
      const parameter = fieldRules[role];

      if (typeof parameter === "string") {
        checkRole = (validationMethods as any)[role](value, fields?.[parameter]);
      }
      if (typeof parameter === "number") {
        checkRole = (validationMethods as any)[role](value.toString(), parameter);
      }
      if (typeof parameter === "boolean") {
        checkRole = (validationMethods as any)[role](value.toString());
      }

      if (!checkRole.status) {
        break;
      }
    }

    return checkRole?.errorMessage;
  };

  const fails = (errorsMessage?: IErrorsMessages) => {
    if (errorsMessage !== undefined) {
      return Object.values(errorsMessage).length === 0 ? { status: true } : { status: false, messages: errorsMessage };
    }
    return Object.values(errors).length === 0 ? { status: true } : { status: false, messages: errors };
  };

  return { errors, validate, checkField, fails, setErrors };
};
