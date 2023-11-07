import axios from 'axios'
const RawgApi = axios.create({
    baseURL : "https://api.rawg.io/api"
})

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
