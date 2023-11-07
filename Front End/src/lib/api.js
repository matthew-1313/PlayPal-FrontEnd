import axios from "axios";

const RawgApi = axios.create({
  baseURL: "https://api.rawg.io/api",
});

export const getAllGames = () => {
  const gamesArray = [];
  return RawgApi.get(`/games?key=0c4bd7b594bf43a69030cea65b605923`)
    .then(({ data }) => {
      const myResults = data.results;
      let gamesObject = {};
      for (let i = 0; i < myResults.length; i++) {
        gamesObject = {};
        gamesObject.name = myResults[i].name;
        gamesObject.released = myResults[i].released;
        gamesObject.image = myResults[i].background_image;
        gamesObject.metacritic = myResults[i].metacritic;
        gamesObject.genres = myResults[i].genres;
        gamesArray.push(gamesObject);
      }
      return gamesArray;
    })
    .catch((err) => {
      return err;
    });
};

export const getGames = (topic) => {
  const myGamesArray = [];
  return RawgApi.get(
    `/games?key=0c4bd7b594bf43a69030cea65b605923&&genres=${topic}&&ordering=-metacritic`
  )
    .then(({ data }) => {
      const myResults = data.results;
      let userObject = {};
      for (let i = 0; i < myResults.length; i++) {
        userObject = {};
        userObject.name = myResults[i].name;
        userObject.released = myResults[i].released;
        userObject.image = myResults[i].background_image;
        userObject.metacritic = myResults[i].metacritic;
        userObject.genre = topic;
        myGamesArray.push(userObject);
      }
      return myGamesArray;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const getAllGenres = () => {
  return RawgApi.get("/genres?key=0c4bd7b594bf43a69030cea65b605923")
    .then(({ data }) => {
      return data.results;
    })
    .catch((error) => {
      return error;
    });
};
