import { Story, Meta } from '@storybook/html';
import { startCamera, ButtonProps } from './capture-button';

export default {
  title: 'VanillaJS',
  argTypes: {},
} as Meta;

const Template: Story = () => {
  const target = document.createElement('div');
  startCamera(target);
  return target;
};

export const Camera = Template.bind({});
Camera.args = {
};
