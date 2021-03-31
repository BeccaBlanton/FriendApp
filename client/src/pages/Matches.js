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

    useEffect(() => {
    
        if(currentUser === null){
          props.history.push("/login");
          window.location.reload()
        }
    }, [])

    useEffect(()=> {
        API.findMatches(currentUser.username)
        .then(res => {
            let array = []
            res.data.forEach((res) => array.push(res.match))
            setList(array)
        })
        .catch(err => { 
            if (err.response.status === 401 || err.response.status === 403) { 
            console.log(err.response.status)
            AuthService.logout()
            props.history.push("/login");
            window.location.reload()
            } else if (err.request) { 
                console.log('error with request') 
            } else { 
                console.log('something else went wrong') 
            } 
        });
    }, [])

    useEffect(()=> {
        API.findMatchingUsers({list: list})
        .then((res) => {
            setMatches(res.data)
        })
        .catch(err => {
            if(err){
                console.log(err)
            }
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