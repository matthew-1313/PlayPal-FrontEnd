<script>
  import Navbar from "../../lib/navbar.svelte";
  import { getContext } from "svelte";
  import { MyUser } from "../../lib/store";
  import { db } from "../../lib/firebase/firebase.client";
  import { StoredUserInfo } from "../../lib/store";
  import { updateDoc, getDoc, collection, doc } from "firebase/firestore";
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
<h1>This is the Profile page for {user}</h1>

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
  <p>Please see a list of your reviewed games below:</p>

  <button
    on:click={(event) => {
      event.preventDefault();
      isLoading = false;
      areStatsChanging = true;
    }}>Change Information</button
  >
{:else if isLoading}
  <p>Loading...</p>
{:else}
  <form on:submit={submitData}>
    <p>I am User {user}</p>
    <label
      >Bio <textarea
        on:change={(event) => {
          event.preventDefault();
          errorMessage = "";
          checkBio = event.target.value;
        }}
        value={checkBio}
        placeholder="Type Bio here"
      /></label
    >
    <label
      >Avatar Url: <input
        placeholder="Type Url Here"
        on:change={(event) => {
          event.preventDefault();
          errorMessage = "";
          checkImage = event.target.value;
        }}
        value={checkImage}
      /></label
    >
    <button>Click Here to Submit Changes</button>
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
  #Image {
    display: flex;
    flex-direction: row;
  }
  img {
    width: 198px;
    max-height: 100%;
  }
</style>
