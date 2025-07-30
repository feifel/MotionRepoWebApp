// Type definitions for the MotionRepo API

export interface Workout {
	id?: string;
	name?: string;
	description?: string;
	difficulty?: string;
	duration?: number;
	equipment?: string[];
	bodyParts?: string[];
	muscleGroups?: string[];
	categories?: string[];
	exercises?: string[];
	file?: string;
	screenshot?: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
}

export interface Motion {
	id?: string;
	name?: string;
	description?: string;
	file?: string;
	fileType?: string;
	screenshot?: string;
	level?: number;
	equipment?: string[];
	bodyParts?: string[];
	muscleGroups?: string[];
	categories?: string[];
	primaryJoints?: string[];
	labels?: string[];
	fileSize?: number;
	duration?: number;
	uploadDate?: string;
	author?: string;
}

export interface Avatar {
	id?: string;
	name?: string;
	description?: string;
	gender?: string;
	categories?: string[];
	fileName?: string;
	file?: string;
	screenshot?: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T> {
	success: boolean;
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}