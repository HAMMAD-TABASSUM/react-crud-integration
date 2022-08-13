import React from "react";
import { FormikProps, getIn } from "formik";
interface Props {
  formik: FormikProps<any>;
  name: string;
  render: (error: string) => JSX.Element;
}

export function FormikErrorMessage(props: Props): JSX.Element {
  const { formik, name, render } = props;
  return (
    <>
      {!!getIn(formik.touched, name) &&
        !!getIn(formik.errors, name) &&
        render(getIn(formik.errors, name))}
    </>
  );
}
