<script>
import { gamesSearch } from "../../lib/api";
import { searchGameData } from "../../lib/store";
let errorMessage = ""
let searchTerm = ""
let searching = false
let isLoading = false
let isError = false
let resultsReturn = false
searchGameData.set([])

function getSearch (){
    return gamesSearch(searchTerm).then((data) =>{
        if (data === 400 || data === 404){
            isError=true
        }else{
        searchGameData.set(data)
        isLoading = false
        resultsReturn = true
        }
    })
    .catch((err) =>{
        return err
    })

}
function gameChecker(event){
    event.preventDefault()
    searching = false
    isLoading = true
    if (searchTerm.split(" ").join("").length === 0){
        errorMessage = "The Search area is currently empty"
    }else{
        searching = true
        getSearch()
        }
    }
</script>

<form on:submit={gameChecker}>
    <label for="search">Search Here for a Game:
        <input on:change={(event) =>{
            event.preventDefault()
            errorMessage=""
            searchTerm = event.target.value
        }} id="search" placeholder="Search Title Here" value={searchTerm}/>
    </label>
    <button>Submit</button>
    <p>{errorMessage}</p>
    {#if (searching)}
    <h3> The game you have searched for is: {searchTerm}, please see all results below.</h3>
    {/if}
    {#if !isLoading && $searchGameData.length > 0}
    <ol>
        {#each $searchGameData as game}
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
{:else if !searching && resultsReturn && $searchGameData.length === 0}
<p>There are no results availale for this title, please search for a different title</p>
{:else if (isError)}
<p>There has been an error, please try again later</p>
{:else if isLoading}
<h4>Loading....</h4>
{/if}

</form>
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



