import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');
    const { userId, userType } = decodedToken;

    // Attach user data to the request object
    req.userData = { userId, userType };

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized.' });
  }
};

export default { verifyToken };
