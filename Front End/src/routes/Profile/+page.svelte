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
<div class="user-information-container">
    <img class="profile-page-avatar"
      src={image ||
        "https://icon-library.com/images/default-user-icon/default-user-icon-9.jpg"}
      alt="user profile"
    />
  <h3 class="profile-user">Username</h3>
  <h3 >{user}</h3>
  <h3 class="profile-user">Bio</h3>
  <h3 class="profile-bio" >{bio || ""}</h3>
  <button class="update-profile-btn"
  on:click={(event) => {
    event.preventDefault();
    isLoading = false;
    areStatsChanging = true;
  }}>Update Profile</button
>
</div>
<div class="profile-reviews-container">
<h3>Your reviews:</h3>
<p>Click on a review to view game</p>

  <div class="reviews-container">
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
          <div>{review.body}</div>
        </div>
      </div>
    </a>
    {/each}
  </div>
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
    <button class="back-btn"
    on:click={(event) => {
      event.preventDefault();
      areStatsChanging = false;
      isLoading = false;
    }}>Back</button
  >
    </div>
  </form>
  <p>{errorMessage}</p>

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

 .user-information-container {
  display: flex;
  flex-direction: column;
  align-items: center;
 }

 .reviews-container {
  display: flex;
  flex-direction: column;
 }
 h3 {
  font-size: 40px;
  margin: 0;
 }

.profile-page-avatar {
  height: 250px;
  width: 250px;
  margin-top: 10px;
  border: solid 1px rgba(248, 248, 228, 0.87);
  border-top: 1px solid rgba(231, 138, 32, 0.87);
  border-right: 0.75px solid rgba(231, 138, 32, 0.87);
  box-shadow: 0px 5px 10px 5px black;
}

.profile-user {
  font-size: 30px;
color: var(--pp-accent);
  margin: 10px;
}

.profile-bio {
  margin: 10px;
}

.update-profile-btn {
  width: 200px;
  height: 60px;
  margin-top: 20px;
}

.back-btn {
  align-self: center;
}

.profile-reviews-container {
  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid rgba(0, 0, 0, 0.229);
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.67);
}
</style>