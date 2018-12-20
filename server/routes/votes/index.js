import express from 'express';
import Sequelize from 'sequelize';

import { Place, Vote, User } from '../../sequelize';

const { Op } = Sequelize;

const router = express.Router();

// Return a random string to use it as a short URL
const makeid = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

// Create a vote and return vote data
router.post('/add', (req, res) => {
  if (
    req.body.date
    && req.body.end_date
    && req.body.pseudo
    && req.body.email
    && req.body.title
  ) {
    User
      .findOne({
        where: {
          pseudo: {
            [Op.eq]: req.body.pseudo
          },
        },
      }).then((result) => {
        if (result) {
          Vote
            .create({
              userId: result.id,
              title: req.body.title,
              date: req.body.date,
              end_date: req.body.end_date,
              url: makeid()
            })
            .then(vote => res.json(vote));
        } else {
          res.sendStatus(400);
        }
      });
  } else {
    res.sendStatus(400);
  }
});

// Get a vote from his url field and delete it
router.post('/del', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.body.vote_url
      }
    })
    .then(vote => vote.destroy())
    .then(() => res.json({ delete: true }));
});

// Get a vote from his url field and return it
router.get('/get', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.query.vote_url
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['pseudo', 'email'],
      }],
    })
    .then((vote) => {
      res.json(vote);
    });
});

// Get all votes from a user and return them
router.get('/get/mine', (req, res) => {
  User
    .findOne({
      where: {
        pseudo: {
          [Op.eq]: req.query.pseudo
        },
      },
    })
    .then((user) => {
      Vote
        .findAll({
          order: [
            ['date', 'ASC'],
          ],
          where: {
            userId: user.id
          }
        })
        .then((votes) => {
          res.json(votes);
        });
    });
});

// Add a place to a vote and return it
router.post('/add/place', (req, res) => {
  Vote
    .findById(req.body.vote_id)
    .then((vote) => {
      vote.updateAttributes({
        active: true
      });
      return vote;
    })
    .then((vote) => {
      Place.findById(req.body.place_id)
        .then((place) => {
          vote.addPlace(place);
          return place;
        }).then((place) => {
          res.json({ added: true, place: place.dataValues });
        });
    });
});

// Deactivate Vote instance if no places is associated with
async function makeThings(vote, place) {
  await vote.removePlace(place);
  await vote.getPlaces().then((places) => {
    if (places.length === 0) {
      vote.updateAttributes({
        active: false
      });
    }
  });
}

// Delete a place from a vote and return it
router.post('/del/place', (req, res) => {
  Vote
    .findById(req.body.vote_id)
    .then((vote) => {
      Place.findById(req.body.place_id)
        .then((place) => {
          makeThings(vote, place);
          return place;
        }).then(place => res.json({ deleted: true, place: place.dataValues }));
    });
});

// Get the list of places for a vote. Vote is find with url
router.post('/get/places/list', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.body.vote_url
      }
    })
    .then((vote) => {
      Place.findAll({
        include: {
          model: Vote,
          where: {
            id: vote.id
          }
        }
      }).then((places) => {
        res.json(places);
      });
    });
});

export default router;
