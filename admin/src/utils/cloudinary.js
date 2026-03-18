const cloudName = 'dpvab3v9f';
const apiKey = '915544357637558';
const apiSecret = 'eQR7z9rrUXMTa2qjvScLyUdZrp4';

export const uploadToCloudinary = async (file) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    const str = `folder=portfolio&timestamp=${timestamp}${apiSecret}`;
    
    // Web Crypto API for SHA-1
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', 'portfolio');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    
    if (json.secure_url) {
      return json.secure_url;
    } else {
      console.error('Cloudinary Error:', json);
      throw new Error(json.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};
