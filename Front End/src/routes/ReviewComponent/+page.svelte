<script>
  export let gameId;
  gameId = gameId;
  import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    QueryDocumentSnapshot,
  } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client";
  import { onMount } from "svelte";
  import { StoredUserInfo } from "../../lib/store";
  import ReviewEdit from "../../lib/reviewEdit.svelte";

  StoredUserInfo.subscribe((value) => {});

  const reviewsRef = collection(db, "Reviews");
  const queriedReviews = query(
    reviewsRef,
    where("game_id", "==", gameId),
    orderBy("created_at", "desc")
  );

  let gameReviews = [];

  onMount(async () => {
    const unsubscribe = onSnapshot(queriedReviews, (querySnapshot) => {
      gameReviews = querySnapshot.docs.map((review) => {
        return review.data();
      });
    });
    return () => unsubscribe();
  });
  // console.log(gameReviews, "query")
</script>

<!-- <ReviewEdit {gameReviews} {gameId}/> -->

<h3>Other Playpal User Reviews:</h3>
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
        <h3>{review.review_title}</h3>
        <p>{review.body}</p>
      </div>
    </div>
  {/each}
</div>

<style>
</style>
