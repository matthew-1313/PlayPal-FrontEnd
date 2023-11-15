<script>
  import { gamesSearch } from "../../lib/api";
  import { searchGameData } from "../../lib/store";
  let errorMessage = "";
  let searchTerm = "";
  let searching = false;
  let isLoading = false;
  let isError = false;
  let resultsReturn = false;
  searchGameData.set([]);

  function getSearch() {
    return gamesSearch(searchTerm)
      .then((data) => {
        if (data === 400 || data === 404) {
          isError = true;
          isLoading = false;
        } else {
          searchGameData.set(data);
          isLoading = false;
          resultsReturn = true;
        }
      })
      .catch((err) => {
        return err;
      });
  }
  function gameChecker(event) {
    event.preventDefault();
    searching = false;
    isLoading = true;
    if (searchTerm.split(" ").join("").length === 0) {
      errorMessage = "The Search area is currently empty";
    } else {
      searching = true;
      getSearch();
    }
  }
</script>

<form on:submit={gameChecker}>
  <label for="search"
    >Search Here for a Game: 
    <input
      on:change={(event) => {
        event.preventDefault();
        errorMessage = "";
        searchTerm = event.target.value;
      }}
      id="search"
      placeholder="Game Title"
      value={searchTerm}
    />
  </label>
  <button>Submit</button>
  <p>{errorMessage}</p>
  {#if searching}
    <h3>
      Results for "<b>{searchTerm}</b>" below:
    </h3>
  {/if}
  {#if !isLoading && $searchGameData.length > 0}
    <div id="grid-container">
      {#each $searchGameData as game}
        <div class="GamesCard" id="grid-item">
          <a href="/Games/{game.id}">
            <h3>{game.name}</h3>
            <div>
              <img alt="imageOf{game.name}" src={game.image} />
            </div>
            <p><b>{game.genre}</b></p>
            <p>
              Metacritic: <b>{game.metacritic}</b> | PlayPal:
              <b>{game.rating}</b>
            </p>
          </a>
        </div>
      {/each}
      <br />
    </div>
  {:else if !searching && resultsReturn && $searchGameData.length === 0}
    <p>
      There are no results availale for this title, please search for a
      different title
    </p>
  {:else if isError}
    <p>There has been an error, please try again later</p>
  {:else if isLoading}
    <h4>Loading....</h4>
  {/if}
</form>

<style>
</style>
