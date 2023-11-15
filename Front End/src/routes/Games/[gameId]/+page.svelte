<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  import { data } from "../../../lib/store";
  import Navbar from "../../../lib/navbar.svelte";
  import GameReview from "../../GameReview/+page.svelte";
  import ReviewComponent from "../../ReviewComponent/+page.svelte";
  import { db } from "../../../lib/firebase/firebase.client";
  import {
    collection,
    query,
    where,
    getAggregateFromServer,
    average,
  } from "firebase/firestore";

  let gameId = $page.params.gameId;
  let game_name = "";
  let game_img = "";
  async function fetchData(gameId) {
    //fetching the Playpal user rating average query from the Reviews collection where game_id is equal to param gameId
    const gameReviewsCollection = collection(db, "Reviews");
    const gameTitleQuery = query(
      gameReviewsCollection,
      where("game_id", "==", gameId)
    );
    const snapshot = await getAggregateFromServer(gameTitleQuery, {
      avgUserGameRating: average("user_game_rating"),
    });
    let avgRatingPlaypalUsers = snapshot.data().avgUserGameRating;
 
    //fetching the game info from API
    const res = await getGameById(gameId);
    const data = await res;

    //constructing the data object for rendering
    if (res) {
      game_name = data.name;
      game_img = data.image;

      data.playpal_rating = Math.round(avgRatingPlaypalUsers * 10) / 10;
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
    <div class="singleGamePage-frame">
      <div class="singleGamePage-gameTitle">
        <h2>{data.name}</h2>
      </div>
      <div class="singleGamePage-fade" />
      <img src={data.image} alt={data.name} />
    </div>
    <p>
      PlayPal Average:
      <b>{data.playpal_rating} Stars</b> | Metacritic:
      <b>{data.metacritic}%</b>
      <br />
    </p>
    <p>Released: {data.released}</p>
    {#each data.parent_platforms_arr as parent}
      | {parent.platform.name} |
    {/each}
    <p>
      {#each data.genres as genre}
        | {genre.name} |
      {/each}
    </p>
    <button on:click={showDescr}>Show/Hide Game Description</button>
    {#if visableDescr}
      <div id="game_description">
        {@html data.description}
        <p>Website: {data.website}</p>
      </div>
    {/if}
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}

<br />
<GameReview {gameId} {game_img} {game_name} />
<ReviewComponent {gameId} />

<style>
</style>
