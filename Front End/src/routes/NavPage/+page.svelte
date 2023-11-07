<script>

  import { MyUser } from "../../lib/store";
  import Navbar from "../../lib/navbar.svelte";
  let user;
  MyUser.subscribe((value) => {
    user = value;
  });
</script>
<h1>Hi {user}</h1>
<Navbar/>

