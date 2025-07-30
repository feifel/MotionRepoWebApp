export const API_CONFIG = {
	baseUrl: 'https://localhost:7031', // Changed from https to http for development
	timeout: 10000,
	get headers() {
		const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
		return {
			'Content-Type': 'application/json',
			...(token && { 'Authorization': `Bearer ${token}` })
		};
	}
};

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
	const url = `${API_CONFIG.baseUrl}${endpoint}`;
	const config = {
		...options,
		headers: {
			...API_CONFIG.headers,
			...options.headers
		}
	};

	try {
		console.log('Making API request to:', url);
		const response = await fetch(url, config);
		
		if (!response.ok) {
			console.error('API response not OK:', response.status, response.statusText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		console.log('API response data:', data);
		return data;
	} catch (error) {
		console.error('API request failed:', error);
		throw error;
	}
}