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
			id: "description",
			type: "textarea",
			label: "Description",
			values: [avatar.description || "N/A"]
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
			values: [avatar.gender || "N/A"],
			options: ["Male", "Female", "None"]
		},
		{
			id: "categories",
			type: "tags",
			label: "Categories",
			values: avatar.categories || []
		}
	]; 

</script>

<div class="body">
    {#if avatar.screenshot}
        <div class="screenshot-container">
            <img src={avatar.screenshot} alt={`[image of '${avatar.name || 'Avatar'}' is missing]`} class="screenshot" />
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