# Paytm-Insider Task
- In this task, a user can upload image size of exact dimensions where there would be UI representation in which a user can update the dimensions according to his/her choice and also able get transformed images while uploading the images on a CDN.

## Overview
- System Requirements
- Tutorial
- Usage
- Issues
- Edge Cases

### System Requirements
- Docker
- Docker Compose

### Tutorial
- When the web app gets load on the browser successfully, just upload the image file of exact dimensions **(1024X1024)**
- After the file got uploaded on the server, the UI should be rendered on the screen with two buttons, four images and an environemnt to crop the image.
- After that, click on the next button to proceed further via saving the previous image dimensions.
- After successfully saving the selected image dimensions, hit **submit** button to submit the files on server.
- Meanwhile, whole screen will just give an UI of all the transformed images of custom dimensions.

### Usage
```
git clone https://github.com/nikzayn/paytm-insider-task.git
cp sample.env .env
sudo docker-compose build
sudo docker-compose up
```

### Issues
- Have not improved the web-app to be more mobile responsive.
- Code structure could have been improved on frontend.
- Uploaded Data doesn't have a persistant storage.
- Backend is an overkill for this simple task, it's storing clodinary credentials. But, according to use case backend seems minimal.

### Edge Cases
- Saving the image files on the cloud image hosting service called **Cloudinary**.
- Improved the UI for the image preview before image upload
- User can select custom dimension to upload the file on server.
- User can only be able to upload image dimension of **1024X1024**. There would be error message, while uploading the image file with different dimensions.
- Backend code is well maintained.
- Using cloudinary library to transform the images and get the exact response for the requested dimensions.
