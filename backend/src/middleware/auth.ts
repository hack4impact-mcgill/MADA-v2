import * as jwt from 'jsonwebtoken';
const TOKEN_KEY = "hack4impactmcgillmada"

export const auth = async (request, response, next) => {
    try {
        // get the token from the authorization header
        const token = await request.headers.authorization.split(" ")[1];
        
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
            error: new Error("Invalid request!"),
        });
    }
};
