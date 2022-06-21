// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require('express');
const router = express.Router();


const Users = require('./users-model');
  // [GET] /api/users
router.get('/', (req, res, next) => {
  Users.find().then(result => {
    res.status(200).json(result);
  }).catch(err => next(err));
})
  // This endpoint is RESTRICTED: only authenticated clients
  // should have access.

  // response:
  // status 200
  // [
  //   {
  //     "user_id": 1,
  //     "username": "bob"
  //   },
  //   // etc
  // ]

  // response on non-authenticated:
  // status 401
  // {
  //   "message": "You shall not pass!"
  // }

module.exports = router;