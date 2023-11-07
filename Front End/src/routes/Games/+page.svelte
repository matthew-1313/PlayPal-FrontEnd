<script>
import {getGames,getAllGenres} from '../../lib/api'
  import Navbar from '../../lib/navbar.svelte';
import { gamesSortedData,gameCategories } from '../../lib/store';
import { onMount } from 'svelte';
let topic = "action"
let isLoading = true
let currentId = 0
function changeTopic(){
   return getAllGenres().then((data) =>{
        gameCategories.set(data)
    }).then(() =>{
        getGames(topic).then((data) =>{
        isLoading = false
        gamesSortedData.set(data)
    })
    .catch((err) =>{
        return (err)
    })
    })
    .catch((err)=>{
        return (err)
    })
   
}
onMount(async() =>{
    getAllGenres().then((data) =>{
        gameCategories.set(data)
    }).then(() =>{
        getGames(topic).then((data) =>{
        isLoading = false
        gamesSortedData.set(data)
    })
    .catch((err) =>{
        return (err)
    })
    })
    .catch((err)=>{
        return (err)
    })
   
})
</script>
<Navbar/>
<h1>This is the Games page</h1>
{#if !isLoading}
<main>
    <label>Search by Genre for the most popular metacritic games:
  <select bind:value={currentId} on:change={(event) =>{
        event.preventDefault()
        topic = event.target.value.toLowerCase()
        console.log(topic)
        isLoading = true
        changeTopic()

    }}>
        <option value="" disabled selected>Select your option</option>        
    {#each $gameCategories as category}
        <option value={category.id} key={category.name}>{category.name}</option>
        {/each}
    </select>
    <ol>
        {#each $gamesSortedData as game}
        <div id="gamesDiv">
        <li>Name :{game.name}</li>
        <p>Genre: {game.genre}</p>
        <p>Released: {game.released}</p>
        <p>metacritic: {game.metacritic}</p>
        <img alt="imageOf{game.name}" src={game.image}/>
        <p>Click here to view the game</p>
    </div>
        {/each}
        <br>
</ol>
</label>
</main>
{:else}
<div>
    <h2>Loading....</h2>
</div>
{/if}


<style>
    img{
        max-height: 300px;
    }
    #gamesDiv{
        padding: 20px;
        margin: 20px;
        border: 15px solid green;
    }
    li{
        text-decoration: none;
    }
</style>



