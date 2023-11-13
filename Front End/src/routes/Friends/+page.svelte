<script>
  import Navbar from "../../lib/navbar.svelte";
  let isSearching = false
  let isLoading = false
  let errorMessage = ""
  let myFriends = []
  let isNotFriend = []
  let myCurrentUser = ""
  import { MyUser } from "../../lib/store";
  import { db } from "../../lib/firebase/firebase.client";
  import { getDocs,collection,getDoc,doc, updateDoc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  MyUser.subscribe((value) =>{
    myCurrentUser = value
  })

  onMount(() =>{
  loadUsers()
  })
  // let ourUser = []
  async function loadUsers(){
    const querySnapshot = await getDocs(collection(db,"Profiles"))
    let ourUserDetails = await getDoc(doc(db,"Profiles",myCurrentUser))
    console.log(myCurrentUser)
    ourUserDetails = ourUserDetails.data()
    myFriends=[]
    isNotFriend=[]
    // const unsubscribe = onSnapshot(getDoc(doc(db,"Profiles","Jerry")),(ourUserDetails) =>{  
    //   ourUser = ourUserDetails.docs.map((field) =>{
    //    return field.data()
    //   })
    // })

    querySnapshot.forEach((user) =>{
    user = user.data()
    console.log(ourUserDetails)
      if (ourUserDetails.Friends.includes(user.Username)){
     let myObject = {name : user.Username, isFriend : true}
     myFriends.push(myObject.name)
      } else if (user.Username === myCurrentUser) {
      console.log("working")
      } else{
        let myObject = {name : user.Username, isFriend : false}
        isNotFriend.push(myObject.name)
      }
  })
  // console.log(user, "returned user data")
  // return () => unsubscribe()
    }
  
async function ConnectUser(user){
  console.log(user)
  const myUserUpdate = doc(db, "Profiles", myCurrentUser);
    console.log(myUserUpdate)
    await updateDoc(myUserUpdate, {
      Friends: [user, ...myFriends]
    })
    loadUsers()

}

</script>

<Navbar />
<h1>This is the Friends page</h1>
<p>{errorMessage}</p>
<p>Current Friends....</p>
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
<br>
<button><a href="Friends/searchFriends">Search Here</a></button>


<p>Recommended Friends</p>

