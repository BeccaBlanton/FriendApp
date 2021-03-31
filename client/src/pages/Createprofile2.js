import React, { useState, useEffect } from 'react';
import API from "../utils/API"
import AuthService from "../services/authService";
import '../App.css'
import './css/Createprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButtonGroup from'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

function Createprofile2 (props){
    const currentUser = AuthService.getCurrentUser();
    const [gender, setGender] = useState();
    const [politics, setPolitics] = useState();
    const [children, setChildren] = useState();
    const [drink, setDrink] = useState();
    const [smoke, setSmoke] = useState();
    const [cannabis, setCannabis] = useState();
    const [age, setAge] = useState();
    const [sign, setSign] = useState();
    const [interestList, setInterestList] = useState([]);
    const checkboxArray = document.getElementsByClassName('interests')



    const handleGenderChange = (val) => setGender(val);
    const handlePoliticsChange = (val) => setPolitics(val);
    const handleChildrenChange = (val) => setChildren(val);
    const handleDrinkChange = (val) => setDrink(val);
    const handleSmokeChange = (val) => setSmoke(val);
    const handleCannabisChange = (val) => setCannabis(val);
    const handleAgeChange = (val) => setAge(val);
    const handleSignChange = (val) => setSign(val);

    useEffect(() => {
        
        if(currentUser === null){
        props.history.push("/login");
        window.location.reload()
        }
    }, [])

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

    function handleFormSubmit(event) {
        event.preventDefault();
        const myinterests = []

        for( var i = 0; i < checkboxArray.length; i ++){
            if (checkboxArray[i].children[0].checked === true){
                
                const object = {
                    interest: checkboxArray[i].children[0].id,
                    _id: checkboxArray[i].children[0].dataset.id
                }
                myinterests.push(object)
            }
        }
        
        const userProfile = {
            gender: gender, 
            politics: politics, 
            children: children, 
            drink: drink, 
            smoke: smoke, 
            cannabis: cannabis, 
            age: age,
            sign: sign,
            interests: myinterests
            }
        
            API.editProfileByName(userProfile, currentUser.username)
            .then(res => {
                console.log(res.data)
                props.history.push("/createprofile3");
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
    
    return(
    <main>
        <h1 className="Header">Now let's find out more about you:</h1>
        <div className="container">
            <div className="profileCard card">
                <Badge variant="info"
                        style={{width: 'fit-content', fontSize: 'inherit'}}>Age:{age}</Badge>
                <DropdownButton
                variant="info"
                alignRight
                title="Age"
                id="dropdown-menu-align-right"
                onSelect={handleAgeChange}
                >
                    <Dropdown.Item eventKey='18' >18</Dropdown.Item>
                    <Dropdown.Item eventKey='19'>19</Dropdown.Item>
                    <Dropdown.Item eventKey='20'>20</Dropdown.Item>
                    <Dropdown.Item eventKey='21'>21</Dropdown.Item>
                    <Dropdown.Item eventKey='22'>22</Dropdown.Item>
                    <Dropdown.Item eventKey='23'>23</Dropdown.Item>
                    <Dropdown.Item eventKey='24'>24</Dropdown.Item>
                    <Dropdown.Item eventKey='25'>25</Dropdown.Item>
                    <Dropdown.Item eventKey='26'>26</Dropdown.Item>
                    <Dropdown.Item eventKey='27'>27</Dropdown.Item>
                    <Dropdown.Item eventKey='28'>28</Dropdown.Item>
                    <Dropdown.Item eventKey='29'>29</Dropdown.Item>
                    <Dropdown.Item eventKey='30'>30</Dropdown.Item>
                    <Dropdown.Item eventKey='31'>31</Dropdown.Item>
                    <Dropdown.Item eventKey='32'>32</Dropdown.Item>
                    <Dropdown.Item eventKey='33'>33</Dropdown.Item>
                    <Dropdown.Item eventKey='34'>34</Dropdown.Item>
                    <Dropdown.Item eventKey='35'>35</Dropdown.Item>
                    <Dropdown.Item eventKey='36'>36</Dropdown.Item>
                    <Dropdown.Item eventKey='37'>37</Dropdown.Item>
                    <Dropdown.Item eventKey='38'>38</Dropdown.Item>
                    <Dropdown.Item eventKey='39'>39</Dropdown.Item>
                    <Dropdown.Item eventKey='40'>40</Dropdown.Item>
                    <Dropdown.Item eventKey='41'>41</Dropdown.Item>
                    <Dropdown.Item eventKey='42'>42</Dropdown.Item>
                    <Dropdown.Item eventKey='43'>43</Dropdown.Item>
                    <Dropdown.Item eventKey='44'>44</Dropdown.Item>
                    <Dropdown.Item eventKey='45'>45</Dropdown.Item>
                    <Dropdown.Item eventKey='46'>46</Dropdown.Item>
                    <Dropdown.Item eventKey='47'>47</Dropdown.Item>
                    <Dropdown.Item eventKey='48'>48</Dropdown.Item>
                    <Dropdown.Item eventKey='49'>49</Dropdown.Item>
                    <Dropdown.Item eventKey='50'>50</Dropdown.Item>
                    <Dropdown.Item eventKey='51'>51</Dropdown.Item>
                    <Dropdown.Item eventKey='52'>52</Dropdown.Item>
                    <Dropdown.Item eventKey='53'>53</Dropdown.Item>
                    <Dropdown.Item eventKey='54'>54</Dropdown.Item>
                    <Dropdown.Item eventKey='55'>55</Dropdown.Item>
                    <Dropdown.Item eventKey='56'>56</Dropdown.Item>
                    <Dropdown.Item eventKey='57'>57</Dropdown.Item>
                    <Dropdown.Item eventKey='58'>58</Dropdown.Item>
                    <Dropdown.Item eventKey='59'>59</Dropdown.Item>
                    <Dropdown.Item eventKey='60'>60</Dropdown.Item>
                    <Dropdown.Item eventKey='61'>61</Dropdown.Item>
                    <Dropdown.Item eventKey='62'>62</Dropdown.Item>
                    <Dropdown.Item eventKey='63'>63</Dropdown.Item>
                    <Dropdown.Item eventKey='64'>64</Dropdown.Item>
                    <Dropdown.Item eventKey='65'>65</Dropdown.Item>
                    <Dropdown.Item eventKey='66'>"66+"</Dropdown.Item>
                    </DropdownButton>
                    
                <h4>Gender:</h4>
                <ToggleButtonGroup type="radio" name="gender" defaultValue={'null'} onChange={handleGenderChange}>
                    <ToggleButton variant="info" value={'Male'}>Male</ToggleButton>
                    <ToggleButton variant="info" value={'Female'}>Female</ToggleButton>
                    <ToggleButton variant="info" value={ 'Non-Binary'}>Non-binary</ToggleButton>
                    <ToggleButton variant="info" value={ 'Transgender'}>Transgender</ToggleButton>
                    <ToggleButton variant="info" value={ 'Intersex' }>Intersex</ToggleButton>
                    <ToggleButton variant="info" value={ 'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>Political Affiliation:</h4>
                <ToggleButtonGroup type="radio" name="politics" defaultValue={'null'} onChange={handlePoliticsChange}>
                    <ToggleButton variant="info" value={'Conservative'}>Conservative</ToggleButton>
                    <ToggleButton variant="info" value={'Moderate'}>Moderate</ToggleButton>
                    <ToggleButton variant="info" value={'Liberal'}>Liberal</ToggleButton>
                    <ToggleButton variant="info" value={'No Affliation'}>No affliation</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>Do you have children:</h4>
                <ToggleButtonGroup type="radio" name="children" defaultValue={'null'} onChange={handleChildrenChange}>
                    <ToggleButton variant="info" value={'Has Children'}>Yes</ToggleButton>
                    <ToggleButton variant="info" value={'No Children'}>No</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>Do you drink:</h4>
                <ToggleButtonGroup type="radio" name="drink" defaultValue={'null'} onChange={handleDrinkChange}>
                    <ToggleButton variant="info" value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton variant="info" value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton variant="info" value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton variant="info" value={'Never'}>Never</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>Do you smoke:</h4>
                <ToggleButtonGroup type="radio" name="smoke" defaultValue={'null'} onChange={handleSmokeChange}>
                    <ToggleButton variant="info" value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton variant="info" value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton variant="info" value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton variant="info" value={'Never'}>Never</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>Do you use cannabis:</h4>
                <ToggleButtonGroup type="radio" name="cannabis" defaultValue={'null'} onChange={handleCannabisChange}>
                    <ToggleButton variant="info" value={'Regularly'}>Regularly</ToggleButton>
                    <ToggleButton variant="info" value={'Socially'}>Socially</ToggleButton>
                    <ToggleButton variant="info" value={'Occasionally'}>Occasionally</ToggleButton>
                    <ToggleButton variant="info" value={'Never'}>Never</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                </ToggleButtonGroup>
                <h4>What's your sign?:</h4>
                 <ToggleButtonGroup type="radio" name="sign" defaultValue={'null'} onChange={handleSignChange}>
                    <ToggleButton variant="info" value={'Aquarius'}>Aquarius</ToggleButton>
                    <ToggleButton variant="info" value={'Pisces'}>Pisces</ToggleButton>
                    <ToggleButton variant="info" value={'Aries'}>Aries</ToggleButton>
                    <ToggleButton variant="info" value={'Taurus'}>Taurus</ToggleButton>
                    <ToggleButton variant="info" value={'Gemini'}>Gemini</ToggleButton>
                    <ToggleButton variant="info" value={'Cancer'}>Cancer</ToggleButton>
                    <ToggleButton variant="info" value={'Leo'}>Leo</ToggleButton>
                    <ToggleButton variant="info" value={'Virgo'}>Virgo</ToggleButton>
                    <ToggleButton variant="info" value={'Libra'}>Libra</ToggleButton>
                    <ToggleButton variant="info" value={'Scorpio'}>Scorpio</ToggleButton>
                    <ToggleButton variant="info" value={'Sagittarius'}>Sagittarius</ToggleButton>
                    <ToggleButton variant="info" value={'Capricorn'}>Capricorn</ToggleButton>
                    <ToggleButton variant="info" value={'null'}>I prefer not to say</ToggleButton>
                 </ToggleButtonGroup>
                <h4>What activities are you looking to build a friendship on:</h4>
                <br/>
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

export default Createprofile2;