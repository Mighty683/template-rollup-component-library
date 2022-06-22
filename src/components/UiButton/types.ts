import { ButtonHTMLAttributes } from 'react';

export type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  buttonType?: ButtonTypes;
  disabled?: boolean;
  testId?: string;
};
export enum ButtonTypes {
  primary = 'primary',
  secondary = 'secondary'
}
