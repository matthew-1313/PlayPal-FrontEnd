<script>
  import { getGames, getAllGenres } from "../../lib/api";
  import Navbar from "../../lib/navbar.svelte";
  import { gamesSortedData, gameCategories } from "../../lib/store";
  import { onMount } from "svelte";
  let ratingSelect = true;
  let topic = "action";
  let isLoading = true;
  let currentId = 0;
  function changeTopic() {
    return getAllGenres()
      .then((data) => {
        gameCategories.set(data);
      })
      .then(() => {
        getGames(topic, ratingSelect)
          .then((data) => {
            isLoading = false;
            gamesSortedData.set(data);
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }
  onMount(async () => {
    getAllGenres()
      .then((data) => {
        gameCategories.set(data);
      })
      .then(() => {
        getGames(topic)
          .then((data) => {
            isLoading = false;
            gamesSortedData.set(data);
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  });
  const RatingChange = {
    true: "Metacritic Rating",
    false: "PlayPal Rating",
  };
</script>

<Navbar />
<h1>This is the Games page</h1>
<label><a href="/Games/Search"><button>Search for a Title</button></a> </label>
{#if !isLoading}
  <main>
    <label
      >Search by Category:
      <select
        bind:value={currentId}
        on:change={(event) => {
          event.preventDefault();
          topic = event.target.value.toLowerCase();
          isLoading = true;
          changeTopic();
        }}
      >
        <option value="" disabled selected>Select your option</option>
        {#each $gameCategories as category}
          <option value={category.id} key={category.name}
            >{category.name}</option
          >
        {/each}
      </select>
      | Sort by:
      <button
        id="changeRating"
        on:click={(event) => {
          event.preventDefault();
          ratingSelect = !ratingSelect;
          isLoading = true;
          changeTopic();
        }}>{RatingChange[!ratingSelect]}</button
      >
      <p>
        Currently showing games sorted by {RatingChange[ratingSelect]}
      </p>
      <div id="grid-container">
        {#each $gamesSortedData as game}
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
    </label>
  </main>
{:else}
  <div>
    <h2>Loading....</h2>
  </div>
{/if}

<style>
</style>
