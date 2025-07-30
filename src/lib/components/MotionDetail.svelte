<script lang="ts">
	import Form from "./dialogs/Form.svelte";
    import type { Row } from "./dialogs/form.types";

	interface Motion {
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
	}

	export let motion: Motion;
    
    let form: Row[] = [
		{
			id: "description",
			type: "textarea",
			label: "Description",
			values: [motion.description || "N/A"]
		},
		{
			id: "file",
			type: "text",
			label: "File",
			values: [motion.file || "N/A"]
		},
		{
			id: "fileType",
			type: "text",
			label: "File Type",
			values: [motion.fileType || "N/A"]
		},
		{
			id: "level",
			type: "enum",
			label: "Level",
			values: ["intermediate"],
			options: ["beginner", "intermediate", "advanced"]
		},
		{
			id: "equipment",
			type: "tags",
			label: "Equipment",
			values: motion.equipment || [],
			options: ["KettleBell", "Dumbbell"]
		},
		{
			id: "bodyParts",
			type: "tags",
			label: "Body Parts",
			values: motion.bodyParts || []
		},
		{
			id: "muscleGroups",
			type: "tags",
			label: "Muscle Groups",
			values: motion.muscleGroups || []
		},
		{
			id: "categories",
			type: "tags",
			label: "Categories",
			values: motion.categories || []
		},
		{
			id: "primaryJoints",
			type: "tags",
			label: "Primary Joints",
			values: motion.primaryJoints || []
		},
		{
			id: "labels",
			type: "tags",
			label: "Labels",
			values: motion.labels || []
		}
	]; 

</script>

<div class="body">
	{#if motion.screenshot}
		<div class="screenshot-container">
			<img src={motion.screenshot} alt={`[image of '${motion.name || 'Avatar'}' is missing]`} class="screenshot" />
		</div>
	{/if}
	<Form rows={form} readonly={false}/>
</div>

<style>
	.body {
		padding: 1rem 2rem 2rem 2rem;
		overflow-y: auto;
		flex: 1;
	}

	.screenshot-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.screenshot {
		max-width: 100%;
		max-height: 300px;
		border-radius: 8px;
		box-shadow: 0 4px 8px var(--color-bg-neutral-shade1);
	}
</style>