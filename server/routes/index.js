import express from 'express';

import voteRouter from './votes';
import voiceRouter from './voices';
import placeRouter from './places';
import userRouter from './users';

const router = express.Router();

router.use('/vote', voteRouter);

router.use('/voice', voiceRouter);

router.use('/place', placeRouter);

router.use('/user', userRouter);

export default router;
