import axios from "axios";
const RawgApi = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const condenseArray = (array) =>{
    let answer = ""
    let newArray = array.map((item) =>{
        return item.name
    })
    for (let i = 0; i < newArray.length;i++){
        if (newArray.length > 1){
        if (i === newArray.length-2){
            answer += ` ${newArray[i]} `
        }else if (i === newArray.length-1){
            answer +=  `and ${newArray[i]}`
        } else{
            answer += `${newArray[i]}, `
        }
    }else{
        answer = newArray[i]
    }
    }
    if (answer.length > 0){
    return answer
    }else{
        return `Topic not specified`
    }
    

}
export const getGames =(topic,bool) =>{
    const myGamesArray = []
    const RatingChange = {
        true : "metacritic",
        false : "rating"
    }
return RawgApi.get(`/games?key=0c4bd7b594bf43a69030cea65b605923&&genres=${topic}&&ordering=-${RatingChange[bool]}`).then(({data}) =>{
    const myResults = data.results
    let userObject = {}
    for (let i = 0; i < myResults.length;i++){
        userObject ={}
        userObject.name = myResults[i].name
        userObject.released = myResults[i].released
        userObject.image = myResults[i].background_image
 if(!myResults[i].metacritic){
                userObject.metacritic = "Not Available"
            }else{
            userObject.metacritic = myResults[i].metacritic
            }        
        userObject.genre = condenseArray(myResults[i].genres) 
        userObject.rating = myResults[i].rating
    
        myGamesArray.push(userObject)

    }
    return myGamesArray
})
.catch((err) =>{
    return err
})
} 
export const getAllGenres = () =>{
    return RawgApi.get('/genres?key=0c4bd7b594bf43a69030cea65b605923').then(({data}) =>{
        return data.results
    }).catch((error) =>{
        return error
    })
}
export const gamesSearch = (userInput) =>{
    const myGamesArray = []
    return RawgApi.get(`/games?search=${userInput}&&key=0c4bd7b594bf43a69030cea65b605923&&page_size=10`).then(({data}) =>{
        const myResults = data.results
        let userObject = {}
        for (let i = 0; i < myResults.length;i++){
            userObject ={}
            userObject.name = myResults[i].name
            userObject.released = myResults[i].released
            userObject.image = myResults[i].background_image
            if(!myResults[i].metacritic){
                userObject.metacritic = "Not Available"
            }else{
            userObject.metacritic = myResults[i].metacritic
            }
            if (myResults[i].genres.length > 0){
            userObject.genre = condenseArray(myResults[i].genres)      
        }else{
            userObject.genre = "not Specified"
        } 
            userObject.rating = myResults[i].rating        
            myGamesArray.push(userObject)
    }
    return myGamesArray
})
.catch((err) =>{
    return err.response.status
})
}

export const getAllGames = () => {
    const gamesArray = [];
    return RawgApi.get(`/games?key=0c4bd7b594bf43a69030cea65b605923`)
      .then(({ data }) => {
        const myResults = data.results;
        let gamesObject = {};
        for (let i = 0; i < myResults.length; i++) {
          gamesObject = {};
          gamesObject.id = myResults[i].id;
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

export const getGameById = (gameId) => {
    console.log(gameId)
    return RawgApi.get(`/games/${gameId}?key=0c4bd7b594bf43a69030cea65b605923`).then(
      ({data}) => {
        console.log(data);
        let singleGameObj = {
          id: data.id,
          name: data.name,
          released: data.released,
          image: data.background_image,
          metacritic: data.metacritic,
          genres: data.genres,
          parent_platforms_arr: data.parent_platforms,
          esrb_rating: data.esrb_rating,
          description: data.description,
          website: data.website,
        };
        return singleGameObj;
      }
    );
  };