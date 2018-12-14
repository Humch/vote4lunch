import express from 'express';

import { User } from '../../sequelize';

const router = express.Router();

// add a user
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
      .catch(() => res.json({ created: false }));
  } else {
    res.sendStatus(400);
  }
});

// test if a user exists in database
router.get('/exists', (req, res) => {
  if (req.query.pseudo) {
    User
      .findOne({
        where: {
          pseudo: req.query.pseudo
        }
      })
      .then((result) => {
        if (!result) {
          res.json({ exist: false });
        } else {
          res.json({ exist: true });
        }
      });
  } else if (req.query.email) {
    User
      .findOne({
        where: {
          email: req.query.email
        }
      })
      .then((result) => {
        if (!result) {
          res.json({ exist: false });
        } else {
          res.json({ exist: true });
        }
      });
  } else {
    res.sendStatus(400);
  }
});

// login a user
router.post('/login', (req, res) => {
  if (req.body.pseudo) {
    User
      .findOne({
        where: {
          pseudo: req.body.pseudo,
        }
      })
      .then((user) => {
        if (!user) {
          res.json({ login: false });
        } else {
          const validPassword = User
            .prototype
            .validPassword(req.body.password, user.dataValues.password);
          if (validPassword) {
            res.json({
              login: true,
              pseudo: user.dataValues.pseudo,
              email: user.dataValues.email,
            });
          } else {
            res.json({ login: false });
          }
        }
      });
  } else {
    res.sendStatus(400);
  }
});

export default router;
