import jwt from 'jsonwebtoken';

export const CreateAccessToken = userID => {
    const payload = {
        ID: userID//,
        //role: 'admin'
    };

    // Create token using the payload, token secret, set it to expire in an hour.
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
};

export const CreateRefreshToken = userID => {
    const payload = {
        ID: userID//,
        //role: 'admin'
        // version: i     // Value that increments with every new refresh token given so you cannot use a previous token.
    };

    // Create token using the payload, token secret, set it to expire in an hour.
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
};

export const SendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken: accessToken//,
        //email: req.body.email
    })
};

export const SendRefreshToken = (res, refreshToken) => {
    // Named something secret so its harder to spoof. for testing make it easilly findable.
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        //path: 'routes/tokens/refresh_token',
        sameSite: 'strict',
        secure: true
    })
};
