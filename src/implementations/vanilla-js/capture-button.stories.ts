import { Story, Meta } from '@storybook/html';
import { createCaptureButton, ButtonProps } from './capture-button';

export default {
  title: 'Example/Button',
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return createCaptureButton(args);
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Capture screenshot',
};
