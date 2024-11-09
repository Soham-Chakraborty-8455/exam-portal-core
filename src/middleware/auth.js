module.exports = (req, res, next) => {
    // if (!req.session.user) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    // next();
    // console.log('Session:', req.session.user);
    // console.log('Is Authenticates:', req.session.isAuthenticated);
    if (req.session.user) {
        // req.user = req.session.user; 
        // res.json({message: req.session.user});
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
