# Setting Up Cloudinary for Image Hosting

This project uses Cloudinary for image hosting and optimization. Follow these steps to set up Cloudinary for your project:

## 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing up, you'll be taken to your dashboard where you can find your cloud name, API key, and API secret

## 2. Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist already)
2. Add the following environment variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Replace `your-cloud-name`, `your-api-key`, and `your-api-secret` with the values from your Cloudinary dashboard.

## 3. Upload Your Images to Cloudinary

There are several ways to upload images to Cloudinary:

### Option 1: Upload via the Cloudinary Dashboard

1. Go to your Cloudinary dashboard
2. Click on "Media Library" in the sidebar
3. Click "Upload" and select the images you want to upload
4. After uploading, you can click on an image to see its details, including the public ID

### Option 2: Upload via the Cloudinary API

You can use the Cloudinary API to upload images programmatically. Here's an example using Node.js:

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
cloudinary.uploader.upload('path/to/your/image.jpg', {
  folder: 'timeline', // Optional: organize images in folders
  public_id: 'elegant_interior', // Optional: set a custom public ID
}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
    // result.secure_url contains the URL of the uploaded image
  }
});
```

## 4. Use Cloudinary Images in Your Components

Once your images are uploaded to Cloudinary, you can use them in your components using the `CloudinaryImage` component:

```jsx
import CloudinaryImage from './CloudinaryImage';

// ...

<CloudinaryImage 
  src="https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/timeline/elegant_interior.jpg"
  alt="Elegant Interior"
  className="transition-all duration-500 hover:scale-105"
/>
```

## 5. Cloudinary Image Transformations

Cloudinary offers powerful image transformations that you can apply to your images. Here are some examples:

- Resize: `w_500,h_300`
- Crop: `c_fill,g_auto`
- Format conversion: `f_auto`
- Quality: `q_auto`

You can apply these transformations by adding them to the URL:

```
https://res.cloudinary.com/your-cloud-name/image/upload/w_500,h_300,c_fill,g_auto,f_auto,q_auto/timeline/elegant_interior.jpg
```

Or by using the `CloudinaryImage` component's transformation props.

## Benefits of Using Cloudinary

- Automatic image optimization
- Responsive images
- Image transformations
- Global CDN
- Adaptive delivery
- Automatic format selection
- Lazy loading
- Placeholder images

For more information, visit the [Cloudinary documentation](https://cloudinary.com/documentation). 