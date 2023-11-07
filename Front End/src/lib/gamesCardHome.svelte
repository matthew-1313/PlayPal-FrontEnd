<script>
  import { onMount } from "svelte";
  import { gamesDataHome } from "./store";
  import testGamesApiResponse from "../db/test/games_test.json";
  import { getAllGames } from "../lib/api";
  import SingleGamePage from "../routes/SingleGamePage/+page.svelte";

  async function fetchData() {
    const res = await getAllGames();
    const data = await res;

    if (res) {
      return data.slice(0, 10);
    } else {
      throw new Error(data);
    }
  }
</script>

<!-- Games Light Cards -->
<main>
  <h3>List of Recommended Games:</h3>
  {#await fetchData()}
    <p>loading</p>
  {:then data}
    {#each data as game}
      <div id="gameCard">
        <a href="/Games/{game.id}">
          <img src={game.image} alt={game.title} id="img_gameCard-home" />
          {game.name} Rating: {game.metacritic}
        </a>
      </div>
    {/each}
  {:catch error}
    <p>{error.message}</p>
  {/await}
  <a href="/Games"><button>View More</button></a>
</main>

<style>
  #gameCard {
    max-width: 30%;
    box-shadow: 1px 1px 5px 5px #77777738;
    border-radius: 8px;
    margin: 4px;
  }

  #img_gameCard-home {
    max-height: 90px;
  }
</style>
