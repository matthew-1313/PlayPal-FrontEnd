<script>
  import Navbar from "../../lib/navbar.svelte";
  import { getContext } from "svelte";
  const getUser = getContext('myUser')
  import { MyUser } from "../../lib/store";
  let user = "";
  let checkUser = "";
  let bio = "a";
  let checkBio = "";
  let checkImage = ""
  let errorMessage = ""
  let image = "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg";
  const imageUrlChecker = /(https?:\/\/.*\.(?:png|jpeg|jpg))/i
  let sub = MyUser.subscribe((value) =>{
    user = value
  })
  $: areStatsChanging = false

  const submitData = (event) => {
    event.preventDefault()
    if (!checkUser){
      errorMessage = "The User field is empty"
    }else if (checkBio.length < 5){
      errorMessage = "Bio is not long enough"
    }else if (!imageUrlChecker.test(checkImage)){
      errorMessage = "The Url for the image is not correct, please try again"
    }else{
      user = checkUser;
      bio = checkBio;
      image = checkImage;
      areStatsChanging = false;
    }
  }
</script>

<Navbar />
<h1>This is the Profile page for {user}</h1>
{#if !areStatsChanging}
<p>Username : {user}</p>
<p>Bio: {bio}</p>
<div id="Image">
<p>Avatar: </p>
<img src={image} alt="user profile">
</div>
<p>Please see a list of your reviewed games below:</p>

<button on:click={(event) =>{
  event.preventDefault()
  areStatsChanging = true
}}>Change Information</button>

{:else}
<form on:submit={submitData}>
  <label>Username<input on:change={(event) =>{
    event.preventDefault()
    errorMessage = ""
    checkUser = event.target.value
  }} value={checkUser} placeholder="Type New Username Here"></label>
  <label>Bio <textarea on:change={(event) =>{
    event.preventDefault()
    errorMessage=""
    checkBio = event.target.value
  }} value={checkBio} placeholder="Type Bio here"></textarea></label>
  <label>Avatar Url: <input placeholder="Type Url Here" on:change={(event) =>{
    event.preventDefault()
    errorMessage=""
    checkImage = event.target.value
  }} value={checkImage}></label>
  <button>Click Here to Submit Changes</button>
</form>
<p>{errorMessage}</p>


<button on:click={((event) =>{
  event.preventDefault()
  areStatsChanging = false
})}>Click Here to Go Back</button>
  {/if}

<style>
  #Image{
    display: flex;
    flex-direction: row;
  }
  img{
    width: 198px;
    max-height: 100%;
  }
</style>