module.exports = (req, res, next) => {
    // if (!req.session.user) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    // next();
    if (req.session && req.session.user) {
        req.user = req.session.user; 
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
