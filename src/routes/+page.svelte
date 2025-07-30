<script>
    import { base } from '$app/paths';
</script>

<div class="container" style="background-color: #080016;">
    <center><h1>MotionRepo</h1></center>
    <img src="{base}/splash.png" alt="MotionRepoWebApp Splash Screen" style="width: 80%; height: auto; display: block; margin: 1rem auto;" />
    <center><h1>WebApp</h1></center>

    <div class="demo-link">
        <a href="{base}/demo">Try Demo with Sample Data</a>
    </div>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    h1 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }

    .demo-link {
        text-align: center;
        margin-top: 2rem;
    }

    .demo-link a {
        display: inline-block;
        background: #3498db;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .demo-link a:hover {
        background: #2980b9;
    }
</style>