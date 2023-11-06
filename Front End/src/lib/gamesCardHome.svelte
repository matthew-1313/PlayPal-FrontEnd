<script>
import testGamesApiResponse from "../db/test/games_test.json"

let gameInfoArr = testGamesApiResponse.results

</script>


<!-- Games Light Cards -->
<main>
    {#each gameInfoArr as game}
        <div id="gameCard">
            <img src={game.background_image} alt={game.title} id="img_gameCard-home"/>
            {game.name}  Rating: {game.rating}
        </div>
    {/each}
</main>

<style>
    #gameCard{
        max-width: 30%;
        box-shadow: 1px 1px 5px 5px #77777738;
        border-radius: 8px;
        margin: 4px;
    }

    #img_gameCard-home {
        max-height: 90px;
    }
</style>
