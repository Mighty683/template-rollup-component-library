import React, {memo} from 'react';

import './styles.scss';

import {UiButtonProps} from './types';
import classNames from "classnames";

export const UiButton = memo(({className, buttonType, disabled, testId, children, ...buttonProps}: UiButtonProps) => {
  return <button
    className={classNames(className, 'uiButton', `uiButton--${buttonType}`)}
    {...buttonProps}
  >
    {children}
  </button>;
});

export { ButtonTypes } from './types';
