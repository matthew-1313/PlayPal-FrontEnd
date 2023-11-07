<script>
import {getGames,getAllGenres} from '../../lib/api'
import Navbar from '../../lib/navbar.svelte';
import { gamesSortedData,gameCategories } from '../../lib/store';
import { onMount } from 'svelte';
let ratingSelect = true
let topic = "action"
let isLoading = true
let currentId = 0
function changeTopic(){
   return getAllGenres().then((data) =>{
        gameCategories.set(data)
    }).then(() =>{
        getGames(topic,ratingSelect).then((data) =>{
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
 const RatingChange = {
    true : "metacritic",
    false : "User Rating"
}
</script>
<Navbar/>
<h1>This is the Games page</h1>
<label>Click here to search for a game <a href="/Games/Search"><button>Search</button></a>
</label>
{#if !isLoading}
<main>
    <label>Click on this tab to select your category to see all the best games from this category:
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
    <button id="changeRating" on:click={(event) =>{
        event.preventDefault()
        ratingSelect = !ratingSelect
        isLoading = true
        changeTopic()
    }}>Click here to sort by {RatingChange[!ratingSelect]}</button>
    <p>Currently searching for best Games sorted by {RatingChange[ratingSelect]} score</p>
    <ol>
        {#each $gamesSortedData as game}
        <div id="gamesDiv">
        <li>Name :{game.name}</li>
        <p>Main Genre: {game.genre}</p>
        <p>Released: {game.released}</p>
        <p>metacritic: {game.metacritic}</p>
        <p>User Rating : {game.rating}</p>
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



