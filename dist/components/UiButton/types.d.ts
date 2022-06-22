import { ButtonHTMLAttributes } from 'react';
export declare type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    buttonType?: ButtonTypes;
    disabled?: boolean;
    testId?: string;
};
export declare enum ButtonTypes {
    primary = "primary",
    secondary = "secondary"
}
