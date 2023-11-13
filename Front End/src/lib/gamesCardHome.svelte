<script>
  import { getAllGames } from "../lib/api";

  async function fetchData() {
    const res = await getAllGames();
    const data = await res;

    if (res) {
      return data.slice(0, 12);
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
    <div id="grid-container">
      {#each data as game}
        <div id="grid-item" class="GamesCard">
          <a href="/Games/{game.id}">
            <h3>{game.name}</h3>
            <div>
              <img src={game.image} alt={game.title} />
            </div>
            <p><b>{game.genres}</b></p>
            <p>
              Metacritic: <b>{game.metacritic}</b> | PlayPal:
              <b>{game.rating}</b>
            </p></a
          >
        </div>
      {/each}
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
  <a href="/Games"><button>View More</button></a>
</main>

<style>
</style>
