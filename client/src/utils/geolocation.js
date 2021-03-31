import { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import API from '../utils/API'

const Geolocation = () => {
    const currentUser = AuthService.getCurrentUser();
    const [location, setLocation] = useState({ 
        loaded: false,
        coordinates: {lat: "", lng: "" }
    });

    const onSuccess = (location) => {
        
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        });

        if(currentUser){
            API.editProfileByName({
                location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                }
            }, currentUser.username, 
            { user: {
                accessToken: currentUser.accessToken
            }})
            .then()
            .catch(err => { 
                if (err.response) { 
                console.log('error with response')
                } else if (err.request) { 
                    console.log('error with request') 
                } else { 
                    console.log('something is not quite right') 
                } 
            });
        }
    };
    
    const onError = error => {
        setLocation({
            loaded: true,
            error
        });
    }
    
    useEffect(() => {
        
        if(!("geolocation" in navigator)) {
            
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    
    return {
        currentLocation: {
            lat: location.coordinates.lat,
            lng: location.coordinates.lng
        }
    };
}
export default Geolocation
