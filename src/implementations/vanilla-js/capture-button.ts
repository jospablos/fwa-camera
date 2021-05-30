import './capture-button.css';

export interface ButtonProps {
  label: string;
}

function onClick() {
  console.log('click')
}

export const createCaptureButton = ({label}: ButtonProps) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  btn.className = 'capture-button';

  return btn;
};
