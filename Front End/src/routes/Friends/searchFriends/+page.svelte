<script>
    import Navbar from "../../../lib/navbar.svelte"
    let isSearched = false
    let isLoading = false
    let errorMessage = ""
    let searchTerm = ""
    let myFriends = []
    let dbFriends = []
    let isNotFriend = []
    let myCurrentUser = ""
    import { MyUser } from "../../../lib/store";
    import { db } from "../../../lib/firebase/firebase.client";
    import { getDocs,collection,getDoc,doc, updateDoc } from "firebase/firestore";
   

    MyUser.subscribe((value) =>{
      myCurrentUser = value
    })

    async function CheckUserNames(event){
      event.preventDefault()
      const querySnapshot = await getDocs(collection(db,"Profiles"))
      let ourUserDetails = await getDoc(doc(db,"Profiles","Jerry"))
      ourUserDetails = ourUserDetails.data()
      myFriends=[]
      isNotFriend=[]
      isSearched = true
      querySnapshot.forEach((user) =>{
        user = user.data()
        if (searchTerm.toLowerCase() === user.Username.toLowerCase()){
          if (ourUserDetails.Friends.includes(user.Username)){
            let myObject = {name : user.Username, isFriend : true}
              myFriends.push(myObject.name)
              dbFriends.push(myObject.name)
          } else {
            let myObject = {name : user.Username, isFriend : true}
              isNotFriend.push(myObject.name)
          }
            
          } else {
            if (ourUserDetails.Friends.includes(user.Username)){
              let myObject = {name : user.Username, isFriend : false}
                dbFriends.push(myObject.name)
            }
          }
        })
    }
  
    async function ConnectUser(user){
    const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    await updateDoc(myUserUpdate, {
      Friends: [user, ...dbFriends]
    })
    CheckUserNames(e)
  }


  </script>
  <Navbar />
<h1>Searching Friends</h1>
<form on:submit={CheckUserNames}>
    <label placeholder="Search Here" for="SearchForFriend">Search: <input on:change={(event) =>{
      event.preventDefault()
      errorMessage = ""
    }} id="SearchForFriend" placeholder="Search Here" bind:value={searchTerm}>
    </label>
    <button>Submit</button>
  </form>
  <!-- <p>Current Friends....</p> -->
  {#if (myFriends.length > 0) || (isNotFriend.length > 0)}
{#each myFriends as friend}
<div>
  <h3>{friend}</h3>
  <button>Message Here</button>
</div>
{/each}
<br>
<p>Add Friends</p>
{#each isNotFriend as user}
<div>
  <h3>{user}</h3>
  <button value={user} on:click={ConnectUser(user)}>Add Friend</button>
</div>
{/each}
{:else if isSearched}
<p>Sorry unable to locate this username</p>
{:else}
<p>please enter a username to search</p>
{/if}
<a href="/Friends"><button>go Back</button></a>