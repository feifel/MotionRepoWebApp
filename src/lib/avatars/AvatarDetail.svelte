<script lang="ts">
    import { onMount } from 'svelte';
    import * as BABYLON from '@babylonjs/core';
    import '@babylonjs/loaders/glTF';
    import Form from "../components/dialogs/Form.svelte";
	import type { Row } from "../components/dialogs/form.types";
	import type { Avatar } from "./Avatar.types";

	export let avatar: Avatar;

    let canvas: HTMLCanvasElement;
    let engine: BABYLON.Engine;
    let scene: BABYLON.Scene;
    let isLoading = false;
    let errorMessage = '';

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

    onMount(() => {
        if (canvas && avatar.fileName) {
            initializeBabylonScene();
        }
        
        return () => {
            if (engine) {
                engine.dispose();
            }
        };
    });

    async function initializeBabylonScene() {
        if (!canvas || !avatar.fileName) return;

        isLoading = true;
        errorMessage = '';
        
        try {
            // Create engine and scene
            engine = new BABYLON.Engine(canvas, true);
            scene = new BABYLON.Scene(engine);

            // Create camera
			const camera = new BABYLON.ArcRotateCamera(
                "camera",
                Math.PI / 2,
                Math.PI / 2,
                3,
                new BABYLON.Vector3(0, 0, 0),
                scene
            );
            camera.attachControl(canvas, true);
            camera.lowerRadiusLimit = 1;
            camera.upperRadiusLimit = 10;

            // Create lights
            const light1 = new BABYLON.HemisphericLight(
                "light1",
                new BABYLON.Vector3(0, 1, 0),
                scene
            );
            light1.intensity = 0.7;

            const light2 = new BABYLON.DirectionalLight(
                "light2",
                new BABYLON.Vector3(-1, -2, -1),
                scene
            );
            light2.intensity = 0.5;

			// Create ground plane
			const ground = BABYLON.MeshBuilder.CreateGround("ground", {
				width: 2,
				height: 2,
				subdivisions: 4
			}, scene);
			
			// Position ground below the model (will be adjusted after model loads)
			ground.position.y = 0;
			
			// Create ground material
			const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
			groundMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
			groundMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
			ground.material = groundMaterial;
				

			// Enable ground to receive shadows
			ground.receiveShadows = true;
			
            // Load GLB file
            const modelUrl = avatar.fileName;
            const result = await BABYLON.SceneLoader.LoadAssetContainerAsync(
                modelUrl,
                "",
                scene
            );

            // Add all meshes to the scene
            result.addAllToScene();

            // Center and scale the model
            const meshes = result.meshes;
            if (meshes.length > 0) {
                const boundingInfo = scene.getWorldExtends();
                const size = boundingInfo.max.subtract(boundingInfo.min);
                const maxDim = Math.max(size.x, size.y, size.z);
                
                if (maxDim > 0) {
                    const scale = 2 / maxDim;
                    meshes.forEach(mesh => {
                        mesh.scaling.scaleInPlace(scale);
                    });
                }

                // Center the model
                const center = boundingInfo.min.add(boundingInfo.max).scale(0.5);
                meshes.forEach(mesh => {
                    mesh.position = mesh.position.subtract(center);
                });
            }

            // Enable shadows
            const shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
            meshes.forEach(mesh => {
                if (mesh.receiveShadows) {
                    shadowGenerator.addShadowCaster(mesh);
                    mesh.receiveShadows = true;
                }
            });

            // Render loop
            engine.runRenderLoop(() => {
                scene.render();
            });

            // Handle window resize
            const handleResize = () => {
                engine.resize();
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };

        } catch (error) {
            console.error('Error loading GLB file:', error);
            errorMessage = 'Failed to load 3D model. Please check if the file exists.';
        } finally {
            isLoading = false;
        }
    }

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
    {#if avatar.fileName}
        <div class="scene-container">
            <div class="canvas-container">
                <canvas bind:this={canvas} width="400" height="400"></canvas>
                {#if isLoading}
                    <div class="loading-overlay">
                        <div class="loading-spinner"></div>
                        <p>Loading 3D model...</p>
                    </div>
                {/if}
                {#if errorMessage}
                    <div class="error-overlay">
                        <p>{errorMessage}</p>
                    </div>
                {/if}
            </div>
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

	.scene-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.canvas-container {
		position: relative;
		display: inline-block;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 8px var(--color-bg-neutral-shade1);
	}

	canvas {
		display: block;
		background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
	}

	.loading-overlay, .error-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.9);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.error-overlay {
		background: rgba(255, 235, 235, 0.95);
		color: #d32f2f;
		padding: 1rem;
		text-align: center;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.screenshot {
		max-width: 100%;
		max-height: 300px;
		border-radius: 8px;
		box-shadow: 0 4px 8px var(--color-bg-neutral-shade1);
	}
</style>