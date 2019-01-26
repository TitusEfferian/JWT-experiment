import express from 'express'
import users from '../models/users';
import jwt from 'jsonwebtoken'
import { checkToken } from '../controller/checkToken';
var router = express.Router();


/* GET users listing. */
router.get('/',checkToken, function (req, res, next) {
  jwt.verify(req.token, 'privatekey', (err, data) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send({
        message: data
      })
    }
  })
});

router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (username === users.username && password === users.password) {
    jwt.sign({ users }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log('error')
        res.send(err)
      }
      res.send({
        token:token
      })
    })
  }
  else {
    res.send({
      message:'cannot login'
    })
  }
})



module.exports = router;
