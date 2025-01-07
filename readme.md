# JWT Authentication in Node.js with TypeScript

A basic Node.js application demonstrating JWT-based authentication, written in TypeScript.

## Features

- **Login**: Generates a JWT token for a dummy user.
- **Protected Route**: Access restricted to requests with a valid JWT.
- **Middleware**: Verifies and attaches decoded JWT data to the request object.

## Installation

### Step 1: Clone the repository
```bash
git clone https://github.com/afiefsky/jwt-typescript.git
cd jwt-typescript
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Create a `.env` file
```bash
touch .env
```

Add the following content to `.env`:
```env
JWT_SECRET=your_secret_key_here
```

### Step 4: Run the development server
```bash
npm run dev
```

## Endpoints

### POST `/login`
Generates a JWT token for a dummy user.

#### Request
No body required.

#### Response
```json
{
  "token": "your-jwt-token"
}
```

---

### GET `/protected`
Access restricted to requests with a valid JWT.

#### Headers
```plaintext
Authorization: Bearer <your-jwt-token>
```

#### Response
- Success:
  ```json
  "This is a protected route, accessible only with a valid JWT."
  ```
- Failure: HTTP 403 Forbidden

---

## Scripts

### Start the development server
```bash
npm run dev
```

### Compile TypeScript and run the production build
```bash
npm start
```

---

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **jsonwebtoken**
- **dotenv**

---

Feel free to contribute or raise issues for improvements! 🎉

