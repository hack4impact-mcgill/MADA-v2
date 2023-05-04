import * as jwt from 'jsonwebtoken';
require('dotenv').config();
const TOKEN_KEY = process.env.TOKEN_KEY;

export const auth = async (request, response, next) => {
  try {
    // get the token
    const token = await request.headers.cookie
      .split(' ')
      .filter((item) => item.includes('TOKEN'))[0]
      .split('=')[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, TOKEN_KEY);

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
