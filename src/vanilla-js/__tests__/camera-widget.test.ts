import {
  getByText,
  waitFor,
  getByAltText,
} from '@testing-library/dom'
import {startCamera} from '../capture-button';

function mountCameraWidget() {
  const div = document.createElement('div')
  startCamera(div);
  document.body.appendChild(div);
  return document.body;
}

describe('Camera', () => {
  it('should let a user take a screenshot', async () => {
    const container = mountCameraWidget();
  
    // Activate camera
    getByText(container, 'Activate camera').click();
    await waitFor(() =>
      expect(getByText(container, 'Activate camera')).not.toBeVisible()
    );
    // TODO: test video gets assigned what we expect from the stream.
    
    const screenshot = getByAltText(container, 'screenshot');
    expect(screenshot).not.toBeVisible();
    
    getByText(container, 'take screenshot').click();
    expect(screenshot).toBeVisible();
    expect(screenshot).toMatchSnapshot();
    
    getByText(container, 'clear screenshot').click();
    expect(screenshot).not.toBeVisible();

    // takes a different screenshot every time.
    getByText(container, 'take screenshot').click();
    expect(screenshot).toMatchSnapshot();
  })
})