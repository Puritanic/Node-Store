const mongoose = require('mongoose');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Register' });
};
// Note: all middleware need to have next() method on themselves
exports.validateRegister = (req, res, next) => {
    /**
     * We have to build a middleware like this because malicious user can turn off HTML5 required attribute and then
     * try to submit the form with invalid data. Bcs of that server side validation is the must.
     * @sanitizeBody from express validator in App.js
     */
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'You must supply a valid email address!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Password cannot be blank!').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords don\'t match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
        return; // Stop the function from executing
    }
    next(); // there were no errors
    
};
