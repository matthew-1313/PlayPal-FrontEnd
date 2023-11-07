<script>
import GamesCardHome from "../../lib/gamesCardHome.svelte";
import Navbar from "../../lib/navbar.svelte";
import { MyUser } from "../../lib/store";
import { data } from "../../lib/store";
import { onMount } from "svelte";
let user;
MyUser.subscribe((value) => {
  user = value;

})

</script>

<Navbar />
<h1>This is the home page</h1>
<h1>Hi {user}</h1>
<p>Insert search bar here</p>

<p>user connections online status here</p>

<p>show upcoming events here</p>

<GamesCardHome />