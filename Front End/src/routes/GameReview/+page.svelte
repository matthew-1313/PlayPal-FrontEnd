<script>
  import { getDocs, collection, addDoc, Timestamp,query,where,orderBy,getDoc,doc, updateDoc } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client";
  import { MyUser } from "../../lib/store";
  import { get } from "svelte/store";
  import { StoredUserInfo } from "../../lib/store";
  import {converse} from '../../lib/converse'
  //gets the current gameId from the url params, and sets it as game_id to be sent off in submitReview
  let connectUserBool = false;
  let userToConnect = {}
  $: isFriends = false
  let currentUser = ""
  export let gameId;
  export let game_name;
  export let game_img;
  function changeStar(event){
    event.preventDefault()
    userRating = event.target.value
  }

  //sets userRating to default 0, until a rating button is pushed
  let userRating = 0;

  //const username = get(MyUser);
  const activeUser = get(StoredUserInfo);
  MyUser.subscribe((value) =>{
    currentUser = value
  })
 
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

  async function changeToFriend(event){
    event.preventDefault()
    const myUserUpdate = doc(db, "Profiles", currentUser);
    let ourUserDetails = await getDoc(doc(db,"Profiles",currentUser))
     ourUserDetails = ourUserDetails.data()
    await updateDoc(myUserUpdate,{
      Friends : [userToConnect.name,...ourUserDetails.Friends]
    })
    isFriends = true


  }

  async function submitReview(event) {
    //sends review
    event.preventDefault()
    const reviewsRef = collection(db, "Reviews")
    let ourUserDetails = await getDoc(doc(db,"Profiles",activeUser.username))
    ourUserDetails = ourUserDetails.data()
    const queriedReviews = query(reviewsRef, where("game_id", "==", gameId), orderBy("created_at", "desc"))
    const querySnapshot = await getDocs(queriedReviews);

    querySnapshot.forEach((doc) => {
      let checkerUser = doc.data()
      if ((checkerUser.user_game_rating === Number(userRating)) && (checkerUser.username !== activeUser.username) && ourUserDetails.Friends.includes(checkerUser.username)){
        userToConnect = {avatar_url: checkerUser.avatar_url,name : checkerUser.username, rating : userRating}
        console.log("here",userToConnect)
        isFriends = true
        connectUserBool = true
      }else if ((checkerUser.user_game_rating === Number(userRating)) && (checkerUser.username !== activeUser.username) ){
        console.log("here",userToConnect)
        userToConnect = {avatar_url: checkerUser.avatar_url,name : checkerUser.username, rating : userRating}
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
      user_game_rating: Number(userRating),
      created_at: Timestamp.fromDate(new Date(Date.now())),
      game_img: game_img,
      game_name: game_name,
    })
    //resets data fields
    reviewField.value = "";
    userRating = 0;
    reviewTitle.value = "";
  }

  function discardReview(event) {
    //resets data fields
    event.preventDefault()
    reviewField.value = "";
    userRating = 0;
    reviewTitle.value = "";
  }

</script>

<div class="game-review-form-container">
<h3>Your Rating:</h3>

<!-- star-rating code & css from https://www.creating-a-star-rating-widget-with-pure-html-css/ -->
<div class="grid-container">
  <div class="rate">
    <input
      type="radio"
      id="star5"
      name="rate"
      value=5
      bind:group={userRating}
    />
    <label for="star5" title="5 stars">5 stars</label>
    <input
      type="radio"
      id="star4"
      name="rate"
      value=4      
      bind:group={userRating}

    />
    <label for="star4" title="4 stars">4 stars</label>
    <input
      type="radio"
      id="star3"
      name="rate"
      value=3
      bind:group={userRating}
    />
    <label for="star3" title="3 star">3 stars</label>
    <input
      type="radio"
      id="star2"
      name="rate"
      value=2
      bind:group={userRating}
    />
    <label for="star2" title="2 star">2 stars</label>
    <input
      type="radio"
      id="star1"
      name="rate"
      value=1
      bind:group={userRating}
    />
    <label for="star1" title="1 star">1 star</label>
  </div>
  <br />
</div>
<br />

<form>
  <h3>Your Review Title:</h3>
  <input class="review-title-form"
    bind:this={reviewTitle}
    bind:value={newTitleValue}
    on:change={(event) => {
      userReviewTitle = event.target.value;
      connectUserBool = false
          }}
  />
  <br />
  <h3>Review:</h3>
  <textarea class="review-body-form"
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
</div>
{#if connectUserBool && !isFriends}
<div class="centerFriend">
<p>The User {userToConnect.name} also has rated this {userToConnect.rating} stars! </p>
<button on:click={changeToFriend}>Click here to add {userToConnect.name}!</button>
</div>
{:else if connectUserBool && isFriends}
<div class="centerFriend">
<p>Your Friend {userToConnect.name} also has rated this {userToConnect.rating} stars!</p>
<button on:click={() => converse({ id: userToConnect.name, name: userToConnect.name, photoUrl: userToConnect.avatar_url, role: "default" })}>Click Here to Message</button>
</div>
{/if}
<style>

  .game-review-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: solid rgba(0, 0, 0, 0.229);
    margin: 50px;
    border-radius: 20px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.67);
  }

  .review-body-form {
    resize: none;
    width: 700px

  }

  .centerFriend{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
