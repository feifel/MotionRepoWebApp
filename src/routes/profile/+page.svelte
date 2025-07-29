<div class="container">
    <h1>Profile</h1>
    <p>Manage your account settings and preferences.</p>
    
    <div class="profile-section">
        <h3>Account Information</h3>
        <div class="item">
            <label for="username">Username</label>
            <input type="text" id="username" value="motion_user_123" />
        </div>
        <div class="item">
            <label for="email">Email</label>
            <input type="text" id="email" value="user@example.com" disabled />
        </div>
        <button class="btn">Login</button>
    </div>

    <div class="profile-section">
        <h3>Preferences</h3>
        <div class="item">
            <label for="avatar">Default Avatar</label>
            <input type="text" id="avatar" value="Maria" disabled />
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    h1 {
        color: var(--color-primary);
        margin-bottom: 1rem;
    }

    .profile-section {
        background-color: var(--color-bg-neutral-tint1);
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--color-primary-shade1);
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .profile-section h3 {
        color: var(--color-primary);
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .item {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 0.5rem 1.5rem;
        align-items: center;
        padding: 0.75rem 0;
    }

    .item label {
        font-weight: 500;
        color: var(--color-primary);
        text-align: right;
    }

    .item input[type="text"] {
        background: var(--color-bg-neutral);
        border: 1px solid var(--color-primary);
        border-radius: 4px;
        padding: 0.5rem 1rem 0.5rem 0.5rem; /* Added right padding */
        color: var(--color-neutral-tint1);
        font-size: 0.9rem;
        width: 100%;
        box-sizing: border-box;
    }

    /* Stack label above input on narrow screens */
    @media (max-width: 480px) {
        .item {
            grid-template-columns: 1fr;   /* single column */
            gap: 0.25rem 0;
        }

        .item label {
            text-align: left;
        }
    }


    .btn {
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

    .btn:hover {
        background-color: var(--color-primary-tint1);
        transform: scale(1.05);
    }
</style>