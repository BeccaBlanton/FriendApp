import React, { useState, useMemo, useEffect } from 'react'
import AuthService from '../services/authService';
import Geolocation from '../utils/geolocation'
import getUserProfile from '../utils/getUserProfile'
import getFavorites from '../utils/getFavorites'
import API from '../utils/API'
import haversine from 'haversine-distance';
import TinderCard from 'react-tinder-card'
import UserCard from '../components/UserCard.js'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Filter from '../components/Filter'

import './css/Matching.css'

function Matching (props) {
  const currentUser = AuthService.getCurrentUser();
  const [users, setusers] = useState([])
  const [interestIds, setInterestIds] = useState([undefined])
  const [lastDirection, setLastDirection] = useState()
  const [show, setShow] = useState(false);
  const alreadyRemoved = []     
  let usersState = users
  
  const { filters, filterUpdate, setFilterUpdate } = getUserProfile()
  const { currentLocation } = Geolocation()
  const { favorites } = getFavorites()

  useEffect(() => {
    
    if(currentUser === null){
      props.history.push("/login");
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    API.getInterests()
        .then(res => {
            const ids = res.data.map(item => item.interest)
            console.log(ids)
            setInterestIds(ids)
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
              console.log('um, sh*ts really broken') 
          } 
        });
}, [])

  const handleClose = () => {
    setFilterUpdate(!filterUpdate)
    setShow(false)};
  const handleShow = () => setShow(true);

  const childRefs = useMemo(() => Array(usersState.length).fill(0).map(i => React.createRef()), [users])
    
  useEffect(() => {
    
    let gendering = ["Female", "Male","Non-binary", "Transgender", "Intersex"]
    let politicing = ["Conservative", "Moderate", "Liberal", "No Affiliation"]
    let smoking = ["Regularly", "Socially", "Occasionally", "Never"]
    let drinking = ["Regularly", "Socially", "Occasionally", "Never"]
    let cannabising = ["Regularly", "Socially", "Occasionally", "Never"]
    let kidding = ["Has Children", "No Children"]
    let signing = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    let interesting = interestIds

    if (filters.gender.length !== 0 && filters.gender.includes("No Preference" || undefined) === false){
      gendering = filters.gender
    }
    if (filters.politics.length !== 0 && filters.politics.includes("No Preference" || undefined) === false){
      politicing = filters.politics
    }
    if (filters.smoke.length !== 0 && filters.smoke.includes("No Preference" || undefined) === false){
      smoking = filters.smoke
    }
    if (filters.drink.length !== 0 && filters.drink.includes("No Preference" || undefined) === false){
      drinking = filters.drink
    }
    if (filters.cannabis.length !== 0 && filters.cannabis.includes("No Preference" || undefined) === false){
      cannabising = filters.cannabis
    }
    if (filters.children.length !== 0 && filters.children.includes("No Preference" || undefined) === false){
      kidding = filters.children
    }
    if (filters.sign.length !== 0 && filters.sign.includes("No Preference" || undefined) === false){
      signing = filters.sign
    }
    if (filters.interests.length !== 0 && filters.interests.includes("No Preference" || undefined) === false){
      const interestPreference = filters.interests.map(item => item.interest)
      interesting = interestPreference
      console.log(interesting)
    }


    const query = {
      gender: gendering,
      politics: politicing,
      age: filters.ageRange,
      smoke: smoking,
      drink: drinking,
      cannabis: cannabising,
      children: kidding,
      sign: signing,
      interests: interesting
    }

    API.filterUsers(query)
        .then(res => {
          console.log(res.data)
          const newArray = []
          const myLocation = {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng
          }
          
          for(var i = 0; i < res.data.length; i++){
            const itemLocation = {
              latitude: res.data[i].location.latitude,
              longitude: res.data[i].location.longitude
            }
            const meters = haversine(myLocation, itemLocation)
            const distances = parseInt(meters)*0.00062137
  
            if(favorites.includes(res.data[i].username) === false && distances < filters.distance){
              newArray.push(res.data[i])
            }
          }
          setusers(newArray)
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
                console.log('um, sh*ts really broken') 
          } 
        });
  }, [filters, favorites, interestIds])

  function saveFavorite(name){
    API.saveFavorites({ 
      username: currentUser.username,
      faveUser: name})
    .then()
    .catch(err => { 
      if (err.response) { 
      console.log('error with response')
      } else if (err.request) { 
          console.log('error with request') 
      } else { 
          console.log('um, sh*ts really broken') 
      } });
  }

  function checkForMatch(faveName){
    API.getFavoritesByName(faveName)
      .then(item => {
        let array = []
        const results = item.data
        results.forEach((res) => array.push(res.faveUser))
        console.log(array)
        
        if(array.includes(currentUser.username)){
          alert("It's a match!")
          API.doubleEntry([
            { currentUser: currentUser.username,
              match: faveName
            },
            { currentUser: faveName,
              match: currentUser.username
            }
          ])
          .then()
          .catch(err => { 
            if (err.response) { 
            console.log('error with response')
            } else if (err.request) { 
                console.log('error with request') 
            } else { 
                console.log('um, sh*ts really broken') 
            } });
        }
    })
  }

  const swiped = (direction, nameToDelete, profileId) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
    if(direction === 'right'){
      checkForMatch(nameToDelete, profileId)
      saveFavorite(nameToDelete)
    }
  }

  const outOfFrame = (username) => {
    console.log(username + ' left the screen!')

  }

  const swipe = (dir, nameToDelete, profileId) => {
    let usersState = users
    const cardsLeft = usersState.filter(person => !alreadyRemoved.includes(person.username))
    console.log(cardsLeft)
    if (cardsLeft.length) {
      const toBeRemoved = nameToDelete // Find the card object to be removed
      console.log(toBeRemoved)
      const index = usersState.map(person => person.username).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
    if (dir === 'right'){
      saveFavorite(profileId)
      checkForMatch(nameToDelete, profileId)
    }
  }

  return (
    
    <div>
      {users.length === 0 ? 
      <div><h1 className="Header">There aren't any users who match your preferences. Keep looking!</h1>
     <Button variant="info" onClick={handleShow} style={{position: 'relative',left: '55%',fontSize: 'x-large'}}>
        Filter <i className="fas fa-filter"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Your BFFL:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Filter />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
     : 
      <div>
      <h1 className='Header'>Are you my BFFL?</h1>
      <Button variant="info" onClick={handleShow} style={{position: 'relative',left: '55%',fontSize: 'x-large'}}>
        Filter <i className="fas fa-filter"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Your BFFL:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Filter />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='cardContainer'>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
        {users.map((userProfile, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={userProfile.username} onSwipe={(dir) => swiped(dir, userProfile.username, userProfile._id)} onCardLeftScreen={() => outOfFrame(userProfile.username)} preventSwipe={['up', 'down']}>
              <div className="card" style={{width: '24rem', borderRadius:'15px'}}>
            <UserCard
                                key={userProfile._id}
                                name={userProfile.username}
                                avatar={userProfile.avatar || "https://loremflickr.com/320/240"}
                                gender={userProfile.gender || "not specified"}
                                politics={userProfile.politics || "not specified"}
                                children={userProfile.children || "not specified"}
                                drink={userProfile.drink || "not specified"}
                                smoke={userProfile.smoke || "not specified"}
                                cannabis={userProfile.cannabis || "not specified" }
                                age={userProfile.age || "not specified"}
                                sign={userProfile.sign || "not specified"}
                                interests={userProfile.interests || "anything"}
                                />
            <ButtonGroup>
                <Button variant="danger" onClick={() => swipe('left', userProfile.username, userProfile._id)}><i className="far fa-times-circle"></i></Button>
                <Button variant="success" onClick={() => swipe('right', userProfile.username, userProfile._id)}><i className="far fa-check-circle"></i></Button>
            </ButtonGroup>
            </div>
          </TinderCard>
        )}
       
      </div> 
    
    </div>
    }
    <br></br>
    <br></br>
    </div>
  )
}

export default Matching