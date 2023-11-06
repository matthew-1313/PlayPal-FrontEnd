<script>
    import Home from "../routes/Home/+page.svelte"
    import Profile from "../routes/Profile/+page.svelte"
    import Calendar from "../routes/main/Calendar/+page.svelte"
    import Friends from "../routes/Friends/+page.svelte"
    import Games from '../routes/Games/+page.svelte'
    import Messages from '../routes/main/Messages/+page.svelte'

    export let menu = 1
</script>

<style>
    ul#menu li{
        display: inline;
    }
</style>

<ul id="menu">
    <li><a href="/" on:click|preventDefault={() => (menu = 1)}>Home</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Profile</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 3)}>Calendar</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 4)}>Friends</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 5)}>Games</a></li> |
    <li><a href="/" on:click|preventDefault={() => (menu = 6)}>Messages</a></li> |
</ul>

{#if menu === 1}
<Home />
{:else if menu === 2}
<Profile />
{:else if menu === 3}
<Calendar />
{:else if menu === 4}
<Friends />
{:else if menu === 5}
<Games />
{:else if menu === 6}
<Messages />
{:else}
<h1>
    Page not found
</h1>
{/if}
