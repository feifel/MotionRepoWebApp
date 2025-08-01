<script lang="ts">
	import Form from "../components/dialogs/Form.svelte";
    import type { Row } from "../components/dialogs/form.types";
	import type { Motion } from "./Motion.types";

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

	function handleFormSubmit(updatedRows: Row[]) {
		// Update the motion object with the new values from the form
		updatedRows.forEach(row => {
			switch (row.id) {
				case "description":
					motion.description = row.values[0] || "";
					break;
				case "file":
					motion.file = row.values[0] || "";
					break;
				case "fileType":
					motion.fileType = row.values[0] || "";
					break;
				case "level":
					// Convert string to number for level
					const levelMap: { [key: string]: number } = {
						"beginner": 1,
						"intermediate": 2,
						"advanced": 3
					};
					motion.level = levelMap[row.values[0]] || 2;
					break;
				case "equipment":
					motion.equipment = row.values;
					break;
				case "bodyParts":
					motion.bodyParts = row.values;
					break;
				case "muscleGroups":
					motion.muscleGroups = row.values;
					break;
				case "categories":
					motion.categories = row.values;
					break;
				case "primaryJoints":
					motion.primaryJoints = row.values;
					break;
				case "labels":
					motion.labels = row.values;
					break;
			}
		});

		// Here you would typically send the updated motion to your server
		console.log('Motion updated:', motion);
		alert('Submit is not yet implemented\n\nJSON Data:\n' + JSON.stringify(motion, null, 2));
		// TODO: Add API call to send updated motion to server
	} 

</script>

<div class="body">
	{#if motion.screenshot}
		<div class="screenshot-container">
			<img src={motion.screenshot} alt={`[image of '${motion.name || 'Avatar'}' is missing]`} class="screenshot" />
		</div>
	{/if}
	<Form rows={form} readonly={false} onSubmit={handleFormSubmit}/>
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