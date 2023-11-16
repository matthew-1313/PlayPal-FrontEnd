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

{#if !isLoading}
<div id="SortingSection">
  <select name="drinks" required
    bind:value={gameCategories[currentId]}
    on:change={(event) => {
      event.preventDefault();
      topic = event.target.value.toLowerCase();
      isLoading = true;
      changeTopic();
    }}
  >
  <option value="" disabled selected >Choose your category</option>
  {#each $gameCategories as category}
      <option value={category.id} key={category.name}
        >{category.name}</option
      >
    {/each}
  </select>
  <button
    id="changeRating"
    on:click={(event) => {
      event.preventDefault();
      ratingSelect = !ratingSelect;
      isLoading = true;
      changeTopic();
    }}>Sort by: {RatingChange[!ratingSelect]}</button
  >
  </div>
<div id="TopGamesPage">
  <h1>Welcome to Games!</h1>
  </div>
  <div id="TopGamesPageBtn">
    <a href="/Games/Search"><button>Click Here To Search For A Title</button></a>
    </div>
  <main>
   
      <div id="Ptag">
      <p>
        Currently showing games sorted by {RatingChange[ratingSelect]}
      </p>
      </div>
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
  </main>
{:else}
  <div>
    <h2>Loading....</h2>
  </div>
{/if}

<style>
  #TopGamesPage{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #TopGamesPageBtn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin: 20px;
    padding: 20px;
  }

  #Ptag{
    display: flex;
    justify-content: center;
    text-align: center;
  }

  #changeRating{
    margin: 20px;
  }


</style>
