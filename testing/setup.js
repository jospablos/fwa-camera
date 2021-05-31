Object.defineProperty(window.navigator, 'mediaDevices', {
    writable: true,
    value: {
      getUserMedia: jest.fn().mockResolvedValue({}),
    },
});
window.HTMLMediaElement.prototype.play = () => {};

HTMLCanvasElement.prototype.getContext = () => {
    return {
        drawImage: () => {}
     };
};

const toDataURLMock = jest.fn()
        .mockReturnValueOnce('data:image/jpeg;base64,00')
        .mockReturnValueOnce('data:image/jpeg;base64,01')
        .mockReturnValue('data:image/jpeg;base64,02')

HTMLCanvasElement.prototype.toDataURL = toDataURLMock;

