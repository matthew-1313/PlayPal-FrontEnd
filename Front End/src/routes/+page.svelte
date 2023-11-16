<script>
  import SignUp from "./SignUp/+page.svelte";
  import SignIn from "./SignIn/+page.svelte";
  import Games from "./Games/+page.svelte";
  import Home from "./Home/+page.svelte";
  import gameId from "./Games/[gameId]/+page.svelte";
  // import signinbacker from "src/signinbacker.png";
  import { Router, Link, Route } from "svelte-routing";
  export const name = "Hello";
  export let url = "";
</script>

<div class="imageBox">
  <div class="imageBoxTextarea">
    <p>Welcome Back!</p>
    <a href="/SignIn"><button>Log In</button></a>
    <br />
    <br />
    <p>New Here?</p>
    <a href="/SignUp"><button>Sign Up</button></a>
  </div>
  <img
    src="https://wallpapercave.com/wp/wp7924760.jpg"
    alt="collection of gamecards"
  />
</div>

<Router {url}>
  <div>
    <div>
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/Home" component={Home} />
      <Route path="/Games" component={Games} />
      <Route path="/Games/[gameId]" component={gameId} />
    </div>
  </div>
</Router>

<style>
</style>
