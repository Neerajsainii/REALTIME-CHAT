import jwt from 'jsonwebtoken';
import user from '../models/userModel.js';

export const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    // Support formats: "Bearer <token>" or just the token
    let token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    if (token.length < 500) {
      const verifiedUser = jwt.verify(token, process.env.SECRET);
      const rootUser = await user
        .findOne({ _id: verifiedUser.id })
        .select('-password');
      req.token = token;
      req.rootUser = rootUser;
      req.rootUserId = rootUser._id;
    } else {
      let data = jwt.decode(token);
      req.rootUserEmail = data.email;
      const googleUser = await user
        .findOne({ email: req.rootUserEmail })
        .select('-password');
      req.rootUser = googleUser;
      req.token = token;
      req.rootUserId = googleUser._id;
    }
    next();
  } catch (error) {
    // console.log(error);
    res.json({ error: 'Invalid Token' });
  }
};
