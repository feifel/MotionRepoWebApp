// Utility functions for handling images when using mock data

// Generate placeholder images for mock data
export const generatePlaceholderImage = (type: 'workout' | 'motion' | 'avatar', id: string): string => {
	const baseUrl = 'https://via.placeholder.com';
	
	switch (type) {
		case 'workout':
			return `${baseUrl}/400x300/FF6B6B/FFFFFF?text=Workout+${id.split('-')[1]}`;
		case 'motion':
			return `${baseUrl}/400x300/4ECDC4/FFFFFF?text=Motion+${id.split('-')[1]}`;
		case 'avatar':
			return `${baseUrl}/400x300/45B7D1/FFFFFF?text=Avatar+${id.split('-')[1]}`;
		default:
			return `${baseUrl}/400x300/CCCCCC/FFFFFF?text=Placeholder`;
	}
};

// Get the appropriate image URL, handling both real and mock data
export const getImageUrl = (imagePath?: string, type?: 'workout' | 'motion' | 'avatar', id?: string): string => {
	if (!imagePath) {
		// Return placeholder if no image path provided and we have type/id
		if (type && id) {
			return generatePlaceholderImage(type, id);
		}
		return 'https://via.placeholder.com/400x300/CCCCCC/FFFFFF?text=No+Image';
	}

	// Handle mock data image paths
	if (imagePath.startsWith('/sample-')) {
		// For mock data, use placeholder images
		const actualType = imagePath.includes('workout') ? 'workout' : 
						  imagePath.includes('motion') ? 'motion' : 
						  imagePath.includes('avatar') ? 'avatar' : 'workout';
		return generatePlaceholderImage(actualType, id || 'default');
	}

	// Handle real API image paths
	if (imagePath.startsWith('http')) {
		return imagePath;
	}

	// Handle relative paths from API
	return `${imagePath}`;
};

// Check if we're using mock data based on image path
export const isMockImage = (imagePath?: string): boolean => {
	return !imagePath || imagePath.startsWith('/sample-') || imagePath.includes('placeholder.com');
};