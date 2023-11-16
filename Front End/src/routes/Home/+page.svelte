<script>
  import GamesCardHome from "../../lib/gamesCardHome.svelte";
  import Navbar from "../../lib/navbar.svelte";
  // import { MyUser } from "../../lib/store";
  // import { data } from "../../lib/store";
  import { onMount } from "svelte";
  import Talk from "talkjs";
  import { StoredUserInfo } from "../../lib/store";
  // let user;

  // MyUser.subscribe((value) => {
  //   user = value;
  // });

  // onMount(async () => {
  //   await Talk.ready;

  //   const currentUser = new Talk.User({
  //     id: $StoredUserInfo.username,
  //     name: $StoredUserInfo.username,
  //     photoUrl: $StoredUserInfo.avatar_url,
  //   });

  //   const otherUser = new Talk.User({
  //     id: "Mike",
  //     name: "Mike",
  //     photoUrl:
  //       "https://img.freepik.com/premium-vector/man-headphones-mascot-logo-gaming-vector-illustration_382438-453.jpg",
  //   });

  //   const session = new Talk.Session({
  //     appId: "tkzuhGNe",
  //     me: currentUser,
  //   });
  //   const conversationID = Talk.oneOnOneId(currentUser, otherUser);
  //   const conversation = session.getOrCreateConversation(conversationID);
  //   conversation.setParticipant(currentUser);
  //   conversation.setParticipant(otherUser);
  //   const popup = session.createPopup()
  //   popup.select(conversation)
  //   popup.mount({show: false})

  
  // });
</script>

<Navbar />
<div id="HomePage">
  <div>
<!-- <h1>Hi {user}</h1> -->
<label><a href="/Games/Search"><button>Click here to Search for any title</button></a> </label>
<GamesCardHome />

</div>
</div>
<style>
  #HomePage{
    text-align: center;
  }
</style>