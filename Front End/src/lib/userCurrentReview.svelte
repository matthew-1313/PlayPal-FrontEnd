<!-- <script>
    export let gameId
    gameId = gameId
    import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
    import { db } from '../../lib/firebase/firebase.client'
    import { onMount } from "svelte";
    import { StoredUserInfo } from "../../lib/store";
  
    StoredUserInfo.subscribe((value) => {
    })
  
  
    const reviewsRef = collection(db, "Reviews")
    const queriedReviewbyUser = query(reviewsRef, and(
        where("game_id", "==", gameId), 
        where("username", "==", )
        )
    ));
  
    let gameReviews = []
    
    onMount(async () => {
      const unsubscribe = onSnapshot(queriedReviews, (querySnapshot) => {
        gameReviews = querySnapshot.docs.map((review) => {
          return review.data()
        })
      })
      return () => unsubscribe()
    })
  
  </script> -->

  <h3>Your review of this game</h3>