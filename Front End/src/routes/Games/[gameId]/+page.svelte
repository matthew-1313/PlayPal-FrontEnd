<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  import { data } from "../../../lib/store";
  let gameId = $page.params.gameId;

  async function fetchData(gameId) {
    const res = await getGameById(gameId);
    const data = await res;

    if (res) {
      return data
    } else {
      throw new Error(data);
    }
  }

</script>

<h2>{gameId}</h2>

{#await fetchData(gameId)}
<p>loading</p>
{:then data}
<p>{data.id}</p>
<p>{data.name}</p>
{:catch error}
<p>{error.message}</p>
{/await}