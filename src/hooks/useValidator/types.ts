import {
  validationMethodsWithDates,
  validationMethodsWithoutParams,
  validationMethodsWithParams,
} from "utils/validations";

export interface IValidatorData {
  [k: string]: string | number | boolean | Date;
}

export interface IRules {
  [k: string]: IRule;
}

export type IRule = { [key: string]: any };

export interface IDataForCheck<Fields> {
  value: Fields[keyof Fields];
  fieldRules: IRule;
  fields?: Fields;
}

export type TypeRuleMethods = TypeRuleWithoutParameter | TypeRuleWithParameter | TypeRuleWithDates;

export type TypeRuleWithoutParameter = keyof typeof validationMethodsWithoutParams;
export type TypeRuleWithParameter = keyof typeof validationMethodsWithParams;
export type TypeRuleWithDates = keyof typeof validationMethodsWithDates;

export interface IValidationResponse {
  status: boolean;
  errorMessage?: string;
}

export type IErrorsMessages = {
  [k: string]: string;
};
