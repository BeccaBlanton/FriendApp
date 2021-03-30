import React, {useState, useEffect} from 'react';
import UserCard from '../components/UserCard.js/index.js'
import './css/Favorites.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import API from '../utils/API.js';
import AuthService from '../services/authService';

function Favorites (props){
    const currentUser = AuthService.getCurrentUser();
    const [matches, setMatches] = useState([])
    const [list, setList] = useState()
    const goToChat=()=>{
        props.history.push('/chat')
        window.location.reload()
    }

    useEffect(()=> {
        API.findMatches(currentUser.username)
        .then(res => {
            let array = []
            res.data.forEach((res) => array.push(res.match))
            setList(array)
        })
    }, [])

    useEffect(()=> {
        API.findMatchingUsers({list: list})
        .then((res) => {
            setMatches(res.data)
        })
    }, [list])

    return(
    <main className="favorites">
        <h1 className='Header'>Your Matches:</h1>
        <div className="container">
            <div className="row">
                <div className="card favoritesCard">
                    <div className="row">
                        {matches.map(userProfile => (
                        <Card className="userCard">
                            <UserCard
                            key={userProfile.id}
                            name={userProfile.username}
                            avatar={userProfile.avatar}
                            gender={userProfile.gender}
                            politics={userProfile.politics}
                            children={userProfile.children}
                            drink={userProfile.drink}
                            smoke={userProfile.smoke}
                            cannabis={userProfile.cannabis}
                            age={userProfile.age}
                            sign={userProfile.sign}
                            interests={userProfile.interests}
                            />
                            <Button variant="info" onClick={goToChat}>chat</Button>
                        </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}
export default Favorites;