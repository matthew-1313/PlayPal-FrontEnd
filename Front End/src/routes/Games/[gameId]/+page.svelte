<script>
  import { page } from "$app/stores";
  import { getGameById } from "../../../lib/api";
  import { data } from "../../../lib/store";
  import Navbar from "../../../lib/navbar.svelte"
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
<Navbar />
{#await fetchData(gameId)}
<p>loading</p>
{:then data}
<div>
  <img src={data.image} alt={data.name}>
<p>{data.name}</p>
<p>{data.released}</p>
{#each data.parent_platforms_arr as parent}
| {parent.platform.name} |
{/each}
<p>Metacritic: {data.metacritic}</p>
<p>{data.website}</p>
</div>
{:catch error}
<p>{error.message}</p>
{/await}

<style>
  img {
    max-width: 70%;
    height: auto;
    align-items: center;
    vertical-align: middle;
    font-style: italic;
    background-repeat: no-repeat;
    background-size: cover;
    shape-margin: 0.75rem;
    border-radius: 0px 0px 10px 10px;
  }
</style>