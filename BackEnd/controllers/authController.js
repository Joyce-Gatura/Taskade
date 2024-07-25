
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                hashed_password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 'P2002') { // Prisma unique constraint violation
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'An error occurred during registration' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && await bcrypt.compare(password, user.hashed_password)) {
            const token = jwt.sign({ userId: user.user_id }, secret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

const checkAuth = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ isLoggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, secret);
        res.json({ isLoggedIn: true, userId: decoded.userId });
    } catch (error) {
        res.status(401).json({ isLoggedIn: false });
    }
};

const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, checkAuth, logout };
