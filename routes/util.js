import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = password => {
    return new Promise((resolve, reject) => {
      // Generate a salt at level 12 strength
      bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
};

const createToken = user => {
    // Sign the JWT
    // if (!user.role) {
    //   throw new Error('No user role specified');
    // }
    return jwt.sign(
      {
        sub: user.id
      },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1h' }
    );
};

const verifyPassword = ( passwordAttempt, hashedPassword ) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
};

export { hashPassword, verifyPassword, createToken }