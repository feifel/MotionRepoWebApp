<script lang="ts">
	import Form from "./dialogs/Form.svelte";
	import type { Row } from "./dialogs/form.types";

	export let onFilter: (filters: string[] ) => void;
	export let selectedFilters:  string[] ;

	let form: Row[] = [
		{
			id: 'gender',
			type: 'tags',
			label: 'Gender',
			values: selectedFilters.filter(f => f.startsWith('gender:')).map(f => f.replace('gender:', '')),
			options: ['Male', 'Female', 'Unisex']
		},
		{
			id: 'categories',
			type: 'tags',
			label: 'Categories',
			values: selectedFilters.filter(f => f.startsWith('category:')).map(f => f.replace('category:', '')),
			options: [
				'Fantasy',
				'Sci-Fi',
				'Realistic',
				'Cartoon',
				'Historical',
				'Steampunk',
				'Cyberpunk',
				'Horror',
				'Anime',
				'Gaming'
			]
		}
	];

	function handleFormSubmit(updatedRows: Row[]) {
		const newFilters: string[] = [];
		updatedRows.forEach((row) => {
			if (row.id === 'categories') {
				newFilters.push(...(row.values || []).map((v) => `category:${v}`));
			} else if (row.id === 'gender') {
				newFilters.push(...(row.values || []).map((v) => `gender:${v}`));
			}
		});
		onFilter(newFilters);
	}
</script>

<div class="body">
	<Form rows={form} onSubmit={(rows) => handleFormSubmit(rows)} readonly={false}/>
</div>

<style>
	.body {
		padding: 1rem;
	}
</style>
