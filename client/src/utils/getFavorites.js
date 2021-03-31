import {useState, useEffect} from 'react';
import API from "../utils/API";
import AuthService from "../services/authService";

const getFavorites = () => {
    const currentUser = AuthService.getCurrentUser();
    const [favorites, setFavorites] = useState([currentUser.username])
    
    useEffect(() => {

        if(currentUser){
            API.getFavoritesByName(currentUser.username, { user: {
                accessToken: currentUser.accessToken
            }})
            .then(item => {
                let array = [currentUser.username]
                const results = item.data
                results.forEach((res) => array.push(res.faveUser))
                setFavorites(array)
            })
        }
    }, [])

    return {
        favorites
    }
}

export default getFavorites;