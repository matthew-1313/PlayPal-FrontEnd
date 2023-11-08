<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  import { data } from "../../../lib/store";
  import Navbar from "../../../lib/navbar.svelte";
  import GameReview from "../../GameReview/+page.svelte";
  import ReviewComponent from "../../ReviewComponent/+page.svelte";
  let gameId = $page.params.gameId;

  async function fetchData(gameId) {
    const res = await getGameById(gameId);
    const data = await res;

    if (res) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  let visableDescr = false;
  function showDescr() {
    if (visableDescr === false) {
      visableDescr = true;
    } else if (visableDescr === true) {
      visableDescr = false;
    }
  }
</script>

<Navbar />
{#await fetchData(gameId)}
  <p>loading</p>
{:then data}
  <div>
    <img src={data.image} alt={data.name} />
    <p><b>{data.name}</b></p>
    <p>{data.released}</p>
    {#each data.parent_platforms_arr as parent}
      | {parent.platform.name} |
    {/each}
    <p>
      Metacritic: {data.metacritic} | PlayPal User Rating: {data.playpal_rating}
    </p>
    {#each data.genres as genre}
      | {genre.name} |
    {/each}
    <p>{data.website}</p>
    <button on:click={showDescr}>Show/Hide Game Description</button>
    {#if visableDescr}
      <div id="game_description">
        {@html data.description}
      </div>
    {/if}
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}
<br />
<GameReview {gameId} />
<ReviewComponent />

<style>
  img {
    max-width: 70%;
    height: auto;
    align-items: center;
    vertical-align: middle;
    font-style: italic;
    background-repeat: no-repeat;
    background-size: cover;
    shape-margin: 0.75rem;
    border-radius: 0px 0px 10px 10px;
  }
</style>
