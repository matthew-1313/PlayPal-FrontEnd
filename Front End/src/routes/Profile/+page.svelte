<script>
  import Navbar from "../../lib/navbar.svelte";
  import { onMount } from "svelte";
  import { MyUser } from "../../lib/store";
  import { db } from "../../lib/firebase/firebase.client";
  import { StoredUserInfo } from "../../lib/store";
  import { onSnapshot, updateDoc, getDoc, collection, doc,query,where,orderBy } from "firebase/firestore";
  let isLoading = true;
  let user = "";
  $: bio = "";
  let checkBio = "";
  let checkImage = "";
  let errorMessage = "";
  let image =
    "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";
  const imageUrlChecker = /(https?:\/\/.*\.(?:png|jpeg|jpg))/i;
  MyUser.subscribe((value) => {
    user = value;
  });
  $: areStatsChanging = false;

  const reviewsRef = collection(db, "Reviews");
  const userReviews = query(
    reviewsRef,
    where("username", "==", user),
    orderBy("created_at", "desc")
  ); 
 // console.log(reviewsRef)

 let myReviews = [];

onMount(async () => {
  const unsubscribe = onSnapshot(userReviews, (querySnapshot) => {
    myReviews = querySnapshot.docs.map((review) => {
      return review.data();
    });
  });
  return () => unsubscribe();
});

async function getDocument(coll, id) {
    const snap = await getDoc(doc(db, coll, id));
    if (snap.exists()) {
      isLoading = false;
      return snap.data();
    } else {
      return Promise.reject(Error(`No such document: ${coll}.${id}`));
    }
  }
  $: mySignedInUser = Promise.resolve(getDocument("Profiles", user)).then(
    (data) => {
      bio = data.bio;
      image = data.image;
    }
  );

  async function submitData(event) {
    event.preventDefault();
    if (checkBio.length < 5) {
      errorMessage = "Bio is not long enough";
    } else if (!imageUrlChecker.test(checkImage)) {
      errorMessage = "The Url for the image is not correct, please try again";
    } else {
      bio = checkBio;
      image = checkImage;
      StoredUserInfo.set({
        username: user,
        avatar_url: checkImage,
      });
      areStatsChanging = false;
      const myUserUpdate = doc(db, "Profiles", user);
      await updateDoc(myUserUpdate, {
        Username: user,
        bio: checkBio,
        image: checkImage,
      });
    }
  }
</script>

<Navbar />
{#if !areStatsChanging && !isLoading}
  <p>Username : {user}</p>
  <p>Bio: {bio || ""}</p>
  <div id="Image">
    <p>Avatar:</p>
    <img
      src={image ||
        "https://icon-library.com/images/default-user-icon/default-user-icon-9.jpg"}
      alt="user profile"
    />
  </div>
  <button
  on:click={(event) => {
    event.preventDefault();
    isLoading = false;
    areStatsChanging = true;
  }}>Change Information</button
>
<h3>All your reviews:</h3>
<p>Click on any review to be taken to the game</p>

  <div>
    {#each myReviews as review}
    <a href= '/Games/{review.game_id}'>
      <div class="reviewCard-Profile">
        <div>    
          <span>{review.game_name}</span>
          <p class="info-review-details">
            {review.user_game_rating} stars | <b>Reviewed at:</b>
            {review.created_at.toDate().toDateString()}
          </p>
        </div>
        <div class="user-review">
          <p>{review.review_title}</p>
          <hr />
          <div>{review.body}</div>
        </div>
      </div>
    </a>
    {/each}
  </div>

{:else if isLoading}
  <p>Loading...</p>
{:else}
  <form on:submit={submitData}>
    <div id="BioArea" class="sect-BioUpdate">
      <div id="bioheader">
        <b>Your Bio:</b>
      </div>
    <div>
      <div id="box-myBio">
      <textarea id="Bio"
          on:change={(event) => {
            event.preventDefault();
            errorMessage = "";
            checkBio = event.target.value;
          }}
          value={checkBio}
          placeholder="Type Bio here"
      />
      </div>
      </div>
    </div>
    <div class="sect-Avatar">
      <div>
      Avatar link:
      </div>
      <div>
      <input
        placeholder="Type Url Here"
        on:change={(event) => {
          event.preventDefault();
          errorMessage = "";
          checkImage = event.target.value;
        }}
        value={checkImage}
      />
      </div>
      <div id="btn-submit">
    <button>Click Here to Submit Changes</button>
    </div> 
    </div>
  </form>
  <p>{errorMessage}</p>

  <button
    on:click={(event) => {
      event.preventDefault();
      areStatsChanging = false;
      isLoading = false;
    }}>Click Here to Go Back</button
  >
{/if}

<style>
  :root {
    --avatar-size: 5rem;
  }

  img {
    border-radius: 50%;
    height: auto;
    width: var(--avatar-size);
  }

  textarea{
    max-width: 60%;
  }

  .sect-BioUpdate {
    display: flex;
    flex-direction: column;
    flex-flow:column;
    padding-top: 5px;
    padding-bottom: 10px;
  }

  #box-myBio {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 10px;
  }


  .sect-Avatar {
    display: flex;
    flex-direction: column;
    flex-flow:column;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 15px;
  }

  .sect-Avatar button {
    max-width: 60%;
    margin: 25px;
  }

 

</style>