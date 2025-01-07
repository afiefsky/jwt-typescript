import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Initialize dotenv to read from .env file
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// User type for the payload
interface User {
  id: number;
  username: string;
}

// Function to generate JWT
const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return token;
};

// Middleware to authenticate JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    res.sendStatus(403); // Forbidden if no token is present
    return; // Add `return` to explicitly terminate the function
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return; // Add `return` to explicitly terminate the function
    }

    // Attach user info to request object
    (req as any).user = user;
    next();
  });
};

// Dummy login route to get JWT
app.post('/login', (req: Request, res: Response): void => {
  const user: User = {
    id: 1,
    username: 'john_doe',
  };

  const token = generateToken(user);
  res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req: Request, res: Response): void => {
  res.send('This is a protected route, accessible only with a valid JWT');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
