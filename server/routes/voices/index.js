import express from 'express';

import { Vote, Voice } from '../../sequelize';

const router = express.Router();

// Add a Voice
router.post('/add', (req, res) => {
  if (req.body.vote_id && req.body.place_id && req.body.pseudo && req.body.email) {
    Voice.create({
      voteId: req.body.vote_id,
      placeId: req.body.place_id,
      pseudo: req.body.pseudo,
      email: req.body.email,
    }).then(() => {
      res.json({ vote: true });
    });
  } else {
    res.sendStatus(400);
  }
});

// Return the sum of voices for a vote and a place
router.get('/count/all', (req, res) => {
  Voice.findAndCountAll({
    where: {
      voteId: req.query.vote_id,
      placeId: req.query.place_id
    }
  }).then((voices) => {
    res.json(voices);
  });
});

// Verify if a user have voted for a vote
router.get('/count/foruser', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.query.vote_url
      }
    })
    .then(vote => Voice.findAndCountAll({
      where: {
        voteId: vote.id,
        pseudo: req.query.pseudo,
        email: req.query.email
      }
    }).then((result) => {
      if (result.count === 0) {
        res.json({
          vote_id: vote.id,
          pseudo: req.query.pseudo,
          email: req.query.email,
          vote: false,
        });
      } else {
        res.json({
          vote_id: vote.id,
          pseudo: req.query.pseudo,
          email: req.query.email,
          vote: true,
        });
      }
    }));
});

// Verify if a user have voted for a vote
router.post('/count/all/foruser', (req, res) => {
  const request = JSON.parse(req.body.votes_url);

  const resultPromises = request.map(voteUrl => Vote
    .findOne({
      where: {
        url: voteUrl
      }
    })
    .then(vote => Voice
      .findAndCountAll({
        where: {
          voteId: vote.id,
          pseudo: req.body.pseudo,
          email: req.body.email
        }
      })
      .then((result) => {
        if (result.count === 0) {
          return {
            vote_id: vote.id,
            pseudo: req.body.pseudo,
            email: req.body.email,
            vote: false,
          };
        }
        return {
          vote_id: vote.id,
          pseudo: req.body.pseudo,
          email: req.body.email,
          vote: true,
        };
      })));
  Promise.all(resultPromises).then((resultToSend) => {
    res.json(resultToSend);
  });
});

// Get all voices for a vote URL
router.get('/get/foruser', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.query.vote_url
      }
    })
    .then(vote => Voice
      .findAll({
        where: {
          voteId: vote.id,
          pseudo: req.query.pseudo,
          email: req.query.email
        }
      })
      .then(result => res.json(result)));
});

// Get all voices for an array of votes URL
router.get('/get/all/foruser', (req, res) => {
  const request = JSON.parse(req.query.votes_url);
  const resultPromises = request.map(voteUrl => Vote
    .findOne({
      where: {
        url: voteUrl
      }
    })
    .then(vote => Voice
      .findAll({
        where: {
          voteId: vote.id,
          pseudo: req.query.pseudo,
          email: req.query.email
        }
      })
      .then(result => result)));
  Promise.all(resultPromises).then((result) => {
    const resultToSend = [].concat(...result);
    res.json(resultToSend);
  });
});

// Get all voices for a vote URL
router.get('/get/all/forvote', (req, res) => {
  Vote
    .findOne({
      where: {
        url: req.query.vote_url
      }
    })
    .then(vote => Voice
      .findAll({
        where: {
          voteId: vote.id
        }
      })
      .then(result => res.json(result)));
});

export default router;
