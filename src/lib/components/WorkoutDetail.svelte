<script lang="ts">
	import Form from "./dialogs/Form.svelte";
	import type { Row } from "./dialogs/form.types";

	interface Workout {
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

	export let workout: Workout;

    let form: Row[] = [
		{
			id: "description",
			type: "textarea",
			label: "Description",
			values: [workout.description || "N/A"]
		},
		{
			id: "file",
			type: "text",
			label: "File",
			values: [workout.file || "N/A"]
		},
		{
			id: "categories",
			type: "tags",
			label: "Categories",
			values: workout.categories || []
		}
	];

	function handleFormSubmit(updatedRows: Row[]) {
		// Update the workout object with the new values from the form
		updatedRows.forEach(row => {
			switch (row.id) {
				case "description":
					workout.description = row.values[0] || "";
					break;
				case "file":
					workout.file = row.values[0] || "";
					break;
				case "categories":
					workout.categories = row.values;
					break;
			}
		});

		// Here you would typically send the updated workout to your server
		console.log('Workout updated:', workout);
		alert('Submit is not yet implemented\n\nJSON Data:\n' + JSON.stringify(workout, null, 2));
		// TODO: Add API call to send updated workout to server
	} 
</script>

<div class="body">
	{#if workout.screenshot}
		<div class="screenshot-container">
			<img src={workout.screenshot} alt={`[image of '${workout.name || 'Workout'}' is missing]`} class="screenshot" />
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