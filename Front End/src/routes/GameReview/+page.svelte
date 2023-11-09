<script>
  import { getDocs, collection, addDoc, Timestamp } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser } from "../../lib/store";
  import { get } from "svelte/store";

  //gets the current gameId from the url params, and sets it as game_id to be sent off in submitReview
  export let gameId;
  let game_id = gameId;

  //sets userRating to default 0, until a rating button is pushed
  let userRating = 0;

  const username = get(MyUser);

  //these are the users final review/title to be sent off in submitReview
  let userReview = "";
  let userReviewTitle = "";

  //these can be ignored, they keep track of the input and textarea fields so they can be reset on submit/discard
  let reviewTitle = "";
  let reviewField;
  let newReviewValue = "";
  let newTitleValue = "";

  //sets userRating based on 1-5 button clicks, to be sent off in submitReview
  function setRating(num) {
    userRating = num;
  }

  async function submitReview() {
    //sends review
    const docRef = await addDoc(collection(db, "Reviews"), {
      username: username,
      user_avatar: "",
      review_title: userReviewTitle,
      body: userReview,
      game_id: game_id,
      user_game_rating: userRating,
      created_at: Timestamp.fromDate(new Date("December 10, 1815")),
    });
    //resets data fields
    reviewField.value = "";
    userRating = 0;
    reviewTitle.value = "";
  }

  function discardReview() {
    //resets data fields
    reviewField.value = "";
    userRating = 0;
    reviewTitle.value = "";
  }
</script>

<h3>Rate & Leave a review!</h3>

<p>What would you rate this game?</p>
<div class="grid-container">
  <button
    class="grid-item"
    on:click={() => {
      setRating(1);
    }}
    >1 Star
  </button>
  <button
    class="grid-item"
    on:click={() => {
      setRating(2);
    }}>2 Stars</button
  >
  <button
    class="grid-item"
    on:click={() => {
      setRating(3);
    }}>3 Stars</button
  >
  <button
    class="grid-item"
    on:click={() => {
      setRating(4);
    }}>4 Stars</button
  >
  <button
    class="grid-item"
    on:click={() => {
      setRating(5);
    }}>5 Stars</button
  >
</div>
<br />

<form>
  <h3>Review Title:</h3>
  <input
    bind:this={reviewTitle}
    bind:value={newTitleValue}
    on:change={(event) => {
      userReviewTitle = event.target.value;
    }}
  />
  <br />
  <h3>Review:</h3>
  <textarea
    bind:this={reviewField}
    bind:value={newReviewValue}
    on:change={(event) => {
      userReview = event.target.value;
    }}
  />
  <br />
  <button on:click={submitReview}>Submit</button> |
  <button on:click={discardReview}>Discard</button>
</form>

<style>
  textarea {
    padding: 10px;
    width: 50%;
    height: 100px;
    margin-top: 15px;
  }
  .grid-container {
    display: inline;
  }
  .grid-item {
    border-radius: 20%;
  }
</style>
