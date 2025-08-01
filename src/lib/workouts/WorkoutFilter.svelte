<script lang="ts">
    import Form from "../components/dialogs/Form.svelte";
	import type { Row } from "../components/dialogs/form.types";

	export let onFilter: (filters: string[] ) => void;
	export let selectedFilters:  string[] ;

	let form: Row[] = [
		{
			id: 'difficulty',
			type: 'tags',
			label: 'Difficulty',
			values: selectedFilters.filter(f => f.startsWith('difficulty:')).map(f => f.replace('difficulty:', '')),
			options: ['Beginner', 'Intermediate', 'Advanced']
		},
		{
			id: 'categories',
			type: 'tags',
			label: 'Categories',
			values: selectedFilters.filter(f => f.startsWith('category:')).map(f => f.replace('category:', '')),
			options: [
				'Full Body',
				'Upper Body',
				'Lower Body',
				'Core',
				'Cardio',
				'Strength',
			]
		}
	];

	function handleFormSubmit(updatedRows: Row[]) {
		const newFilters: string[] = [];
		updatedRows.forEach((row) => {
			if (row.id === 'categories') {
				newFilters.push(...(row.values || []).map((v) => `category:${v}`));
			} else if (row.id === 'difficulty') {
				newFilters.push(...(row.values || []).map((v) => `difficulty:${v}`));
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
