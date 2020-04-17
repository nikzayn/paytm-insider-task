# Backend Guide
- In this guide, the user uploaded image would be transforming using **cloudinary image transformation**.

## Overview
- Design Thoughts
- Technologies Used

### Design Thoughts
- When a user uploads the file, the user should get the transformed images according to user's custom dimensions.
- After the file got uploaded on nodejs server, the file should first check that the user give the correct dimension of **1024X1024**.
- If the image size meets the default dimensions, the image file should be uploaded to the cloudinary platform.
- After being uploaded to the cloudinary platform, the image size would return the transformed images url.
- Note:- **Cloudinary is a cloud image hosting service.**

### Technologies Used
- Nodejs
- Express
- Cloudinary
- Multer
- Lodash
- Image size
- Nodemon


