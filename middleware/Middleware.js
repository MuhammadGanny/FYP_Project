import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
    }

    try {
      const decodedToken = jwt.verify(token, 'your_secret_key');
      const { userId, userType } = decodedToken;

      // Attach user data to the request object
      req.userData = { userId, userType };

      // Check if the user exists
      //const user = await User.findById(userId);
      const user = await User.findOne({ userID: userId });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized. User not found.' });
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle specific errors and provide detailed error messages
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Unauthorized. Token expired.' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
      } else {
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized. Token verification failed.' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized.' });
  }
};

export default { verifyToken };



// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
//     }

//     const tokenParts = token.split(' ');
//     if (tokenParts.length !== 2) {
//       return res.status(401).json({ error: 'Unauthorized. Malformed token.' });
//     }

//     const decodedToken = jwt.verify(tokenParts[1], 'your_secret_key', { algorithms: ['HS256'] });
//     const { userId, userType } = decodedToken;

//     // Attach user data to the request object
//     req.userData = { userId, userType };

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized. User not found.' });
//     }

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Unauthorized. Invalid token.' });
//   }
// };

// export default { verifyToken };




// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized.' });
//     }

//     const decodedToken = jwt.verify(token, 'your_secret_key');
//     const { userId, userType } = decodedToken;

//     // Attach user data to the request object
//     req.userData = { userId, userType };

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized.' });
//     }

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Unauthorized.' });
//   }
// };

// export default { verifyToken };
