const imageInput = document.getElementById('imageInput');
const upscaleBtn = document.getElementById('upscaleBtn');
const downloadBtn = document.getElementById('downloadBtn');
const originalImg = document.getElementById('originalImg');
const upscaledImg = document.getElementById('upscaledImg');
const statusText = document.getElementById('status');

let upscaler;

// Initialize the AI model
window.onload = () => {
    upscaler = new Upscaler();
    statusText.innerText = "System Ready: Awaiting image input.";
};

// Handle Image Upload
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            originalImg.src = event.target.result;
            originalImg.style.display = 'block';
            
            upscaledImg.style.display = 'none'; 
            downloadBtn.style.display = 'none';
            
            upscaleBtn.disabled = false;
            statusText.innerText = "Target acquired. Ready to enhance.";
        };
        reader.readAsDataURL(file);
    }
});

// Run AI Upscaler
upscaleBtn.addEventListener('click', async () => {
    statusText.innerText = "Zyqorath is processing... Please hold.";
    upscaleBtn.disabled = true;

    try {
        // I added the patchSize fix here in case you try to upload large images!
        const upscaledSrc = await upscaler.upscale(originalImg, {
            patchSize: 64,
            padding: 2
        });
        
        upscaledImg.src = upscaledSrc;
        upscaledImg.style.display = 'block';
        downloadBtn.style.display = 'block';
        
        statusText.innerText = "Enhancement complete!";
    } catch (error) {
        console.error(error);
        statusText.innerText = "Error: Processing failed. Check console for details.";
    } finally {
        upscaleBtn.disabled = false;
    }
});

// Handle Download
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = upscaledImg.src;
    link.download = 'zyqorath-enhanced.png'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
