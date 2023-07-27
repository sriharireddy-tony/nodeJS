const User = require('../Models/Register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {accessSecretKey, refreshSecretKey} = require('../Config/secretKey');

exports.register = async (req, res) => {
  // try {
  // Check if user already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(403).json({ message: 'Email already exists' });
  }
  const existingMobile = await User.findOne({ mobileNo: req.body.mobileNo });
  if (existingMobile) {
    return res.status(403).json({ message: 'Mobile Number already exists' });
  }
  const existingTeamname = await User.findOne({ teamName: req.body.teamName });
  if (existingTeamname) {
    return res.status(403).json({ message: 'Team Name not available' });
  }

  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(req.body.password, salt).then(hashedPassword => {
    if (hashedPassword) {
      req.body.password = hashedPassword;
    }
  })

  await User.create(req.body).then(userResponse => {
    if (userResponse && userResponse._id) {
      res.status(201).json({ statusCode: 201, message: 'User registered successfully', data: userResponse });
    }
  }).catch(err => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new user by using save method
  //   const user = new User(req.body);
  //   await user.save();

  //   res.status(201).json({statusCode:201, message: 'User registered successfully' });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
};

exports.getRegister = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Data getting successfull', users });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const email = req.body.loginemail;
  const password = req.body.loginpassword;

  try {
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      bcrypt.compare(password, existUser.password, function (err, bcryptRes) {
        if (!err && bcryptRes) {
          const accessToken = jwt.sign({ id: existUser._id, name: existUser.name, role: existUser.isAdmin }, accessSecretKey, { expiresIn: '3s' });
          const refreshToken = jwt.sign({ id: existUser._id, name: existUser.name, role: existUser.isAdmin }, refreshSecretKey, { expiresIn: '10s' });
          res.json({ status: 'ok', data: { accessToken, refreshToken, existUser } });
        } else if (!bcryptRes) {
          res.status(401).json({ data: { existUser, bcryptRes }, message: 'Invalid Credentials' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.deleteUser = async(req,res) =>{
    try {
      const userId = req.params._id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
}

exports.refreshToken = async (req, res) => {
  // debugger;
  const { id, name, role } = req.decodedRefreshToken;
  const accessToken = jwt.sign({ id, name, role }, accessSecretKey, { expiresIn: '7s' });
  return res.status(200).json({ accessToken });
};