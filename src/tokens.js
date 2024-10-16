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

export const SendAccessToken = (res, accessToken) => {
    /*res.send({
        accessToken: accessToken//,
        //email: req.body.email
    })*/
    //res.clearCookie('accessToken');
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        //path: 'routes/tokens/refresh_token',
        sameSite: 'strict',
        secure: true
    })
};

export const SendRefreshToken = (res, refreshToken) => {
    // Named something secret so its harder to spoof. for testing make it easilly findable.
    // Revoke cookie then give again.
    //if (req.cookies.refreshToken) {
    //    res.clearCookie('refreshToken');
    //}
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        //path: 'routes/tokens/refresh_token',
        sameSite: 'strict',
        secure: true
    })
};
