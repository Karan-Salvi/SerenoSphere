import express from 'express';
import {
  getPublicSessions,
  getMySessions,
  getMySession,
  saveDraft,
  publishSession,
  updateSession,
  deleteSession,
} from '../controllers/sessionController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPublicSessions);

// Protected routes (require authentication)
router.use(auth); // Apply auth middleware to all routes below

router.get('/my-sessions', getMySessions);
router.get('/my-sessions/:id', getMySession);
router.post('/my-sessions/save-draft', saveDraft);
router.post('/my-sessions/publish', publishSession);
router.put('/my-sessions/:id', updateSession);
router.delete('/my-sessions/:id', deleteSession);

export default router;