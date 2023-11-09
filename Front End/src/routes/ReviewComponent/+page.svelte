<script>
  export let gameId
  gameId = gameId
  import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
  import { db } from '../../lib/firebase/firebase.client'
  import { onMount } from "svelte";
  import { StoredUserInfo } from "../../lib/store";

  StoredUserInfo.subscribe((value) => {
  })


  const reviewsRef = collection(db, "Reviews")
  const queriedReviews = query(reviewsRef, where("game_id", "==", gameId), orderBy("created_at", "desc"))

  let gameReviews = []
  
  async function getReviews () {
    const querySnapshot = await getDocs(queriedReviews)
    gameReviews = querySnapshot.docs.map((review) => {
      return review.data()
    })
  }

  $: getReviews(gameReviews)
  
</script>

<h3>Past Reviews:</h3>
<div>
  {#each gameReviews as review}
    <div class="reviewCard">
      <div>
        <p>
          <img src={review.user_avatar} alt={review.username} />
          {review.username} | <b>User Rating:</b>
          {review.user_game_rating} | <b>Reviewed at:</b>
          {review.created_at.toDate().toDateString()}
        </p>
      </div>
      <div>
        <p>{review.body}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .reviewCard img {
    max-width: 13px;
    border-radius: 50%;
    vertical-align: centre;
  }
  .reviewCard {
    border: solid 1px #777;
    border-radius: 15px;
    margin: 3px;
    font-size: 0.75rem;
    max-width: 50%;
  }
</style>
