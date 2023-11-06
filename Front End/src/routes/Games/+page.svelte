<script>
import {getGames,getAllGenres} from '../../lib/api'
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

<h1>This is the Games page</h1>
<p></p>
{#if !isLoading}
<main>
  <select bind:value={currentId} on:change={(event) =>{
        event.preventDefault()
        topic = event.target.value.toLowerCase()
        console.log(topic)
        isLoading = true
        changeTopic()

    }}>
        {#each $gameCategories as category}
        <option value={category.id} key={category.name}>{category.name}</option>
        {/each}
    </select>
    <ul>
        {#each $gamesSortedData as game}
        <div id="gamesDiv">
        <li>Name :{game.name}</li>
        <li>Genre: {game.genre}</li>
        <li>Released: {game.released}</li>
        <li>metacritic: {game.metacritic}</li>
        <img alt="imageOf{game.name}" src={game.image}/>
    </div>
        {/each}
        <br>
    </ul>
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



