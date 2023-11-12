<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  import { data } from "../../../lib/store";
  import Navbar from "../../../lib/navbar.svelte";
  import GameReview from "../../GameReview/+page.svelte";
  import ReviewComponent from "../../ReviewComponent/+page.svelte";
  import {db} from "../../../lib/firebase/firebase.client"
  import {collection, query, where, getAggregateFromServer, average} from "firebase/firestore"


  let gameId = $page.params.gameId;
  let game_name = ""
  let game_img = ""

  async function fetchData(gameId) {
    //fetching the Playpal user rating average query from the Reviews collection where game_id is equal to param gameId
    const gameReviewsCollection = collection(db, 'Reviews');
    const gameTitleQuery = query(gameReviewsCollection, where('game_id', '==', gameId))
    const snapshot = await getAggregateFromServer(gameTitleQuery, {
      avgPlaypalUsersRating: average('user_game_rating')
    });
    let ratingUsers = snapshot.data().avgPlaypalUsersRating

    //fetching the game info from API
    const res = await getGameById(gameId);
    const data = await res;

    //constructing the data object for rendering
    if (res) {
      game_name = data.name
      game_img = data.image

      data.playpal_rating = Math.round(ratingUsers*10) / 10 

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
      Metacritic: <span class="emphasis">{data.metacritic}</span> | Playpal users: <span class="emphasis">{data.playpal_rating} of 5 stars</span> average rating
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
<GameReview {gameId} {game_img} {game_name} />
<ReviewComponent {gameId} />

<style>
  img {
    max-width: 70%;
    height: auto;
    align-items: center;
    vertical-align: middle;
    font-style: italic;
    background-repeat: no-repeat;
    background-size: cover;
    shape-margin: 2rem;
    border-radius: 0px 0px 10px 10px;
  }

  .emphasis {
    font-weight: bold;
  }
</style>
