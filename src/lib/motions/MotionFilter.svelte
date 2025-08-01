<script lang="ts">
    import Form from "../components/dialogs/Form.svelte";
	import type { Row } from "../components/dialogs/form.types";

	export let onFilter: (filters: string[] ) => void;
	export let selectedFilters:  string[] ;

	let form: Row[] = [
		{
			id: 'level',
			type: 'tags',
			label: 'Level',
			values: selectedFilters.filter(f => f.startsWith('level:')).map(f => f.replace('level:', '')),
			options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
		},
		{
			id: 'categories',
			type: 'tags',
			label: 'Categories',
			values: selectedFilters.filter(f => f.startsWith('category:')).map(f => f.replace('category:', '')),
			options: [
				'Warm-up',
				'Cool-down',
				'Cardio',
				'Strength',
				'Flexibility',
				'Balance',
			]
		}
	];

	function handleFormSubmit(updatedRows: Row[]) {
		const newFilters: string[] = [];
		updatedRows.forEach((row) => {
			if (row.id === 'categories') {
				newFilters.push(...(row.values || []).map((v) => `category:${v}`));
			} else if (row.id === 'level') {
				newFilters.push(...(row.values || []).map((v) => `level:${v}`));
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
