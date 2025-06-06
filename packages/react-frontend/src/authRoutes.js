import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users = []; // TODO: replace with real database
const secretKey = 'your-secret-key'; // In production, use environment variables!

// Signup route
router.post('/register', (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { email, password, firstname, lastname };
    users.push(newUser);

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ token });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

export default router;
