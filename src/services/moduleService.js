import { useApi } from '../hooks/useApi';

export const useModuleService = () => {
  const api = useApi();

  const getModules = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/modules?${queryString}`);
  };

  const getModuleById = async (moduleId) => {
    return api.get(`/modules/${moduleId}`);
  };

  const createModule = async (moduleData) => {
    return api.post('/modules', moduleData);
  };

  const updateModule = async (moduleId, moduleData) => {
    return api.put(`/modules/${moduleId}`, moduleData);
  };

  const deleteModule = async (moduleId) => {
    return api.del(`/modules/${moduleId}`);
  };

  const getModuleContent = async (moduleId) => {
    return api.get(`/modules/${moduleId}/content`);
  };

  const updateModuleContent = async (moduleId, content) => {
    return api.put(`/modules/${moduleId}/content`, { content });
  };

  const getModuleResources = async (moduleId) => {
    return api.get(`/modules/${moduleId}/resources`);
  };

  const addModuleResource = async (moduleId, resourceData) => {
    const formData = new FormData();
    
    // Handle file uploads
    if (resourceData.file) {
      formData.append('file', resourceData.file);
    }
    
    // Add other resource data
    Object.keys(resourceData).forEach(key => {
      if (key !== 'file') {
        formData.append(key, resourceData[key]);
      }
    });
    
    return api.post(`/modules/${moduleId}/resources`, formData);
  };

  const deleteModuleResource = async (moduleId, resourceId) => {
    return api.del(`/modules/${moduleId}/resources/${resourceId}`);
  };

  const getModuleQuizzes = async (moduleId) => {
    return api.get(`/modules/${moduleId}/quizzes`);
  };

  const submitQuiz = async (moduleId, quizId, answers) => {
    return api.post(`/modules/${moduleId}/quizzes/${quizId}/submit`, { answers });
  };

  const getQuizResults = async (moduleId, quizId) => {
    return api.get(`/modules/${moduleId}/quizzes/${quizId}/results`);
  };

  return {
    getModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
    getModuleContent,
    updateModuleContent,
    getModuleResources,
    addModuleResource,
    deleteModuleResource,
    getModuleQuizzes,
    submitQuiz,
    getQuizResults,
  };
}; 