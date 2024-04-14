import jwt from 'jsonwebtoken';

export const getUserIdFromToken = data => {
  const userToken = data.headers.authorization.split('Bearer')[1].trim();
  const decodedToken = jwt.decode(userToken);
  const userId = decodedToken.id;
  return { userId };
};