const handleInaccessible = (error, handle: HandleScreenshotError) => {
    if (error instanceof DOMException && error.name === 'NotAllowedError') {
        if (error.message === 'Permission dismissed') {
            return handle(ScreenshotError.dismissed)
        }
        if (error.message === 'Permission denied') {
            return handle(ScreenshotError.denied)
        }
    }
    handle(ScreenshotError.unknown)
}

enum ScreenshotError {
    dismissed = 'dismissed',
    denied = 'denied',
    unknown = 'unknown',
}

type HandleScreenshotError = (error: ScreenshotError) => void;

type TryScreenshotOptions = {
    onError: HandleScreenshotError;
    videoElement: HTMLVideoElement;
}

export const tryScreenshot = (constraints: MediaStreamConstraints, {onError, videoElement}: TryScreenshotOptions) => {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(function(error) {
            handleInaccessible(error, onError)
        });
}