<script>
  //need to send username, fetch user avatar, game id, body to be storeed on the backend

  let userReview = "";
  let inputField;
  let newFieldValue = "";

  function submitReview(event) {
    // send off user review here, with users name, avatar, date of comment, game id
  }

  function discardReview() {
    inputField.value = "";
  }
</script>

<h3>Played this game? Leave a review!</h3>
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
    width: 50%;
    height: 100px;
  }
</style>
