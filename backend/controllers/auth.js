const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  try{
    if (req.user) {
      res.status(200).json('logged in user');
    }
  }catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
}
};

exports.postLogin = async (req, res, next) => {
  const validationErrors = [];
  try{
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return  res.status(400).json({ 
              error: error.message,
              details: error.errors ? Object.values(error.errors).map(err => err.message) : []
      });
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.status(400).json();
      }
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        const user = await User.findOne({ email: req.body.email });
        res.json({
          success: true,
          user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role
          },
        });
        });
    })(req, res, next);
  } catch(error){
    console.log(error)
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    return res.status(200).json("successfull logout");

  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.status(200).json("successfull sign-up");
  }
   res.status(400).json();
};

exports.postSignup = async (req, res, next) => {
  try {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.status(400).json();
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });
      // Updated findOne usage with async/await
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }]
      });
  
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.status(400).json('Cannot sign up');
      }

      // Save user with async/await
      await user.save();
  
      // Wrap req.logIn in a Promise
      await new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      res.json({
        success: true,
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role
        }
      });  
    } catch (err) {
      next(err);
    }
};
