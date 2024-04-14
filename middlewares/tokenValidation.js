import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || 'tree-family-ll';


const tokenValidation = async (req, res, next) => {
  let response = {};
  try {
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header');
    }

    const userToken = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.verify(userToken, secretKey);
    next();
  } catch (error) {
    console.error('Error in tokenValidation.js');
    response.status = 401;
    response.message = error.message;
    return res.status(response.status).send(response);
  }
};

export default tokenValidation;