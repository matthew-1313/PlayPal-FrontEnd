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
          <div id="grid-item" class="card">
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
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #grid-container {
    padding-top: 10px;
    display: grid;
    max-width: 60%;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }

  #grid-item {
    max-width: 300px;
    box-shadow: 1px 1px 5px 5px #77777738;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  /* #img_gameCard-home {
    max-height: 90px;
  } */
  .card {
    position: relative;
    text-align: center;
    width: 250px;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  }

  .img-bx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: px;
    overflow: hidden;
    transform: translateY(30px) scale(0.5);
    transform-origin: top;
  }

  .img-bx img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding-bottom: 30px;
  }

  .content .detail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .content .detail h3 {
    /* align-items: baseline; */
    color: #444;
    font-size: 1.6em;
    font-weight: bolder;
  }

  .content .detail span {
    font-size: 1em;
    color: #d05f22;
    font-weight: bold;
  }

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
