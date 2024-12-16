# **Search-files**

**Search-files** is an application designed to search and retrieve documents from a cloud storage service (e.g., Amazon S3). It allows users to search for specific content within the files stored in the cloud, making it easy to find the information you need without manually opening each document.

## Technologies Used

This project involves a [**Node.js** backend (server)](./server) and a [**React.js** frontend (client)](./client), both deployed on **Vercel**. Below are the key technologies used in the project:

### Backend
- **Node.js**: The server is built using Node.js to handle API requests, manage business logic.
- **Vercel**: The backend is deployed on Vercel for seamless serverless functions and scaling.

### Frontend
- **React.js**: The web application is built using React.js.
- **Vercel**: The frontend is deployed on Vercel to take advantage of its serverless hosting and automatic scaling capabilities.

### Cloud Services
- **AWS S3**: Used for storing files.
- **AWS OpenSearch**: AWS OpenSearch is used to index documents, allowing for efficient and powerful full-text search functionality within the application.

## **Deployed Application**

You can access the live version of the Search-files application here:

- https://search-files-client.vercel.app

## **API Endpoints**

The Search-file application uses the following API endpoint to search for files in the cloud storage:

### **Search Endpoint**

- **URL:** `https://search-files-server.vercel.app/search?q=@gmail.com`
- **Method:** `GET`
- **Description:** This endpoint allows you to search for content inside the documents stored in the cloud (e.g., S3).
  
  **Query Parameters:**
  - `Q`: The content you want to search for.
 


### **Upload File Endpoint**

- **URL**: `https://search-files-server.vercel.app/upload`
- **Method**: `POST`
- **Description**: This endpoint allows users to upload a document to the cloud storage (e.g., Amazon S3). The document will then be indexed for content-based searching. The upload has the following limitations:
  - **File Size Limit**: 5MB
  - **Allowed File Types**: `.txt`, `.pdf`, `.docx`

#### **Request Body**

The request should be sent with `multipart/form-data` encoding. The request body must include the following fields:

- `file`: The file to upload (must be in the allowed types and under the size limit).







