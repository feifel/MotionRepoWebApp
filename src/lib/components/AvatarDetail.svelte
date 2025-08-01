<script lang="ts">
	import Form from "./dialogs/Form.svelte";
	import type { Row } from "./dialogs/form.types";


	interface Avatar {
		id?: string;
		name?: string;
		description?: string;
		gender?: string;
		categories?: string[];
		fileName?: string;
		fileType?: string;
		screenshot?: string;
	}

	export let avatar: Avatar;

    let form: Row[] = [
		{
			id: "name",
			type: "text",
			label: "Name",
			values: [avatar.name || ""]
		},
		{
			id: "description",
			type: "textarea",
			label: "Description",
			values: [avatar.description || ""]
		},
		{
			id: "file",
			type: "text",
			label: "File",
			values: [avatar.fileName || "N/A"]
		},
		{
			id: "fileType",
			type: "text",
			label: "File Type",
			values: [avatar.fileType || "N/A"]
		},
		{
			id: "gender",
			type: "enum",
			label: "Gender",
			values: [avatar.gender || "None"],
			options: ["Male", "Female", "None"]
		},
		{
			id: "categories",
			type: "tags",
			label: "Categories",
			values: avatar.categories || []
		}
	];

	function handleFormSubmit(updatedRows: Row[]) {
		// Update the avatar object with the new values from the form
		updatedRows.forEach(row => {
			switch (row.id) {
				case "name":
					avatar.name = row.values[0] || "";
					break;
				case "description":
					avatar.description = row.values[0] || "";
					break;
				case "file":
					avatar.fileName = row.values[0] || "";
					break;
				case "fileType":
					avatar.fileType = row.values[0] || "";
					break;
				case "gender":
					avatar.gender = row.values[0] || "";
					break;
				case "categories":
					avatar.categories = row.values;
					break;
			}
		});

		// Here you would typically send the updated avatar to your server
		console.log('Avatar updated:', avatar);
		alert('Submit is not yet implemented\n\nJSON Data:\n' + JSON.stringify(avatar, null, 2));
		// TODO: Add API call to send updated avatar to server
	}

</script>

<div class="body">
    {#if avatar.screenshot}
        <div class="screenshot-container">
            <img src={avatar.screenshot} alt={`[image of '${avatar.name || 'Avatar'}' is missing]`} class="screenshot" />
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