import { Story, Meta } from '@storybook/html';
import { startCapture, ButtonProps } from './capture-button';

export default {
  title: 'Example/Button',
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<ButtonProps> = () => {
  const target = document.createElement('div');
  startCapture(target);
  return target;
};

export const Primary = Template.bind({});
Primary.args = {
};
