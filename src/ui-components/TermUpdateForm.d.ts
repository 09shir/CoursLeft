/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TermUpdateFormInputValues = {
    name?: string;
};
export declare type TermUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TermUpdateFormOverridesProps = {
    TermUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TermUpdateFormProps = React.PropsWithChildren<{
    overrides?: TermUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    term?: any;
    onSubmit?: (fields: TermUpdateFormInputValues) => TermUpdateFormInputValues;
    onSuccess?: (fields: TermUpdateFormInputValues) => void;
    onError?: (fields: TermUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TermUpdateFormInputValues) => TermUpdateFormInputValues;
    onValidate?: TermUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TermUpdateForm(props: TermUpdateFormProps): React.ReactElement;
