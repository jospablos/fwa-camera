
// See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions
const handleInaccessible = (error: DOMException, handle: HandleScreenshotError) => {
    // Errors the user can recover from by granting permission
    if (error.name === 'NotAllowedError') {
        if (error.message === 'Permission dismissed') {
            return handle(GetUserMediaError.dismissed)
        }
        if (error.message === 'Permission denied') {
            return handle(GetUserMediaError.denied)
        }
    }

    if (error.name === 'NotFoundError') {
        return handle(GetUserMediaError.noDevices);
    }

    // Since we're constraining, we want to find out if we're over-doing it on
    // on some devices to adjust
    if (error.name === 'OverconstrainedError') {
        // log()
        return handle(GetUserMediaError.noDevices);
    }

    // Errors we can't do anything about.
    if (error.name === 'NotReadableError' || error.name === 'SecurityError') {
        return handle(GetUserMediaError.failed)
    }

    // fail-safe for anything else.
    handle(GetUserMediaError.failed)
}

enum GetUserMediaError {
    dismissed = 'dismissed',
    denied = 'denied',
    noDevices = 'no_devices',
    failed = 'failed',
    unknown = 'unknown',
}

type HandleScreenshotError = (error: GetUserMediaError) => void;

type TryScreenshotOptions = {
    onError: HandleScreenshotError;
    onCameraActive: (stream: MediaStream) => void;
}

export const startCameraFeed = (constraints: MediaStreamConstraints, {onError, onCameraActive}: TryScreenshotOptions) => {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            onCameraActive(stream);
        })
        .catch(function(error) {
            handleInaccessible(error, onError)
        });
}