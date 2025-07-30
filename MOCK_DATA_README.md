# Mock Data Provider Documentation

This project includes a comprehensive mock data provider that serves as a fallback when the real API is not accessible.

## Overview

The mock data provider automatically activates when:
1. The real API server is not running or not accessible
2. Network connectivity issues prevent API calls
3. Development/testing without backend setup

## Features

### Mock Data Included
- **3 Sample Workouts**: Full Body HIIT, Yoga Flow for Beginners, Upper Body Strength
- **4 Sample Motions**: Squat, Push-up, Plank, Deadlift
- **4 Sample Avatars**: Athletic Male, Yoga Female, Casual Male, Senior Female

### API Methods Available
- `getWorkouts(page, pageSize)` - Paginated workout listings
- `getWorkout(id)` - Single workout details
- `getMotions(page, pageSize)` - Paginated motion listings
- `getMotion(id)` - Single motion details
- `getAvatars(page, pageSize)` - Paginated avatar listings
- `getAvatar(id)` - Single avatar details
- `searchWorkouts(query)` - Search workouts by name/description
- `searchMotions(query)` - Search motions by name/description

### Visual Indicators
- Automatic warning banner when mock data is active
- Clickable banner shows detailed information
- Refresh button to retry API connection

## Usage

### Basic Usage
```typescript
import { apiService } from '$lib';

// Get workouts - automatically uses mock data if API unavailable
const workouts = await apiService.getWorkouts(1, 10);

// Check if using mock data
const isMock = apiService.isUsingMockData();

// Force refresh API connection
await apiService.refreshApiStatus();
```

### Image Handling
The mock data includes utility functions for handling images:

```typescript
import { getImageUrl, isMockImage } from '$lib';

// Get appropriate image URL (handles both real and mock data)
const imageUrl = getImageUrl(workout.screenshot, 'workout', workout.id);

// Check if using placeholder image
const isPlaceholder = isMockImage(workout.screenshot);
```

### Configuration
You can configure mock data behavior in `src/lib/api/mockApiService.ts`:

```typescript
export const MOCK_CONFIG = {
    enabled: true,        // Enable/disable mock data fallback
    showMockWarning: true, // Show/hide warning banner
    delay: 500           // Simulate network delay (ms)
};
```

## Demo Page

Visit `/demo` to see the mock data in action with a visual demonstration of all available sample data.

## Development

### Adding New Mock Data
1. Add new items to the appropriate array in `src/lib/api/mockData.ts`
2. Ensure all required fields are included based on TypeScript interfaces
3. Update the demo page if needed

### Testing with Real API
1. Start your backend API server
2. The mock provider will automatically detect the real API
3. Set `MOCK_CONFIG.enabled = false` to disable mock data entirely

## File Structure

```
src/lib/api/
├── types.ts          # TypeScript interfaces
├── config.ts         # Original API configuration
├── mockData.ts       # Sample data arrays
├── mockApiService.ts # Enhanced API service with fallback
└── imageUtils.ts     # Image handling utilities
```

## Troubleshooting

### Mock Data Not Loading
- Check browser console for error messages
- Ensure `MOCK_CONFIG.enabled` is set to `true`
- Verify TypeScript compilation succeeds

### Images Not Displaying
- Mock data uses placeholder images from placeholder.com
- Check internet connectivity for placeholder images
- Use `getImageUrl()` utility for proper image handling