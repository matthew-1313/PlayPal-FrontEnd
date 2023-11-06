<script>
  import SignUp from "./SignUp/+page.svelte";
  import SignIn from "./SignIn/+page.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "../lib/navbar.svelte";
  export const name = "Hello";
  export let url = "";
</script>

<Router {url}>
  <div>
    <Navbar />
    <p>Please click one of the below to continue</p>
    <a href="/SignUp"><button>Sign Up</button></a>
    <a href="/SignIn"><button>Log In</button></a>
    <div>
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
    </div>
  </div>
</Router>
