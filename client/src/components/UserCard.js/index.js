import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
import './style.css'


function UserCard (props){

    return (
    <>
        <Card.Body>
            <div className="row">
                <div className="col">
                    <h2>{props.name}</h2>
                    <Image className="userImage" variant="top" src={props.avatar} style={{    minWidth: "fit-content"}} roundedCircle/>
                </div>
                <div className="col">
                    <h3>
                        <Badge className="badge" variant="info">{props.age}</Badge>
                        <Badge className="badge" variant="info">{props.gender}</Badge> 
                    </h3>
                    <h5>
                        <Badge className="smbadge" variant="info"><i className="fas fa-landmark" /> {props.politics}</Badge>
                        <Badge className="smbadge" variant="info"><i className="fas fa-child" /> {props.children}</Badge>
                        <Badge className="smbadge" variant="info"><i className="fas fa-glass-martini" /> {props.drink}</Badge>
                        <Badge className="smbadge" variant="info"><i className="fas fa-smoking"/> {props.smoke}</Badge>
                        <Badge className="smbadge" variant="info"><i className="fas fa-cannabis" /> {props.cannabis}</Badge>
                        <Badge className="smbadge" variant="info"><i className="fas fa-star" /> {props.sign}</Badge><br/>
                    </h5>
                    <h3>Interests:</h3>
                        <h3 style={{margin:"auto"}}>
                        {props.interests.map(item => (
                        <Badge pill variant="info">{item.interest}</Badge>
                    ))}
                    </h3>
                </div>
            </div>
        </Card.Body>
    </>
    )
}

export default UserCard