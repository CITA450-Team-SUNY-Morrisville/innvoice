
import jwt from 'jsonwebtoken';

// Middleware function to verify if the user is authenticated
const IsAuth = req => {
    console.log(req.headers); // Log request headers for debugging purposes
    const authorization = req.headers["authorization"]; // Retrieve the authorization header
    if (!authorization) throw new Error("User is not authenticated. " + authorization); // If no authorization header, throw an error
    // Header format: 'Bearer <token>'
    const [bearer, token] = authorization.split(' ')[1];
    const { userID } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the JWT token with the secret
    return userID; // Return the user ID if verified
}

export default IsAuth;
