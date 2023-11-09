<script>
  export let gameId
  gameId = gameId
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from '../../lib/firebase/firebase.client'
  import { onMount } from "svelte";


  const reviewsRef = collection(db, "Reviews")
  const queriedReviews = query(reviewsRef, where("game_id", "==", gameId))

  let gameReviews = [];
  onMount(async () => {
    const querySnapshot = await getDocs(queriedReviews)
    gameReviews = querySnapshot.docs.map((review) => {
      return review.data()
    })

  })
  
  const testData = {
    id: 3498,
    reviews: [
      {
        username: "The Rickchurian",
        body: "east activity belong trick important massage pupil its honor blew though wagon upward shout island oxygen hurry birth drink answer bat gold jar especially",
        user_avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4VPiQhzIBoINe3ESsbRJwwd-fJ0JcjfZhZAzCMal&s",
        created_at: "1/3/2072",
        user_game_rating: 5,
      },
      {
        username: "DangerMouse",
        body: "animal tiny off porch rough your simply spend remember valley simple disappear eager tent known ought scared hour fair into instead two struggle number",
        user_avatar:
          "https://static.wikia.nocookie.net/dangermouse/images/6/62/Dm81.png/revision/latest/thumbnail/width/360/height/360?cb=20220919012715",
        created_at: "5/14/2011",
        user_game_rating: 3,
      },
      {
        username: "BartSimpson1989",
        body: "few twenty name teacher western shape impossible red purpose gather feature nodded center bone scared drop laugh winter hurried view port beauty kind imagine",
        user_avatar:
          "https://en.wikipedia.org/wiki/Bart_Simpson#/media/File:Bart_Simpson_200px.png",
        created_at: "8/7/2011",
        user_game_rating: 1,
      },
    ],
  };
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
