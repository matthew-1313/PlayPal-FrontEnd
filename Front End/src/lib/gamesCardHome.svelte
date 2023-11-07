<script>
  import { onMount } from "svelte";
  import { gamesDataHome } from "./store";
  import testGamesApiResponse from "../db/test/games_test.json";
  import { getAllGames } from "../lib/api";

  async function fetchData() {
    const res = await getAllGames();
    const data = await res;

    if (res) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  //   let gameInfoArr =
</script>

<!-- Games Light Cards -->
<main>
  {#await fetchData()}
    <p>loading</p>
  {:then data}
    {#each data as game}
      <div id="gameCard">
        <img src={game.image} alt={game.title} id="img_gameCard-home" />
        {game.name} Rating: {game.metacritic}
      </div>
    {/each}
  {:catch error}
    <p>{error.message}</p>
  {/await}
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
