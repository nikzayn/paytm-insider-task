# Frontend Guide
- In this guide, the user have to upload an image file of exact dimensions

## Overview
- Design Thoughts
- Technologies Used
- Tutorial

### Design Thoughts
- Firstly, I have created a UI/UX which gives a representation to upload image files easily.
- After, uploading an image file, the user will get updated images in default dimensions.
- The default dimensionw are of type **horizontal**, **vertical**, **horizontal-small** and **gallery**.
- Below that, there will be a UI representation where a user can easily crop the image according to his custom preferences.
- There should be a button below the file upload where a user can toggle to next dimension.
- After, submitting the upload image, it should give transformed image serving from the **cloudinary** image hosting server.

### Technologies Used
- Docker
- Docker Compose
- ReactJS
- Lodash
- React-Dropzone-Uploader
- Axios
- React-Image-Crop

### Tutorial
- When the web app gets load on the browser successfully, just upload the image file of exact dimensions **(1024X1024)**
- After the file got uploaded on the server, the UI should be rendered on the screen with two buttons, four images and an environemnt to crop the image.
- After that, click on the next button to proceed further via saving the previous image dimensions.
- After successfully saving the selected image dimensions, hit **submit** button to submit the files on server.
- Meanwhile, whole screen will just give an UI of all the transformed images of custom dimensions.
