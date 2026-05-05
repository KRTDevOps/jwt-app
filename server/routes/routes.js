import express from 'express';
import { login, register } from '../controllers/authcontroller.js';
import { verifyToken } from '../middleware/jwtmiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ msg: "Welcome", user: req.user });
});

export default router;