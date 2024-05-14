export async function createImage(url) {
    if (typeof window === "undefined") return; // Early return if not client-side

    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', error => reject(error));
        img.setAttribute('crossOrigin', 'anonymous'); // Adjust as per your CORS needs
        img.src = url;
    });
}

export async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob(blob => {
            resolve(blob);
        }, 'image/jpeg');
    });
}

export const handlePremiumFeatureClick = (showPremiumPopup, setShowPremiumPopup) => {
    setShowPremiumPopup(!showPremiumPopup);
};

// Example of moving onCropComplete
export const onCropComplete = (croppedArea, croppedAreaPixels, setCroppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
};


// In profileUtils.js or a similar file




