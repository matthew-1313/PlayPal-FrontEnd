<script>
  import { onMount } from "svelte";
  import { MyUser } from "../../lib/store";
  let userValue;
  onMount(() => {
    return MyUser.set((value) => {
      userValue = value;
    });
  });
</script>

<label
  >Click here to customize your Profile!<a href="/Profile"
    ><button>To Profile</button></a
  ></label
>
