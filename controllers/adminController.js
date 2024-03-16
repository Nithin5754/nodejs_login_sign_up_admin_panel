const Admindb = require('../models/adminmodel')
const User = require('../models/usermodel')



const adminCreate = async (req, res) => {
  const { username, password } = req.body
  console.log(username);
  console.log(password);

  try {
    const admin = await Admindb.findOne({ username });
    console.log(admin);

    if (!admin || admin.password != password) {
      res.redirect('/admin')
    } else {
      req.session.adminData = username
      res.redirect('/adminHome')
    }
  } catch (error) {
    console.log(error);

  }
}

const adminLoginPage = (req, res) => {
  if (req.session.adminData) {
    res.redirect('/adminHome')
  } else {
    res.status(200).render('adminViews/adminLogin')

  }
}

const adminHomePage = async (req, res) => {
  try {
    req.session.isAdminHomePage = true;
    const searchQuery = req.query.search || '';
    const sortOptions = {
      username: 1,

    }
    const user = await User.find({
      username: { $regex: new RegExp(searchQuery, 'i') },
    }).sort(sortOptions)
    console.log(user);
    res.status(200).render('adminViews/adminHome', { user })
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
// block 
const blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send("not found")
    }

    user.isBlocked = true;
    await user.save();
    res.redirect('/adminHome')
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');

  }
}
// unblock 
const UnBlockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send("not found")
    }

    user.isBlocked = false;
    await user.save();
    res.redirect('/adminHome')
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');

  }
}

// delete a single user
const deleteItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) {
      return res.status(404).send("not found ")
    }

    await User.findByIdAndDelete(userId);

    res.redirect('/adminHome')
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
// get user list
const getUpdateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('userViews/updateUser', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
//post reupdate list
const reUpdateUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateUserData = {
      username: req.body.username,
      email: req.body.email,
      // Add more fields to update as needed
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.set(updateUserData);
    await user.save();

    res.redirect('/adminHome');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


const adminSignOut = (req, res) => {
  req.session.destroy();
  res.redirect('/admin')
}


module.exports = {
  adminLoginPage,
  adminCreate,
  adminHomePage,
  adminSignOut,
  deleteItem,
  UnBlockUser,
  blockUser,
  getUpdateUser,
  reUpdateUsers

}