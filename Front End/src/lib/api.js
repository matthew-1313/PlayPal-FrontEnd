import axios from 'axios'
const RawgApi = axios.create({
    baseURL : "https://api.rawg.io/api"
})

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
            }        userObject.genre = topic
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
            userObject.genre = myResults[i].genres[0].name        
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
