import express from 'express';
import tvShowControllers from '../controllers/tvShow';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/getTvShowByTitle', auth as any, tvShowControllers.getTvShowByTitle);

export = router;
