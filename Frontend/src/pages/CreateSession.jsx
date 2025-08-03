import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useSaveDraftMutation, 
  usePublishSessionMutation, 
  useGetMySessionQuery,
  useUpdateSessionMutation 
} from '../store/api/sessionApi';
import Layout from '../components/Layout/Layout';
import { Save, Upload, Loader2, CheckCircle } from 'lucide-react';

const CreateSession = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    jsonFileUrl: '',
  });
  
  const [saveDraft, { isLoading: isSavingDraft }] = useSaveDraftMutation();
  const [publishSession, { isLoading: isPublishing }] = usePublishSessionMutation();
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();
  const { data: existingSession, isLoading: isLoadingSession } = useGetMySessionQuery(id, {
    skip: !isEdit,
  });
  
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const autoSaveTimeoutRef = useRef(null);
  const initialLoadRef = useRef(false);

  // Load existing session data for editing
  useEffect(() => {
    if (isEdit && existingSession && !initialLoadRef.current) {
      setFormData({
        title: existingSession.title || '',
        description: existingSession.description || '',
        tags: existingSession.tags ? existingSession.tags.join(', ') : '',
        jsonFileUrl: existingSession.jsonFileUrl || '',
      });
      initialLoadRef.current = true;
    }
  }, [isEdit, existingSession]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && formData.title.trim()) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(async () => {
        try {
          setAutoSaveStatus('saving');
          const sessionData = {
            title: formData.title,
            description: formData.description,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            jsonFileUrl: formData.jsonFileUrl,
          };

          if (isEdit) {
            await updateSession({ id, ...sessionData }).unwrap();
          } else {
            await saveDraft(sessionData).unwrap();
          }
          
          setAutoSaveStatus('saved');
          setHasUnsavedChanges(false);
          
          setTimeout(() => {
            setAutoSaveStatus('');
          }, 2000);
        } catch (error) {
          setAutoSaveStatus('error');
          console.error('Auto-save failed:', error);
        }
      }, 5000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, hasUnsavedChanges, isEdit, id, saveDraft, updateSession]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (initialLoadRef.current || !isEdit) {
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    try {
      const sessionData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        jsonFileUrl: formData.jsonFileUrl,
      };

      if (isEdit) {
        await updateSession({ id, ...sessionData }).unwrap();
      } else {
        await saveDraft(sessionData).unwrap();
      }
      
      setHasUnsavedChanges(false);
      navigate('/my-sessions');
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const sessionData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        jsonFileUrl: formData.jsonFileUrl,
      };

      if (isEdit) {
        await updateSession({ id, ...sessionData, status: 'published' }).unwrap();
      } else {
        await publishSession(sessionData).unwrap();
      }
      
      setHasUnsavedChanges(false);
      navigate('/my-sessions');
    } catch (error) {
      console.error('Failed to publish session:', error);
    }
  };

  if (isEdit && isLoadingSession) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Session' : 'Create a New Session'}
            </h1>
            <p className="text-gray-600 mt-2 flex items-center space-x-2">
              <span>Draft your wellness session below. Your progress is saved automatically.</span>
              {autoSaveStatus && (
                <span className="flex items-center space-x-1">
                  {autoSaveStatus === 'saving' && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span className="text-sm text-blue-600">Saving...</span>
                    </>
                  )}
                  {autoSaveStatus === 'saved' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Saved</span>
                    </>
                  )}
                  {autoSaveStatus === 'error' && (
                    <span className="text-sm text-red-600">Save failed</span>
                  )}
                </span>
              )}
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Session Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Morning Mindfulness Meditation"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Describe your session..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-field"
                placeholder="Yoga, Meditation, Beginner"
              />
              <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
            </div>

            <div>
              <label htmlFor="jsonFileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                JSON File URL
              </label>
              <input
                type="url"
                id="jsonFileUrl"
                name="jsonFileUrl"
                value={formData.jsonFileUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/session.json"
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft || isUpdating}
                className="btn-secondary flex items-center space-x-2"
              >
                {(isSavingDraft || isUpdating) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Draft</span>
              </button>
              
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || isUpdating || !formData.title.trim()}
                className="btn-primary flex items-center space-x-2"
              >
                {(isPublishing || isUpdating) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span>Publish Session</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSession;