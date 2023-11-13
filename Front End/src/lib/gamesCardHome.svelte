<script>
  import { getAllGames } from "../lib/api";

  async function fetchData() {
    const res = await getAllGames();
    const data = await res;

    if (res) {
      return data.slice(0, 12);
    } else {
      throw new Error(data);
    }
  }
</script>

<!-- Games Light Cards -->
<main>
  <h3>List of Recommended Games:</h3>
  {#await fetchData()}
    <p>loading</p>
  {:then data}
    <div id="grid-container">
      {#each data as game}
        <a href="/Games/{game.id}">
          <div id="grid-item" class="miniGamesCard">
            <div class="content">
              <div class="detail">
                <h3>{game.name}</h3>
                <p><span>Rating: {game.metacritic}</span></p>
              </div>
            </div>
            <div class="img-bx">
              <img src={game.image} alt={game.title} id="img_gameCard-home" />
            </div>
          </div>
        </a>
      {/each}
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
  <a href="/Games"><button>View More</button></a>
</main>

<style>
  /* .sci {
  position: relative;
  display: flex;
  margin-top: 5px;
}

.sci li {
  list-style: none;
  margin: 4px;
}

.sci li a {
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: transparent;
  font-size: 1.5em;
  color: #444;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.5s;
}

.sci li a:hover {
  background: #03a9f4;
  color: #fff;
} */
</style>
