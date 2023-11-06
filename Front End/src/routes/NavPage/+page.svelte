<script>
  import { MyUser } from "../../lib/store";
  import Navbar from "../../lib/navbar.svelte";
  let user;
  MyUser.subscribe((value) => {
    user = value;
  });
</script>

<Navbar />
<h1>Hello {user}</h1>
