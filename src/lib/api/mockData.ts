import type { Workout, Motion, Avatar } from './types.js';

// Sample workout data
export const mockWorkouts: Workout[] = [
	{
		id: 'workout-001',
		name: 'Full Body HIIT',
		description: 'A high-intensity interval training workout targeting all major muscle groups. Perfect for building endurance and burning calories.',
		difficulty: 'Intermediate',
		duration: 30,
		equipment: ['Dumbbells', 'Mat', 'Timer'],
		bodyParts: ['Full Body', 'Core', 'Legs', 'Arms'],
		muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Shoulders', 'Chest', 'Back'],
		categories: ['HIIT', 'Strength', 'Cardio'],
		exercises: ['Burpees', 'Squats', 'Push-ups', 'Mountain Climbers', 'Plank', 'Jumping Jacks'],
		file: '/sample-workouts/full-body-hiit.glb',
		screenshot: '/sample-images/workout-hiit.jpg',
		createdAt: '2024-01-15T10:30:00Z',
		updatedAt: '2024-01-15T10:30:00Z',
		createdBy: 'Demo User'
	},
	{
		id: 'workout-002',
		name: 'Yoga Flow for Beginners',
		description: 'A gentle yoga flow designed for beginners to improve flexibility, balance, and mindfulness.',
		difficulty: 'Beginner',
		duration: 45,
		equipment: ['Yoga Mat', 'Yoga Block'],
		bodyParts: ['Full Body', 'Spine', 'Hips', 'Shoulders'],
		muscleGroups: ['Core', 'Back', 'Hip Flexors', 'Shoulders'],
		categories: ['Yoga', 'Flexibility', 'Mindfulness'],
		exercises: ['Sun Salutation A', 'Warrior I', 'Warrior II', 'Tree Pose', 'Child\'s Pose', 'Savasana'],
		file: '/sample-workouts/yoga-flow-beginner.glb',
		screenshot: '/sample-images/workout-yoga.jpg',
		createdAt: '2024-01-10T14:20:00Z',
		updatedAt: '2024-01-10T14:20:00Z',
		createdBy: 'Yoga Instructor'
	},
	{
		id: 'workout-003',
		name: 'Upper Body Strength',
		description: 'Focus on building upper body strength with this targeted workout routine.',
		difficulty: 'Advanced',
		duration: 40,
		equipment: ['Barbell', 'Dumbbells', 'Pull-up Bar'],
		bodyParts: ['Chest', 'Back', 'Shoulders', 'Arms'],
		muscleGroups: ['Pectorals', 'Latissimus Dorsi', 'Deltoids', 'Biceps', 'Triceps'],
		categories: ['Strength', 'Bodybuilding'],
		exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press', 'Bicep Curls', 'Tricep Dips'],
		file: '/sample-workouts/upper-body-strength.glb',
		screenshot: '/sample-images/workout-upper.jpg',
		createdAt: '2024-01-12T09:15:00Z',
		updatedAt: '2024-01-12T09:15:00Z',
		createdBy: 'Strength Coach'
	}
];

