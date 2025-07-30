import { API_CONFIG, apiRequest } from './config.js';
import { mockWorkouts, mockMotions, mockAvatars } from './mockData.js';
import type { Workout, Motion, Avatar, ApiResponse, PaginatedResponse } from './types.js';

// Configuration for mock data usage
export const MOCK_CONFIG = {
	enabled: true, // Set to false to disable mock data fallback
	showMockWarning: true,
	delay: 500 // Simulate network delay for mock data
};

// Check if API is available
async function checkApiAvailability(): Promise<boolean> {
	if (!MOCK_CONFIG.enabled) return true;
	
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3000);
		
		const response = await fetch(`${API_CONFIG.baseUrl}/health`, {
			method: 'GET',
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
		clearTimeout(timeoutId);
		return response.ok;
	} catch {
		return false;
	}
}

// Simulate network delay for mock data
function simulateDelay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Enhanced API service with mock fallback
export class MockApiService {
	private useMockData = false;
	private apiAvailable = true;

	constructor() {
		this.initialize();
	}

	private async initialize() {
		if (MOCK_CONFIG.enabled) {
			this.apiAvailable = await checkApiAvailability();
			this.useMockData = !this.apiAvailable;
			
			if (this.useMockData && MOCK_CONFIG.showMockWarning) {
				console.warn('⚠️ Using mock data - API server is not available');
			}
		}
	}

	// Workout API methods
	async getWorkouts(page = 1, pageSize = 10): Promise<PaginatedResponse<Workout>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const paginatedWorkouts = mockWorkouts.slice(startIndex, endIndex);
			
			return {
				success: true,
				data: paginatedWorkouts,
				total: mockWorkouts.length,
				page,
				pageSize,
				totalPages: Math.ceil(mockWorkouts.length / pageSize)
			};
		}

		try {
			return await apiRequest(`/workouts?page=${page}&pageSize=${pageSize}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getWorkouts(page, pageSize);
			}
			throw error;
		}
	}

	async getWorkout(id: string): Promise<ApiResponse<Workout>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const workout = mockWorkouts.find(w => w.id === id);
			if (!workout) {
				return {
					success: false,
					error: 'Workout not found'
				};
			}

			return {
				success: true,
				data: workout
			};
		}

		try {
			return await apiRequest(`/workouts/${id}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getWorkout(id);
			}
			throw error;
		}
	}

	// Motion API methods
	async getMotions(page = 1, pageSize = 10): Promise<PaginatedResponse<Motion>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const paginatedMotions = mockMotions.slice(startIndex, endIndex);
			
			return {
				success: true,
				data: paginatedMotions,
				total: mockMotions.length,
				page,
				pageSize,
				totalPages: Math.ceil(mockMotions.length / pageSize)
			};
		}

		try {
			return await apiRequest(`/motions?page=${page}&pageSize=${pageSize}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getMotions(page, pageSize);
			}
			throw error;
		}
	}

	async getMotion(id: string): Promise<ApiResponse<Motion>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const motion = mockMotions.find(m => m.id === id);
			if (!motion) {
				return {
					success: false,
					error: 'Motion not found'
				};
			}

			return {
				success: true,
				data: motion
			};
		}

		try {
			return await apiRequest(`/motions/${id}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getMotion(id);
			}
			throw error;
		}
	}

	// Avatar API methods
	async getAvatars(page = 1, pageSize = 10): Promise<PaginatedResponse<Avatar>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const paginatedAvatars = mockAvatars.slice(startIndex, endIndex);
			
			return {
				success: true,
				data: paginatedAvatars,
				total: mockAvatars.length,
				page,
				pageSize,
				totalPages: Math.ceil(mockAvatars.length / pageSize)
			};
		}

		try {
			return await apiRequest(`/avatars?page=${page}&pageSize=${pageSize}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getAvatars(page, pageSize);
			}
			throw error;
		}
	}

	async getAvatar(id: string): Promise<ApiResponse<Avatar>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const avatar = mockAvatars.find(a => a.id === id);
			if (!avatar) {
				return {
					success: false,
					error: 'Avatar not found'
				};
			}

			return {
				success: true,
				data: avatar
			};
		}

		try {
			return await apiRequest(`/avatars/${id}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.getAvatar(id);
			}
			throw error;
		}
	}

	// Search functionality
	async searchWorkouts(query: string): Promise<PaginatedResponse<Workout>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const filtered = mockWorkouts.filter(workout => 
				workout.name?.toLowerCase().includes(query.toLowerCase()) ||
				workout.description?.toLowerCase().includes(query.toLowerCase()) ||
				workout.categories?.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
				workout.bodyParts?.some(part => part.toLowerCase().includes(query.toLowerCase()))
			);

			return {
				success: true,
				data: filtered,
				total: filtered.length,
				page: 1,
				pageSize: filtered.length,
				totalPages: 1
			};
		}

		try {
			return await apiRequest(`/workouts/search?q=${encodeURIComponent(query)}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.searchWorkouts(query);
			}
			throw error;
		}
	}

	async searchMotions(query: string): Promise<PaginatedResponse<Motion>> {
		if (this.useMockData) {
			await simulateDelay(MOCK_CONFIG.delay);
			
			const filtered = mockMotions.filter(motion => 
				motion.name?.toLowerCase().includes(query.toLowerCase()) ||
				motion.description?.toLowerCase().includes(query.toLowerCase()) ||
				motion.categories?.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
				motion.bodyParts?.some(part => part.toLowerCase().includes(query.toLowerCase()))
			);

			return {
				success: true,
				data: filtered,
				total: filtered.length,
				page: 1,
				pageSize: filtered.length,
				totalPages: 1
			};
		}

		try {
			return await apiRequest(`/motions/search?q=${encodeURIComponent(query)}`);
		} catch (error) {
			if (MOCK_CONFIG.enabled) {
				this.useMockData = true;
				return this.searchMotions(query);
			}
			throw error;
		}
	}

	// Utility methods
	isUsingMockData(): boolean {
		return this.useMockData;
	}

	async refreshApiStatus(): Promise<boolean> {
		this.apiAvailable = await checkApiAvailability();
		this.useMockData = !this.apiAvailable;
		return this.apiAvailable;
	}
}

// Create a singleton instance
export const apiService = new MockApiService();