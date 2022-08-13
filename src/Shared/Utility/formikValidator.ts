import { instanceToPlain, plainToInstance } from "class-transformer";
import {
  validateSync,
  ValidationError,
  ValidatorOptions,
} from "class-validator";
import { FormikValues } from "formik";
import { AxiosResponse } from "axios";
import { CleanValues } from "./clean-values";
type Class = { new (...args: any[]): any };
interface ValidatorErrors {
  [key: string]: string | string[] | ValidatorErrors;
}

interface Error409 {
  message: string;
  shouldUnique: {
    [key: string]: number;
  };
}

export class FormikValidator {
  private static readonly validatorOptions: ValidatorOptions = {
    whitelist: true,
  };
  public static validator(schema: Class) {
    return (data: FormikValues) => {
      return this.validate(schema, CleanValues.clean({ ...data }));
    };
  }

  public static transformValue(schema: Class, valuesObject: any) {
    const classData = plainToInstance(schema, valuesObject);
    const valuesData: any = instanceToPlain(classData);
    return CleanValues.clean({ ...valuesData });
  }

  public static serverErrors(errors: AxiosResponse): ValidatorErrors {
    if (errors) {
      if (errors.status === 409) {
        return this.serverError409(errors.data);
      }
      if (errors.status === 422) {
        return this.serverError422(errors.data);
      }
    }

    return null;
  }

  private static validate(schema: Class, data: FormikValues): ValidatorErrors {
    const classData = plainToInstance(schema, data);
    const validationErrors = validateSync(classData, this.validatorOptions);
    return this.exceptionFactory(validationErrors);
  }

  private static serverError422(errors: ValidatorErrors): ValidatorErrors {
    const errorsException: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in errors) {
      if (typeof errors[key] === "string") {
        errorsException[key] = errors[key];
      } else if (typeof errors[key] === "object") {
        if (Array.isArray(errors[key])) {
          errorsException[key] = (errors[key] as string[]).shift();
        } else if (errors[key] instanceof Object) {
          errorsException[key] = this.serverError422(
            errorsException[key] as ValidatorErrors
          );
        }
      }
    }
    return errorsException;
  }

  private static serverError409(errors: Error409): ValidatorErrors {
    const errorsException: ValidatorErrors = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in errors.shouldUnique) {
      errorsException[key] = `${key} is already exist`;
    }
    return errorsException;
  }

  private static exceptionFactory(errors: ValidationError[]): ValidatorErrors {
    const errorsException: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const error of errors) {
      if (error.constraints) {
        errorsException[error.property] = Object.values(
          error.constraints
        ).shift();
      } else if (error.children) {
        errorsException[error.property] = this.exceptionFactory(error.children);
      }
    }
    return errorsException;
  }
}
