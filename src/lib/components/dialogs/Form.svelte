<script lang="ts">
    import type { Row } from './form.types';
    import TagPicker from '../elements/TagPicker.svelte';
	import ComboBox from '../elements/ComboBox.svelte';

    export let rows: Row[];
    export let readonly: boolean | undefined = true;
    export let onSubmit: ((updatedRows: Row[]) => void) | undefined = undefined;

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(rows);
        } else {
            console.log('Form submitted:', rows);
        }
    }
</script>

<form class="form-grid" onsubmit={handleSubmit}>

    {#each rows as row}
        {#if row.type === 'number'}
            <label class="label" title={row.label} for={row.id}>{row.label}</label>
            <input class="number-input"
                class:disabled={readonly} 
                id={row.id}
                type="number" 
                value={row.values[0] || ''}
                readonly={readonly}
                disabled={readonly}
            />        
        {:else if row.type === 'text'}
            <label class="label" title={row.label} for={row.id}>{row.label}</label>
            <input class="text-input"
                class:disabled={readonly} 
                id={row.id}
                type="text" 
                value={row.values[0] || ''}                
                readonly={readonly}
                disabled={readonly}
            />
        {:else if row.type === 'textarea'}
            <label class="label fullwidth" title={row.label} for={row.id}>{row.label}</label>
            <textarea class="fullwidth" 
                class:disabled={readonly} 
                id={row.id} 
                name={row.id} 
                rows="3" 
                readonly={readonly} 
                disabled={readonly}>{row.values[0]}</textarea>
        {:else if row.type === 'enum' && row.options && row.options.length > 0}
            <label class="label" title={row.label} for={row.id}>{row.label}</label>
            <ComboBox bind:selectedTags={row.values} allTags={row.options} readonly={readonly} id={row.id} />
            <!--select class="text-input"
                class:disabled={readonly} 
                id={row.id}
                value={row.values[0] || ''} 
                disabled={readonly}>
                {#each row.options as option}
                    <option value={option}>{option}</option>
                {/each}                
            </select-->
        {:else if row.type === 'tags'}
            <label class="label" title={row.label} for={row.id}>{row.label}</label>
            <TagPicker id={row.id} bind:selectedTags={row.values} existingTags={row.options} readonly={readonly}/>
            {#if !readonly}<div></div>{/if}
        {/if}
    {/each}
    <br/>
    {#if !readonly}
        <button type="submit">Submit</button>
    {/if}
</form>
<style>

    label {
        font-size: 1.1rem;
        font-weight: bold;
    }

    input, textarea, select {        
        background: var(--color-bg-neutral);
        border: 1px solid var(--color-primary);
        border-radius: 4px;
        padding: 0.5rem 1rem 0.5rem 0.5rem; /* Added right padding */
        color: var(--color-neutral-tint1);
        width: 100%;
        box-sizing: border-box;
    }

    textarea, input[type="text"] {
        text-align: left;
    }

    input[type="number"] {
        text-align: right;
    }

    button {
        background-color: var(--color-primary);
        color: var(--color-neutral-tint1);
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 20px;
        align-self: flex-end;
        margin-left: auto;
        width: fit-content;
    }
    
    button:hover {
        background-color: var(--color-primary-tint1);
        transform: scale(1.05);
    }

    .form-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        align-items: center;
    }

    /* make the label + textarea act as one item that spans both columns */
    .fullwidth {
        grid-column: 1 / -1;
    }

    /* optional: keep the label above the textarea instead of side-by-side */
    .fullwidth.label {
        text-align: left;
        max-width: none;
    }

    .disabled {
        border: none;
    }
</style>