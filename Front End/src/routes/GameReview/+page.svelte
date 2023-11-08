<script>
  //need to send username, fetch user avatar, game id, body to be storeed on the backend
  export let gameId;

  let userReview = "";
  let inputField;
  let newFieldValue = "";
  let userRating = 0;
  let game_id = gameId;

  function setRating(num) {
    userRating = num;
    console.log(userRating);
  }

  function submitReview(event) {
    // send off user review & rating here, with users name, avatar, date of comment, game_id
  }

  function discardReview() {
    inputField.value = "";
    userRating = 0;
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
  <textarea
    bind:this={inputField}
    bind:value={newFieldValue}
    on:change={(event) => {
      userReview = event.target.value;
      //console.log(userReview);
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