// Sample motion data
export const mockMotions: Motion[] = [
	{
		id: 'motion-001',
		name: 'Squat',
		description: 'A fundamental lower body exercise that targets quadriceps, hamstrings, and glutes. Proper form is essential for safety and effectiveness.',
		file: '/sample-motions/squat.glb',
		fileType: 'glb',
		screenshot: '/sample-images/motion-squat.jpg',
		level: 1,
		equipment: ['Bodyweight', 'Barbell', 'Dumbbells'],
		bodyParts: ['Legs', 'Glutes'],
		muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
		categories: ['Strength', 'Compound'],
		primaryJoints: ['Knee', 'Hip', 'Ankle'],
		labels: ['Functional', 'Compound', 'Lower Body'],
		fileSize: 245760,
		duration: 3.5,
		uploadDate: '2024-01-05T11:00:00Z',
		author: 'Motion Expert'
	},
	{
		id: 'motion-002',
		name: 'Push-up',
		description: 'Classic upper body exercise that builds chest, shoulder, and tricep strength while engaging the core.',
		file: '/sample-motions/pushup.glb',
		fileType: 'glb',
		screenshot: '/sample-images/motion-pushup.jpg',
		level: 1,
		equipment: ['Bodyweight'],
		bodyParts: ['Chest', 'Shoulders', 'Arms'],
		muscleGroups: ['Pectorals', 'Deltoids', 'Triceps', 'Core'],
		categories: ['Strength', 'Calisthenics'],
		primaryJoints: ['Shoulder', 'Elbow', 'Wrist'],
		labels: ['Bodyweight', 'Upper Body', 'Core'],
		fileSize: 196608,
		duration: 2.8,
		uploadDate: '2024-01-06T14:30:00Z',
		author: 'Fitness Trainer'
	},
	{
		id: 'motion-003',
		name: 'Plank',
		description: 'Isometric core exercise that strengthens the entire midsection and improves stability.',
		file: '/sample-motions/plank.glb',
		fileType: 'glb',
		screenshot: '/sample-images/motion-plank.jpg',
		level: 1,
		equipment: ['Bodyweight'],
		bodyParts: ['Core', 'Shoulders'],
		muscleGroups: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis', 'Shoulders'],
		categories: ['Core', 'Isometric'],
		primaryJoints: ['Shoulder', 'Elbow', 'Hip'],
		labels: ['Core', 'Stability', 'Isometric'],
		fileSize: 163840,
		duration: 4.2,
		uploadDate: '2024-01-07T09:45:00Z',
		author: 'Core Specialist'
	},
	{
		id: 'motion-004',
		name: 'Deadlift',
		description: 'Compound exercise that works the entire posterior chain, including hamstrings, glutes, and lower back.',
		file: '/sample-motions/deadlift.glb',
		fileType: 'glb',
		screenshot: '/sample-images/motion-deadlift.jpg',
		level: 3,
		equipment: ['Barbell', 'Dumbbells'],
		bodyParts: ['Back', 'Legs', 'Glutes'],
		muscleGroups: ['Erector Spinae', 'Hamstrings', 'Glutes', 'Traps', 'Lats'],
		categories: ['Strength', 'Compound', 'Powerlifting'],
		primaryJoints: ['Hip', 'Knee', 'Ankle'],
		labels: ['Compound', 'Posterior Chain', 'Heavy'],
		fileSize: 327680,
		duration: 5.1,
		uploadDate: '2024-01-08T16:20:00Z',
		author: 'Strength Coach'
	}
];

// Sample avatar data
export const mockAvatars: Avatar[] = [
	{
		id: 'avatar-001',
		name: 'Athletic Male',
		description: 'A fit male avatar with athletic build, suitable for high-intensity workouts and strength training demonstrations.',
		gender: 'Male',
		categories: ['Athletic', 'Male', 'Adult'],
		fileName: 'athletic-male.glb',
		file: '/sample-avatars/athletic-male.glb',
		screenshot: '/sample-images/avatar-athletic-male.jpg',
		createdAt: '2024-01-01T10:00:00Z',
		updatedAt: '2024-01-01T10:00:00Z',
		createdBy: 'Avatar Designer'
	},
	{
		id: 'avatar-002',
		name: 'Yoga Female',
		description: 'A flexible female avatar designed for yoga and flexibility demonstrations with realistic body proportions.',
		gender: 'Female',
		categories: ['Yoga', 'Female', 'Adult', 'Flexible'],
		fileName: 'yoga-female.glb',
		file: '/sample-avatars/yoga-female.glb',
		screenshot: '/sample-images/avatar-yoga-female.jpg',
		createdAt: '2024-01-02T11:30:00Z',
		updatedAt: '2024-01-02T11:30:00Z',
		createdBy: 'Avatar Designer'
	},
	{
		id: 'avatar-003',
		name: 'Casual Male',
		description: 'A casual male avatar with average build, perfect for everyday workout demonstrations.',
		gender: 'Male',
		categories: ['Casual', 'Male', 'Adult'],
		fileName: 'casual-male.glb',
		file: '/sample-avatars/casual-male.glb',
		screenshot: '/sample-images/avatar-casual-male.jpg',
		createdAt: '2024-01-03T14:15:00Z',
		updatedAt: '2024-01-03T14:15:00Z',
		createdBy: 'Avatar Designer'
	},
	{
		id: 'avatar-004',
		name: 'Senior Female',
		description: 'A senior female avatar designed for gentle exercise and senior fitness demonstrations.',
		gender: 'Female',
		categories: ['Senior', 'Female', 'Gentle Exercise'],
		fileName: 'senior-female.glb',
		file: '/sample-avatars/senior-female.glb',
		screenshot: '/sample-images/avatar-senior-female.jpg',
		createdAt: '2024-01-04T09:45:00Z',
		updatedAt: '2024-01-04T09:45:00Z',
		createdBy: 'Avatar Designer'
	}
];