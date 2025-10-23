const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
};

export default cookieOptions;
