<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  let gameId = $page.params.gameId;
</script>

<h2>{gameId}</h2>
