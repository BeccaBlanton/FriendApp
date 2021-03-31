import React, { useEffect, useState } from 'react';
import API from "../utils/API";
import AuthService from "../services/authService";
import '../App.css'
import './css/Createprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';




function Createprofile (props){
const currentUser = AuthService.getCurrentUser();
const [base, setBase] = useState();
const [top, setTop] = useState();
const [hairColor, setHairColor] = useState();
const [eyes, setEyes] = useState();
const [eyebrow, setEyebrow] = useState();
const [mouth, setMouth] = useState();
const [skin, setSkin] = useState();
const [clothesChoice, setClothesChoice] = useState();
const [url, setUrl] = useState();

    useEffect(() => {
        
        if(currentUser === null){
        props.history.push("/login");
        window.location.reload()
        }
    }, [])

    useEffect(()=>{
        setUrl(`https://avatars.dicebear.com/api/avataaars/${ base ? `${base}` : 'example'}.svg?${top ? `top[]=${top}` : ''}&${ hairColor ? `hairColor[]=${hairColor}` : ''}&${ eyes ? `eyes[]=${eyes}` : ''}&${ eyebrow ? `eyebrow[]=${eyebrow}` : ''}&${ mouth ? `mouth[]=${mouth}` : ''}&${ skin ? `skin[]=${skin}` : ''}&${ clothesChoice ? `clothesColor[]=${clothesChoice}` : ''}`)
        }, 
        [base, top, hairColor, eyes, eyebrow, mouth, skin, clothesChoice]
    )

    const saveUrl = (e) => {
        e.preventDefault() ;
        console.log(url);

        API.saveProfile({
            avatar: url,
            userId: currentUser._id,
            username: currentUser.username,
        })
        .then(res => {
            console.log(res.data)
            props.history.push("/createprofile2");
            window.location.reload()
            })
        .catch(err => console.log(err));
    }

    return(
<main>
<h1 className="Header">First, let's create your avatar</h1>
<div className="container">
    <div className="avatarCard card">
    <div>
        <br></br>
        <h3>Your avatar:</h3>
        <img src={url} height='250' alt="avatar"></img>
    </div>
    <h3>Choices:</h3>
    <ButtonGroup>
        <Button variant="info" onClick={() => setBase('example')}>
            <img src="https://avatars.dicebear.com/api/avataaars/example.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Sean%20Moore')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Sean%20Moore.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Lionel%20Quinn')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Lionel%20Quinn.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Lydia%20Ellis')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Lydia%20Ellis.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Bryan%20Phelps')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Bryan%20Phelps.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Ronald%20Frank')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Ronald%20Frank.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Annette%20Klein')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Annette%20Klein.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Stanley%20Newman')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Stanley%20Newman.svg" alt="avatar" width="60"></img>
        </Button>
        <Button variant="info" onClick={() => setBase('Grace%20Singeton')}>
            <img src="https://avatars.dicebear.com/api/avataaars/Grace%20Singleton.svg" alt="avatar" width="60"></img>
        </Button>
    </ButtonGroup>
    <h5>Hat/Hair choices:</h5>
    <ButtonGroup>
        <Button variant="info" onClick={() => setTop('longHair')}>long hair</Button>
        <Button variant="info" onClick={() => setTop('shortHair')}>short hair</Button>
        <Button variant="info" onClick={() => setTop('hat')}>hat</Button>
        <Button variant="info" onClick={() => setTop('hijab')}>hijab</Button>
        <Button variant="info" onClick={() => setTop('turban')}>turban</Button>
        <Button variant="info" onClick={() => setTop('eyepatch')}>eye patch</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button variant="info" onClick={() => setHairColor("auburn")}>auburn</Button>
        <Button variant="info" onClick={() => setHairColor("black")}>black</Button>
        <Button variant="info" onClick={() => setHairColor("blonde")}>blonde</Button>
        <Button variant="info" onClick={() => setHairColor("brown")}>brown</Button>
        <Button variant="info" onClick={() => setHairColor("pastel")}>pastel</Button>
        <Button variant="info" onClick={() => setHairColor("platinum")}>platinum</Button>
        <Button variant="info" onClick={() => setHairColor("gray")}>gray</Button>
    </ButtonGroup>
    <h5>Eyes:</h5>
    <ButtonGroup>
        <Button variant="info" onClick={() => setEyes('default')}>default</Button>
        <Button variant="info" onClick={() => setEyes('close')}>close</Button>
        <Button variant="info" onClick={() => setEyes('cry')}>cry</Button>
        <Button variant="info" onClick={() => setEyes('happy')}>happy</Button>
        <Button variant="info" onClick={() => setEyes('hearts')}>hearts</Button>
        <Button variant="info" onClick={() => setEyes('side')}>side</Button>
        <Button variant="info" onClick={() => setEyes('squint')}>squint</Button>
        <Button variant="info" onClick={() => setEyes('surprised')}>surprised</Button>
        <Button variant="info" onClick={() => setEyes('wink')}>wink</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button variant="info" onClick={() => setEyebrow('default')}>default</Button>
        <Button variant="info" onClick={() => setEyebrow('angry')}>angry</Button>
        <Button variant="info" onClick={() => setEyebrow('flat')}>flat</Button>
        <Button variant="info" onClick={() => setEyebrow('raised')}>raised</Button>
        <Button variant="info" onClick={() => setEyebrow('sad')}>sad</Button>
        <Button variant="info" onClick={() => setEyebrow('unibrow')}>unibrow</Button>
        <Button variant="info" onClick={() => setEyebrow('up')}>up</Button>
        <Button variant="info" onClick={() => setEyebrow('frown')}>frown</Button>
    </ButtonGroup>
    <h5>Mouth:</h5>
    <ButtonGroup>
        <Button variant="info" onClick={() => setMouth('default')}>default</Button>
        <Button variant="info" onClick={() => setMouth('concerned')}>concerned</Button>
        <Button variant="info" onClick={() => setMouth('eating')}>eating</Button>
        <Button variant="info" onClick={() => setMouth('grimace')}>grimace</Button>
        <Button variant="info" onClick={() => setMouth('sad')}>sad</Button>
        <Button variant="info" onClick={() => setMouth('serious')}>serious</Button>
        <Button variant="info" onClick={() => setMouth('smile')}>smile</Button>
        <Button variant="info" onClick={() => setMouth('tongue')}>tongue</Button>
        <Button variant="info" onClick={() => setMouth('twinkle')}>twinkle</Button>
    </ButtonGroup>
    <h5>Skin Tone:</h5>
    <ButtonGroup>
        <Button variant="info" onClick={() => setSkin("tanned")}>tanned</Button>
        <Button variant="info" onClick={() => setSkin("yellow")}>yellow</Button>        
        <Button variant="info" onClick={() => setSkin("pale")}>pale</Button>
        <Button variant="info" onClick={() => setSkin("light")}>light</Button>
        <Button variant="info" onClick={() => setSkin("brown")}>brown</Button>
        <Button variant="info" onClick={() => setSkin("darkBrown")}>dark brown</Button>
        <Button variant="info" onClick={() => setSkin("black")}>black</Button>
    </ButtonGroup>
    <h5>Clothes:</h5>
    <ButtonGroup>
        <Button variant="info" onClick={() => setClothesChoice("black")}>black</Button>
        <Button variant="info" onClick={() => setClothesChoice("blue")}>blue</Button>
        <Button variant="info" onClick={() => setClothesChoice("gray")}>gray</Button>
        <Button variant="info" onClick={() => setClothesChoice("heather")}>heather</Button>
        <Button variant="info" onClick={() => setClothesChoice("pastel")}>pastel</Button>
        <Button variant="info" onClick={() => setClothesChoice("pink")}>pink</Button>
        <Button variant="info" onClick={() => setClothesChoice("red")}>red</Button>
        <Button variant="info" onClick={() => setClothesChoice("white")}>white</Button>
    </ButtonGroup>
    <br></br>
    <Button variant="info" onClick={saveUrl}>
        Save
    </Button>
    </div>
    <br></br>
    <br></br>
    
</div>
</main>
    )
}

export default Createprofile;


