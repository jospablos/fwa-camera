import { tryScreenshot } from '../core/camera';
import './capture-button.css';

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

const createCaptureFunction = (onError, videoElement) => () => {
  tryScreenshot({
    video: true
  }, { onError, videoElement });
}

function onError(error: string) {
  const messageBox = document.getElementById('capture-button-error');
  if (messageBox) {
    messageBox.innerText = error;
  }
}

const createMessageBox = () => {
  const messageBox = document.createElement('span');
  messageBox.id = 'capture-button-error';
  return messageBox;
}

const createCaptureButton = ({label, onClick}: ButtonProps) => {
  const btn = document.createElement('button');
  
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  btn.className = 'capture-button';

  return btn;
};

const createVideoElement = () => {
  const video = document.createElement('video');
  video.style = "display: none;"
  return video;
}
const createCanvasElement = () => {
  const canvas = document.createElement('canvas');
  canvas.style = "display: none;"
  return canvas;
}

const joinElements = (...elements: HTMLElement[]) => {
  const div = document.createElement('div');
  elements.forEach(e => div.appendChild(e));
  return div
}

const paintOnCanvas = (canvas, video) => {
  let ctx = canvas.getContext("2d");

  const width = 320;
  const height = 240;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 200);
}

const createScreenshotHolder = () => {
  const screenshotHolder = document.createElement('img');
  return screenshotHolder;
}

const updateScreenshot = (data, screenshotHolder) => {
  screenshotHolder.src = data;
}

const takeScreenshot = (canvas, screenshotHolder) => () => {
  const data = canvas.toDataURL("image/jpeg");

  updateScreenshot(data, screenshotHolder)

  return canvas.insertAdjacentElement('afterend', screenshotHolder);
};

export const startCapture = (targetElement: Node) => {
  const video = createVideoElement();
  const canvas = createCanvasElement();
  const screenshotHolder = createScreenshotHolder();
  const captureFn = createCaptureFunction(onError, video);
  paintOnCanvas(canvas, video);

  const captureButton = createCaptureButton({label: 'Capture screenshot', onClick: captureFn});
  const screenShotButton = createCaptureButton({label: 'Capture screenshot', onClick: takeScreenshot(canvas, screenshotHolder)});
  const messageBox = createMessageBox();

  targetElement.appendChild(joinElements(captureButton, messageBox, canvas, screenShotButton));
}
