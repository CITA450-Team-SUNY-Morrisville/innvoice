import jwt from 'jsonwebtoken';

const IsAuth = req => {
    console.log(req.headers);
    const authorization = req.headers["authorization"];
    if (!authorization) throw new Error("User is not authenticated. " + authorization);
    // Header will look like 'Bearer sskasfuif534729'
    const [ bearer, token] = authorization.split(' ')[1];
    const { userID } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userID;
}

export default IsAuth;