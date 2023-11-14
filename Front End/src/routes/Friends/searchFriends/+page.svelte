<script>
    import Navbar from "../../../lib/navbar.svelte"
    import { MyUser } from "../../../lib/store";
    import { db } from "../../../lib/firebase/firebase.client";
    import { getDocs,collection,getDoc,doc, updateDoc } from "firebase/firestore";
    import { converse } from '../../../lib/converse.js'

    let isSearched = false
    let errorMessage = ""
    let searchTerm = ""
    let myFriends = []
    let dbFriends = []
    let isNotFriend = []
    let myCurrentUser = ""


MyUser.subscribe((value) =>{
  myCurrentUser = value
})
//checks Data upon Button Press
async function changeData(){
  const querySnapshot = await getDocs(collection(db,"Profiles"))
      let ourUserDetails = await getDoc(doc(db,"Profiles",myCurrentUser))
      ourUserDetails = ourUserDetails.data()
      dbFriends = []
      myFriends=[]
      isNotFriend=[]
 
      isSearched = true
      querySnapshot.forEach((user) =>{
        user = user.data()
        if (searchTerm.toLowerCase() === user.Username.toLowerCase()){
          if (ourUserDetails.Friends.includes(user.Username)){
            let myObject = {name : user.Username, isFriend : true, avatar: user.image}
              myFriends.push(myObject)
              dbFriends.push(myObject)
          } else {
            let myObject = {name : user.Username, isFriend : true, avatar: user.image}
              isNotFriend.push(myObject)
          }
            
          } else {
            if (ourUserDetails.Friends.includes(user.Username)){
              let myObject = {name : user.Username, isFriend : false, avatar: user.image}
                dbFriends.push(myObject)
            }
          }
        })
}
    MyUser.subscribe((value) =>{
      myCurrentUser = value
    })

     function CheckUserNames(event){
      event.preventDefault()
      changeData()
    }
  
    async function ConnectUser(user){
    const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    const mapArray = dbFriends.map((friend)=> {
      return friend.name
    })
    console.log(user)
    await updateDoc(myUserUpdate, {
      Friends: [user, ...mapArray]
    })
    changeData()
  
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

  {#key dbFriends} 

  <!-- <p>Current Friends....</p> -->
  {#if (myFriends.length > 0) || (isNotFriend.length > 0)}
{#each myFriends as friend}
<div>
  <h3>{friend.name}</h3>
  <img src={friend.avatar} alt={friend.name}>
  <button on:click={() => converse({id: friend.name, name: friend.name, photoURL: friend.avatar})}>Message Here</button>
</div>
{/each}
<br>
{#each isNotFriend as user}
<div>
  <h3>{user.name}</h3>
  <img src={user.avatar} alt={user.name} />
  <button value={user.name} on:click={ConnectUser(user.name)}>Add Friend</button>
</div>
{/each}
{:else if isSearched}
<p>Sorry unable to locate this username</p>
{:else}
<p>please enter a username to search</p>
{/if}
{/key}
<br>
<a href="/Friends"><button>go Back</button></a>

<style>
  :root {
    --avatar-size: 5rem;
  }

  img {
    border-radius: 50%;
    height: auto;
    width: var(--avatar-size);
  }
</style>