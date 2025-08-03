import Session from '../models/Session.js';

// Get all published sessions (public)
export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .populate('userId', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching public sessions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching sessions',
      error: error.message,
    });
  }
};

// Get user's own sessions (both drafts and published)
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching your sessions',
      error: error.message,
    });
  }
};

// Get a single user session by ID
export const getMySession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found',
      });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching session',
      error: error.message,
    });
  }
};

// Save or update a draft session
export const saveDraft = async (req, res) => {
  try {
    const { title, description, tags, jsonFileUrl } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Session title is required',
      });
    }

    const sessionData = {
      userId: req.user._id,
      title: title.trim(),
      description: description?.trim() || '',
      tags: tags || [],
      jsonFileUrl: jsonFileUrl?.trim() || '',
      status: 'draft',
    };

    const session = await Session.create(sessionData);

    res.status(201).json({
      status: 'success',
      message: 'Draft saved successfully',
      session,
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error saving draft',
      error: error.message,
    });
  }
};

// Publish a session
export const publishSession = async (req, res) => {
  try {
    const { title, description, tags, jsonFileUrl } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Session title is required',
      });
    }

    const sessionData = {
      userId: req.user._id,
      title: title.trim(),
      description: description?.trim() || '',
      tags: tags || [],
      jsonFileUrl: jsonFileUrl?.trim() || '',
      status: 'published',
    };

    const session = await Session.create(sessionData);

    res.status(201).json({
      status: 'success',
      message: 'Session published successfully',
      session,
    });
  } catch (error) {
    console.error('Error publishing session:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error publishing session',
      error: error.message,
    });
  }
};

// Update a session
export const updateSession = async (req, res) => {
  try {
    const { title, description, tags, jsonFileUrl, status } = req.body;
    const sessionId = req.params.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Session title is required',
      });
    }

    const session = await Session.findOne({
      _id: sessionId,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found',
      });
    }

    // Update session fields
    session.title = title.trim();
    session.description = description?.trim() || '';
    session.tags = tags || [];
    session.jsonFileUrl = jsonFileUrl?.trim() || '';
    if (status) {
      session.status = status;
    }

    await session.save();

    res.status(200).json({
      status: 'success',
      message: 'Session updated successfully',
      session,
    });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating session',
      error: error.message,
    });
  }
};

// Delete a session
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        status: 'error',
        message: 'Session not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Session deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting session',
      error: error.message,
    });
  }
};