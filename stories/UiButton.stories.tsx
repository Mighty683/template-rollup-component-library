import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import { UiButton, ButtonTypes } from "../dist/components/UiButton";

export default {
  title: 'UiButton',
  component: UiButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof UiButton>;

const Template: ComponentStory<typeof UiButton> = (args) => <UiButton {...args} />;

export const Primary = Template.bind({});

export const Secondary = Template.bind({});

Primary.args = {
  buttonType: ButtonTypes.primary,
  children: <>Primary button</>
};

Secondary.args = {
  buttonType: ButtonTypes.secondary,
  children: <>Primary button</>
};
