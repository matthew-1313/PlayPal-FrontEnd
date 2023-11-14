<script>
  import { getDocs, collection, addDoc, Timestamp,query,where,orderBy,getDoc,doc } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser } from "../../lib/store";
  import { get } from "svelte/store";
  import { StoredUserInfo } from "../../lib/store";

  //gets the current gameId from the url params, and sets it as game_id to be sent off in submitReview
  let connectUserBool = false;
  let userToConnect = {}
  let isFriends = false
  export let gameId;
  export let game_name;
  export let game_img;

  //sets userRating to default 0, until a rating button is pushed
  let userRating = 0;

  //const username = get(MyUser);
  const activeUser = get(StoredUserInfo);
 
  //these are the users final review/title to be sent off in submitReview
  let userReview = "";
  let userReviewTitle = "";

  //these can be ignored, they keep track of the input and textarea fields so they can be reset on submit/discard
  let reviewTitle = "";
  let reviewField;
  let newReviewValue = "";
  let newTitleValue = "";

  //sets userRating based on 1-5 button clicks, to be sent off in submitReview
  // function setRating(num) {
  //   userRating = num;
  // }

  async function submitReview() {
    //sends review
    const reviewsRef = collection(db, "Reviews")
    console.log(activeUser)
    let ourUserDetails = await getDoc(doc(db,"Profiles",activeUser.username))
    ourUserDetails = ourUserDetails.data()
    const queriedReviews = query(reviewsRef, where("game_id", "==", gameId), orderBy("created_at", "desc"))
    const querySnapshot = await getDocs(queriedReviews);
      querySnapshot.forEach((doc) => {
        let checkerUser = doc.data()
        if ((checkerUser.user_game_rating === userRating) && (checkerUser.username !== activeUser.username) && ourUserDetails.Friends.includes(checkerUser.username)){
        userToConnect = {name : checkerUser.username, rating : userRating}
        isFriends = true
        connectUserBool = true
        }else if ((checkerUser.user_game_rating === userRating) && (checkerUser.username !== activeUser.username) ){
          userToConnect = {name : checkerUser.username, rating : userRating}
          isFriends = false
          connectUserBool = true
        }
}); 
    const docRef = await addDoc(collection(db, "Reviews"), {
      username: activeUser.username,
      user_avatar: activeUser.avatar_url,
      review_title: userReviewTitle,
      body: userReview,
      game_id: gameId,
      user_game_rating: userRating,
      created_at: Timestamp.fromDate(new Date(Date.now())),
      game_img: game_img,
      game_name: game_name,
    })
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

<h3>Your Rating:</h3>

<!-- star-rating code & css from https://www.creating-a-star-rating-widget-with-pure-html-css/ -->
<div class="grid-container">
  <div class="rate">
    <input
      type="radio"
      id="star5"
      name="rate"
      value="5"
      bind:group={userRating}
    />
    <label for="star5" title="5 stars">5 stars</label>
    <input
      type="radio"
      id="star4"
      name="rate"
      value="4"
      bind:group={userRating}
    />
    <label for="star4" title="4 stars">4 stars</label>
    <input
      type="radio"
      id="star3"
      name="rate"
      value="3"
      bind:group={userRating}
    />
    <label for="star3" title="3 star">3 stars</label>
    <input
      type="radio"
      id="star2"
      name="rate"
      value="2"
      bind:group={userRating}
    />
    <label for="star2" title="2 star">2 stars</label>
    <input
      type="radio"
      id="star1"
      name="rate"
      value="1"
      bind:group={userRating}
    />
    <label for="star1" title="1 star">1 star</label>
  </div>
  <br />
</div>
<br />

<form>
  <h3>Your Review Title:</h3>
  <input
    bind:this={reviewTitle}
    bind:value={newTitleValue}
    on:change={(event) => {
      userReviewTitle = event.target.value;
      connectUserBool = false
          }}
  />
  <br />
  <h3>Review:</h3>
  <textarea
    bind:this={reviewField}
    bind:value={newReviewValue}
    on:change={(event) => {
      userReview = event.target.value;
      connectUserBool = false
    }}
  />
  <br />
  <button on:click={submitReview}>Submit</button> |
  <button on:click={discardReview}>Discard</button>

</form>
{#if connectUserBool && !isFriends}
<p>The User {userToConnect.name} also has rated this {userToConnect.rating} stars! </p>
<button>Click here to add {userToConnect.name}!</button>
{:else if connectUserBool && isFriends}
<p>Your Friend {userToConnect.name} also has rated this {userToConnect.rating} stars!</p>
<a href="/Friends"><button>Click Here to Message</button></a>
{/if}
<style>
</style>
