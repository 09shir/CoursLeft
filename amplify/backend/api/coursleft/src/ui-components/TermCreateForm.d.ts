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
export declare type TermCreateFormInputValues = {
    name?: string;
    credits?: number;
};
export declare type TermCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    credits?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TermCreateFormOverridesProps = {
    TermCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    credits?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TermCreateFormProps = React.PropsWithChildren<{
    overrides?: TermCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TermCreateFormInputValues) => TermCreateFormInputValues;
    onSuccess?: (fields: TermCreateFormInputValues) => void;
    onError?: (fields: TermCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TermCreateFormInputValues) => TermCreateFormInputValues;
    onValidate?: TermCreateFormValidationValues;
} & React.CSSProperties>;
export default function TermCreateForm(props: TermCreateFormProps): React.ReactElement;
