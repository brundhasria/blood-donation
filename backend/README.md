# Blood Donation Portal Backend

Node.js, Express, and MongoDB backend for the Blood Donation Portal.

## Features

- Register donor
- Store donor details in MongoDB
- Search donors by blood group and city
- Submit blood request form
- Admin login with JWT
- Protected admin routes for viewing all donors and requests

## Setup

1. Open the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from the example:

```bash
copy .env.example .env
```

4. Make sure MongoDB is running locally, or replace `MONGO_URI` in `.env` with your MongoDB Atlas connection string.

5. Start the server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## API Endpoints

### Register Donor

```http
POST /api/donors
```

Body:

```json
{
  "name": "Rahul Kumar",
  "age": 25,
  "bloodGroup": "O+",
  "city": "Chennai",
  "phone": "9876543210",
  "email": "rahul@example.com",
  "availability": true
}
```

### Search Donors

```http
GET /api/donors/search?bloodGroup=O%2B&city=Chennai
```

### Submit Blood Request

```http
POST /api/requests
```

Body:

```json
{
  "patientName": "Anita",
  "bloodGroup": "B+",
  "hospital": "City Hospital",
  "city": "Chennai",
  "contact": "9876543210"
}
```

### Admin Login

```http
POST /api/admin/login
```

Body:

```json
{
  "email": "admin@bloodportal.com",
  "password": "admin123"
}
```

Use the returned token for protected routes:

```http
Authorization: Bearer YOUR_TOKEN
```

### Get All Donors

```http
GET /api/donors
```

Protected admin route.

### Get All Blood Requests

```http
GET /api/requests
```

Protected admin route.
