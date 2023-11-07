<script>
  import SignUp from "./SignUp/+page.svelte";
  import SignIn from "./SignIn/+page.svelte";
  import Games from "./Games/+page.svelte";
  import Home from "./Home/+page.svelte"
  import SingleGamePage from "./SingleGamePage/+page.svelte";
  import gameId from "./Games/[gameId]/+page.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "../lib/navbar.svelte";
  export const name = "Hello";
  export let url = "";
</script>

<Router {url}>
  <div>
    <p>Please click one of the below to continue</p>
    <a href="/SignUp"><button>Sign Up</button></a>
    <a href="/SignIn"><button>Log In</button></a>
    <div>
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Home" component={Home} />
      <Route path="/Games" component={Games} />
      <Route path="/Games/[gameId]" component={gameId} />
    </div>
  </div>
</Router>
