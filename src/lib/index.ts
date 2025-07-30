// place files you want to import through the `$lib` alias in this folder.

// API exports
export { API_CONFIG, apiRequest } from './api/config.js';
export { apiService, MOCK_CONFIG } from './api/mockApiService.js';
export { generatePlaceholderImage, getImageUrl, isMockImage } from './api/imageUtils.js';
export type { Workout, Motion, Avatar, ApiResponse, PaginatedResponse } from './api/types.js';

// Re-export mock data for testing purposes
export { mockWorkouts, mockMotions, mockAvatars } from './api/mockData.js';