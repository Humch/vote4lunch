import express from 'express';

import { User } from '../../sequelize';

const router = express.Router();

router.post('/add', (req, res) => {
  if (req.body.password !== req.body.password_repeat) {
    res.json({ created: false, message: 'Submitted passwords are differents' });
  } else if (
    req.body.pseudo
    && req.body.email
    && req.body.password
    && req.body.password_repeat
  ) {
    User
      .create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.password,
      })
      .then(() => res.json({ created: true }))
      .catch(() => res.json({ created: 'error' }));
  } else {
    res.sendStatus(400);
  }
});

export default router;
