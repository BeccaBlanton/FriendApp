import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import AuthService from "../services/authService";
import '../App.css'
import './css/Createprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'



function Createprofile3 (props){
  const currentUser = AuthService.getCurrentUser();
  const [ageRange, setAgeRange] = React.useState([18, 65]);
  const [distance, setDistance] = React.useState();
  const [interestList, setInterestList] = useState([]);
  const [filterGender, setFilterGender] = useState([]);
  const [filterPolitics, setFilterPolitics] = useState([]);
  const [filterChildren, setFilterChildren] = useState([]);
  const [filterDrink, setFilterDrink] = useState([]);
  const [filterSmoke, setFilterSmoke] = useState([]);
  const [filterCannabis, setFilterCannabis] = useState([]);
  const [filterSign, setFilterSign] = useState([]);

  let newState = []

  useEffect(() => {
          
    if(currentUser === null){
    props.history.push("/login");
    window.location.reload()
    }
  }, [])

  const handleGenderChange = (newVal) => {
      newState = [...filterGender, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterGender(newState)
  }

  const handlePoliticsChange = (newVal) => {
      newState = [...filterPolitics, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterPolitics(newState)
  }

  const handleChildrenChange = (newVal) => {
      newState = [...filterChildren, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterChildren(newState)
  }

  const handleDrinkChange = (newVal) => {
      newState = [...filterDrink, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterDrink(newState)
  }

  const handleSmokeChange = (newVal) => {
      newState = [...filterSmoke, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterSmoke(newState)
  }

  const handleCannabisChange = (newVal) => {
      newState = [...filterCannabis, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterCannabis(newState)
  }

  const handleSignChange = (newVal) => {
      newState = [...filterSign, newVal]
      if(newState.length > 1){
        newState.shift()
      }
      setFilterSign(newState)
  }

  const handleAgeChange = (event, newValue) => {
      setAgeRange(newValue);
    };

  const handleDistanceChange = (event, newValue) => {
        setDistance(newValue);
      };

  useEffect(() => {
      API.getInterests()
          .then(res => {
              setInterestList(res.data)
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

  function handleFormSubmit(e){
      e.preventDefault()
        console.log(filterGender)
        const object = { filterBy: [{
              distance: distance,
              gender: filterGender[0],
              politics: filterPolitics[0],
              ageRange: ageRange,
              children: filterChildren[0], 
              drink: filterDrink[0], 
              smoke: filterSmoke[0], 
              cannabis: filterCannabis[0]
          }]
          }
          console.log(object)

      API.editProfileByName(object, currentUser.username)
      .then(res => {
          console.log(res.data)
          props.history.push("/profile");
          window.location.reload()
          })
      .catch(err => { 
          if (err.response) { 
            console.log('error with response')
          } else if (err.request) { 
              console.log('error with request') 
          } else { 
              console.log('um, sh*ts really broken') 
          } 
        });
  }

  const useStyles = makeStyles({
      root: {
        width: 300,
      },
  });

  const classes = useStyles();
  
  function valuetext(value) {
    return `${value}`;
  }


  const marks = [
      {
        value: 20,
        label: '20',
      },
      {
        value: 30,
        label: '30',
      },
      {
        value: 40,
        label: '40',
      },
      {
        value: 50,
        label: '50',
      },
      {
            value: 60,
          label: '60',
        },
    ];

    const PrettoSlider = withStyles({
      root: {
        color: '#17a2b8',
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
    })(Slider);
      
return (
<main>
<h1 className="Header">Pick how you'd like to filter your friends:</h1>
    <div className="container">
            <div className="profileCard card"> 
                <div className={classes.root}>
                    <div className="distanceSlider">
                <Typography id="discrete-slider" gutterBottom>
                    Distance:
                </Typography>
                <PrettoSlider
                    value={distance}
                    onChange={handleDistanceChange}
                    defaultValue={15}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={50}
                />
                <Badge variant="info"> Distance: {distance} miles</Badge>
                </div>
                <div className="ageSlider">
                    <Typography id="range-slider" gutterBottom>
                        Age Range:
                    </Typography>
                    <PrettoSlider
                        value={ageRange}
                        onChange={handleAgeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={18}
                        max={66}
                        marks={marks}
                    />
                    <Badge variant="info">Age Range: {ageRange[0]+' - '+ageRange[1]} years old</Badge>
                    </div>
                </div>
                <h4>Gender:</h4>
                <ToggleButtonGroup type="checkbox" name="gender" onChange={handleGenderChange} >
                    <ToggleButton   variant="info" value={'Male'}>Male</ToggleButton>
                    <ToggleButton   variant="info"  value={'Female'}>Female</ToggleButton>
                    <ToggleButton   variant="info"  value={'Non-Binary'}>Non-Binary</ToggleButton>
                    <ToggleButton   variant="info"  value={'Transgender'}>Transgender</ToggleButton>
                    <ToggleButton   variant="info"  value={'Intersex' }>Intersex</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Political Affiliation:</h4>
                <ToggleButtonGroup type="checkbox" name="politics" onChange={handlePoliticsChange}>
                    <ToggleButton   variant="info"  value={'Conservative'}>Conservative</ToggleButton>
                    <ToggleButton   variant="info"  value={'Moderate'}>Moderate</ToggleButton>
                    <ToggleButton   variant="info"  value={'Liberal'}>Liberal</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Affliation'}>No Affliation</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Children:</h4>
                <ToggleButtonGroup type="checkbox" name="children" onChange={handleChildrenChange}>
                    <ToggleButton   variant="info"  value={'Has Children'}>Yes</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Children'}>No</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Drinks:</h4>
                <ToggleButtonGroup type="checkbox" name="drink" onChange={handleDrinkChange}>
                    <ToggleButton   variant="info"  value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton   variant="info"  value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton   variant="info"  value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton   variant="info"  value={'Never'}>Never</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Smokes:</h4>
                <ToggleButtonGroup type="checkbox" name="smoke" onChange={handleSmokeChange}>
                    <ToggleButton   variant="info"  value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton   variant="info"  value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton   variant="info"  value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton   variant="info"  value={'Never'}>Never</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Uses cannabis:</h4>
                <ToggleButtonGroup type="checkbox" name="cannabis" onChange={handleCannabisChange}>
                    <ToggleButton   variant="info"  value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton   variant="info"  value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton   variant="info"  value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton   variant="info"  value={'Never'}>Never</ToggleButton>
                    <ToggleButton   variant="info"  value={'No Preference'}>No Preference</ToggleButton>
                </ToggleButtonGroup>
                <h4>Sign:</h4>
                 <ToggleButtonGroup type="checkbox" name="sign" onChange={handleSignChange}>
                    <ToggleButton   variant="info"  value='Aquarius'>Aquarius</ToggleButton>
                    <ToggleButton   variant="info"  value='Pisces'>Pisces</ToggleButton>
                    <ToggleButton   variant="info"  value='Aries'>Aries</ToggleButton>
                    <ToggleButton   variant="info"  value='Taurus'>Taurus</ToggleButton>
                    <ToggleButton   variant="info"  value='Gemini'>Gemini</ToggleButton>
                    <ToggleButton   variant="info"  value='Cancer'>Cancer</ToggleButton>
                    <ToggleButton   variant="info"  value='Leo'>Leo</ToggleButton>
                    <ToggleButton   variant="info"  value='Virgo'>Virgo</ToggleButton>
                    <ToggleButton   variant="info"  value='Libra'>Libra</ToggleButton>
                    <ToggleButton   variant="info"  value='Scorpio'>Scorpio</ToggleButton>
                    <ToggleButton   variant="info"  value='Sagittarius'>Sagittarius</ToggleButton>
                    <ToggleButton   variant="info"  value='Capricorn'>Capricorn</ToggleButton>
                    <ToggleButton   variant="info"  value='No Preference'>No Preference</ToggleButton>
                 </ToggleButtonGroup>
                <h4>Interests:</h4>
                <Form type="checkbox">
                    <div className="mb-3">
                    {interestList.map((item) =>(
                        <Form.Check inline key={item._id} className="interests" label={item.interest} type="checkbox" id={item.interest} data-id={item._id} />
                    ))}
                    </div>
                </Form>

                <Button variant="info" onClick={handleFormSubmit}>Save</Button>
            </div>
            <br></br>
            <br></br>
        </div>
</main>
)
}

export default Createprofile3;