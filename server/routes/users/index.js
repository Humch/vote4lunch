import express from 'express';

import User from '../../sequelize';

const router = express.Router();

router.post('/add', (req, res) => {
  if (
    req.body.pseudo
    && req.body.email
    && req.body.password
    && req.body.password_repeat
    && (req.body.password === req.body.password_repeat)
  ) {
    User
      .create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
      })
      .then(() => res.json({ created: 'success' }));
  } else {
    res.sendStatus(400);
  }
});

export default router;
