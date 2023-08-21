const { Router, request, response } = require("express");
const passport = require('passport');
const { hashPassword, comparePassword } = require('../utils/helpers')
const User = require('../database/schemas/User')
const router = Router();

// router.post("/login", async (request, response) => {
//   const { email, password } = request.body;
//   if (email && password) {
//     const userDB = await User.findOne({ email })
//     if(!userDB) return response.sendStatus(401);
//     const isPasswordValid = await comparePassword(password, userDB.password);
//     if(!isPasswordValid) return response.status(400).send({msg: 'Invalid password'});
//     else {
//       console.log('Authentication successful');
//       request.session.user = userDB;
//       return response.status(200).send({msg: 'Login successful'});
//     }
//   } else response.sendStatus(401);
// });


router.post('/login',passport.authenticate('local') ,async (req, res) => {
  console.log('loggedin');
  return res.sendStatus(200);
});
router.post('/register', async (request, response) =>{
  const { username, password, email } = request.body;
  const userDB = await User.findOne({ email });
  if(userDB) {
    response.status(400).send({msg: 'user already exists'})
  } else {
    const password = hashPassword(request.body.password);
    const newUser = await User.create({ username, password, email});
    response.send(newUser);
  }
});

router.get('/github', passport.authenticate('github', {failWithError: true}));


router.get('/github/redirect',passport.authenticate('github', {failWithError: true}),
function(req, res) {
  res.redirect('/');
});

module.exports = router;
