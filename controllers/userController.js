
const bcrypt = require('bcrypt')
const User = require('../models/usermodel')








const loginCreate = async (req, res) => {
   const { username, password } = req.body;
  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.render('userViews/login', { message: 'Invalid user' });
    }
    if (user.isBlocked) {
      return res.render('userViews/login', { message: 'the user is blocked' })
    }
    const unHashed = await bcrypt.compare(password, user.password)
    if (!unHashed) {
      return res.render('userViews/login', { message: 'Invalid password' });
    }
    req.session.data = username;
    res.redirect('/home');



  }
  catch (error) {
    console.error(error);
    res.status(500).render('userViews/login', {

      message: `internal server issue error code 500` || ''
    })
  }


}


const login = (req, res) => {

  if (req.session.data) {
    res.redirect('/home')
  }
  else {
    res.render('userViews/login', { message: '' })

  }

};


const homeSection = (req, res) => {

  res.status(200).render("userViews/home", {
    username: req.session.homeUsername
  })
}

const signUP = (req, res) => {

  if (req.session.data) {
    res.redirect('/home')
  } else if (req.session.existingUser) {
    req.session.existingUser = false;
    res.status(200).render('userViews/signup', { existingUserMsg: 'exiting user found please try another ' })
  }
  res.status(200).render("userViews/signup", {
    existingUserMsg: ''
  });
};

const signUPCreate = async (req, res) => {
  const { username, email, password, confirm_password} = req.body;

  req.session.homeUsername = username;

  if (password != confirm_password) {
    return res.redirect('/signup');
  }
  const existingUsers = await User.findOne({ username });
  if (existingUsers) {
    req.session.existingUser = true;
    return res.redirect('/signup');
  }


  if (req.session.isAdminHomePage) {
    req.session.isAdminHomePage = false;
    res.redirect('/adminHome');
  } else {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, username, password: hashedPassword });

    await user.save();

    res.redirect('/login');
  }
};


const userLogout = (req, res) => {



  req.session.destroy();
  res.redirect('/login')
}







module.exports = {

  login,
  signUP,
  signUPCreate,
  loginCreate,
  homeSection,
  userLogout,


};
