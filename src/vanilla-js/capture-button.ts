import { startCameraFeed } from '../core/camera';
import './capture-button.css';
export interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

function onError(error: string) {
  const messageBox = document.getElementById('capture-button-error');
  if (messageBox) {
    messageBox.innerText = error;
  }
}

// short function for creating an element.
const ce = <type extends keyof HTMLElementTagNameMap>(tag: type, className?: string)  => {
  const e = document.createElement(tag);
  if(className) {
    e.className = className;
  }
  return e;
}

const appendChildren = (parent: HTMLElement, ...elements: HTMLElement[]) => {
  elements.forEach(e => parent.appendChild(e));
  return parent;
}

const createButton = ({label, onClick, className}: ButtonProps) => {
  const btn = ce('button', className);
  
  btn.type = 'button';
  btn.textContent = label;

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
};

const createMessageBox = () => {
  const messageBox = ce('span');
  messageBox.id = 'capture-button-error';
  return messageBox;
}

const createTakeScreenshot = (canvas: HTMLCanvasElement, video: HTMLVideoElement, screenshotHolder: HTMLImageElement) => () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.setAttribute('width', `${width}`);
  canvas.setAttribute('height', `${height}`);

  let ctx = canvas.getContext("2d");
  
  if (ctx) {
    ctx.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL("image/jpeg");
  
    screenshotHolder.src = data;
  }
};

type Camera = {
  container: HTMLElement;
  takeScreenshot: () => void;
  clearScreenshot: () => void;
}

const createCamera = (): Camera => {
  const video = ce('video');
  const img = ce('img', 'centered');
  img.alt = 'screenshot';
  img.hidden = true;
  const activateCameraButton = createButton({label: 'Activate camera', className: 'centered'});
  const container = appendChildren(ce('div', 'CameraContainer bg--gray'), video, img, activateCameraButton);

  const canvas = ce('canvas');

  const onCameraActive = (stream: MediaStream) => {
    video.srcObject = stream;
    video.play();
    
    activateCameraButton.hidden = true;
  }

  const activateCamera = () =>
    startCameraFeed({ video: { height: 240, width: 360 } }, { onError, onCameraActive });

  activateCameraButton.addEventListener('click', activateCamera);

  const _takeScreenshot = createTakeScreenshot(canvas, video, img);

  const takeScreenshot = () => {
    _takeScreenshot();
    img.hidden = false;
  }

  const clearScreenshot = () => {
    img.hidden = true;
  }

  return {
    container,
    takeScreenshot,
    clearScreenshot,
  };
}

const createControls = (camera: Camera) => {
  const screenshotButton = createButton({label: 'take screenshot', onClick: camera.takeScreenshot});
  const clearButton = createButton({label: 'clear screenshot', onClick: camera.clearScreenshot});

  return appendChildren(ce('div'), screenshotButton, clearButton);
}

export const startCamera = (targetElement: Node) => {
  const camera = createCamera();
  const controls = createControls(camera);
  const messageBox = createMessageBox();

  targetElement.appendChild(appendChildren(camera.container, messageBox, controls));
}
