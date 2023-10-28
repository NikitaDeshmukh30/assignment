 
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('custom-canvas');
    const context = canvas.getContext('2d');
    setupCanvas(context);

    const downloadLink = document.getElementById('custom-download-link');
    downloadLink.addEventListener('click', () => {
        const canvasData = canvas.toDataURL('image/png');
        const pixelData = getCanvasRegionPixelData(canvas);
        const hexData = convertPixelDataToHex(pixelData);
        downloadFile(hexData, 'custom_pixel_data.txt');
    });

    function setupCanvas(ctx) {
        canvas.width = 16;
        canvas.height = 34; 
        ctx.font = '16px Arial'; 
        ctx.fillStyle = 'Red'; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('X', canvas.width / 2, canvas.height / 2); 
    }

    function getCanvasRegionPixelData(canvas) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        return imageData.data;
    }

    function convertPixelDataToHex(pixelData) {
        let hexData = '';
        for (let i = 0; i < pixelData.length; i += 4) {
            const [red, green, blue, alpha] = pixelData.slice(i, i + 4);
            const hexColor = `0x${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}${alpha.toString(16).padStart(2, '0')}, `;
            hexData += hexColor;
            if ((i + 4) % (4 * canvas.width) === 0) {
                hexData += '\n';
            }
        }
        return hexData;
    }

    function downloadFile(data, filename) {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    }
});
