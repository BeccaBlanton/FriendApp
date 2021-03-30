var seeder = require('mongoose-seed')


const db = "mongodb://localhost/bffl_db"

seeder.connect(db, () =>{
    seeder.loadModels(["./models/interests", "./models/profile", "./models/favorites", "./models/user"])
    seeder.clearModels(['Interests', 'Profile', 'Favorites', 'User'], () => {
        seeder.populateModels(populateIntersts, (err, success) => {
        if (err) {
            return console.log("seed err", err)
        }
        console.log("Database seeded successfully", success)
        seeder.disconnect()
        })
    })
    

});

const populateIntersts = [{
        "model": "Interests",
        "documents": [
            {
                "interest": "Books"
            },
            {
                "interest": "Watch Parties/TV Shows"
            },
            {
                "interest": "Video Games"
            },
            {
                "interest": "Board Games"
            },
            {
                "interest": "Music"
            },
            {
                "interest": "Working Out"
            },
            {
                "interest": "Yoga"
            },
            {
                "interest": "Hiking"
            },
            {
                "interest": "Biking/Cycling"
            },
            {
                "interest": "Sports"
            },
            {
                "interest": "Gardening"
            },
            {
                "interest": "Crafting/DIY Building"
            },
            {
                "interest": "Sewing"
            },
            {
                "interest": "Shopping"
            },
            {
                "interest": "Volunteering"
            },
            {
                "interest": "Cars"
            },
            {
                "interest": "Going Out/Nightclubs"
            },
            {
                "interest": "Road Trips"
            },
            {
                "interest": "Wine Tasting"
            },
            {
                "interest": "Gambling"
            }
        ]
},
{
    "model": "Profile",
    "documents": [
        {
          
        "username":"Steve",
        "avatar": "https://avatars.dicebear.com/api/avataaars/Ronald%20Frank.svg",
        "gender": "Non-binary", 
       "politics": "No Affiliation", 
        "children": "Has Children", 
        "drink": "Never", 
        "smoke": "Never", 
        "cannabis": "Never", 
        "age": "35",
        "sign":"Aries",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.798083153822645, 
            "longitude": -121.23600156822104
        },
        "filterBy": [{
            "distance": 2,
            "gender": ["Female"],
            "politics": ["Moderate", "Liberal"],
            "ageRange": [24, 40],
            "children": ["No Preference"],
            "drink": ["Socially"],
            "smoke": ["Never"],
            "cannabis": ["No Preference"]
        }] 
    },
    {
         
        "username":"Max",
        "avatar": "https://avatars.dicebear.com/api/avataaars/Stanley%20Newman.svg",
        "gender": "Male", 
       "politics": "Conservative", 
        "children": "No Children", 
        "drink": "Socially", 
        "smoke": "Never", 
        "cannabis": "Socially", 
        "age": "21",
        "sign":"Leo",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.795950910355046, 
            "longitude": -121.23799713178968
        }
    },
    {
         
        "username":"Noa",
        "avatar": "https://avatars.dicebear.com/api/avataaars/Grace%20Singeton.svg?top[]=longHair&hairColor[]=pastel&eyes[]=happy&eyebrow[]=default&mouth[]=twinkle&&clothesColor[]=heather",
        "gender": "Female", 
       "politics": "Liberal", 
        "children": "Has Children", 
        "drink": "Regularly", 
        "smoke": "Regularly", 
        "cannabis": "Regularly", 
        "age": "30",
        "sign":"Aries",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.792438840875505, 
            "longitude": -121.24143035943466
        }
    },
    {   
         
        "username":"Bananas",
        "avatar": "https://avatars.dicebear.com/api/avataaars/example.svg?&&&&&&",
        "gender": "Female", 
        "politics": "Moderate", 
        "children": "Has Children", 
        "drink": "Socially", 
        "smoke": "Never", 
        "cannabis": "Socially", 
        "age": "34",
        "sign":"Gemini",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.79406110399837, 
            "longitude": -121.23427422556216
        },
        "filterBy": [{
            "distance": 2,
            "gender": ["Female"],
            "politics": ["Moderate", "Liberal"],
            "ageRange": [24, 40],
            "children": ["No Preference"],
            "drink": ["Socially"],
            "smoke": ["Never"],
            "cannabis": ["No Preference"]
        }]
    },
    {
         
        "username":"Muffins",
        "avatar": "https://avatars.dicebear.com/api/avataaars/example.svg?&&&&&&",
        "gender": "Transgender", 
        "politics": "Moderate", 
        "children": "No Children", 
        "drink": "Regularly", 
        "smoke": "Regularly", 
        "cannabis": "Never", 
        "age": "52",
        "sign":"Aries",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.79642753501916, 
            "longitude": -121.24076517157846
        }
    },
    {
        
        "username":"Popcorn",
        "avatar": "https://avatars.dicebear.com/api/avataaars/example.svg?&&&&&&",
        "gender": "Intersex", 
        "politics": "Moderate", 
        "children": "No Children", 
        "drink": "Regularly", 
        "smoke": "Regularly", 
        "cannabis": "Never", 
        "age": "52",
        "sign":"Aries",
        "interests": [  {"interest": "Yoga",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Wine",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.795875653537784, 
            "longitude": -121.23794348760772
        }
    },
    {
        
        "username":"Gizmo",
        "avatar": "https://avatars.dicebear.com/api/avataaars/example.svg?&&&&&&",
        "gender": "Male", 
        "politics": "Liberal", 
        "children": "Has Children", 
        "drink": "Regularly", 
        "smoke": "Never", 
        "cannabis": "Never", 
        "age": "27",
        "sign":"Aries",
        "interests": [  {"interest": "Hiking",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Books",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.79363463634235, 
            "longitude": -121.24051840834147
        }
    },
    {
        
        "username":"Stitch",
        "avatar": "https://avatars.dicebear.com/api/avataaars/example.svg?&&&&&&",
        "gender": "Intersex", 
        "politics": "No Affiliation", 
        "children": "Has Children", 
        "drink": "Never", 
        "smoke": "Regularly", 
        "cannabis": "Occasionally", 
        "age": "44",
        "sign":"Libra",
        "interests": [  {"interest": "Hiking",
                        "_id": "605384df83a432644d843ef9"}, 
                        {"interest":"Books",
                        "_id": "605384df83a432644d843ef9"}
                     ],
        "location": {
            "latitude": 38.79968743455052,
            "longitude": -121.23847586432746
        }
    },
    ]
},{
    "model": "Favorites",
    "documents": [
        {
            "username": "Popcorn",
            "faveUser": "Muffins"
        },
        {
            "username": "Bananas",
            "faveUser": "Popcorn"
        },
        {
            "username": "Popcorn",
            "faveUser": "Bananas"
        },
        {
            "username": "Popcorn",
            "faveUser": "Max"
        },
        {
            "username": "Max",
            "faveUser": "Bananas"
        },
        {
            "username": "Steve",
            "faveUser": "Bananas"
        },
        {
            "username": "Gizmo",
            "faveUser": "Bananas"
        },
        {
            "username": "Noa",
            "faveUser": "Bananas"
        },
        {
            "username": "Muffins",
            "faveUser": "Bananas"
        },
        {
            "username": "Stitch",
            "faveUser": "Bananas"
        },
    ]
},{
    "model": "User",
    "documents": [
        {
            "username": "Popcorn",
            "email": "popcorn@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Pop",
            "lastName": "Corn"
        },
        {
            "username": "Muffins",
            "email": "muffins@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Muffins",
            "lastName": "Cat"
        },
        {
            "username": "Noa",
            "email": "noa@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Noa",
            "lastName": "Arc"
        },
        {
            "username": "Max",
            "email": "max@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Max",
            "lastName": "Amillion"
        },
        {
            "username": "Steve",
            "email": "steve@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Steve",
            "lastName": "Neighbor"
        },
        {
            "username": "Bananas",
            "email": "bananas@email.com",
            "password": "$2a$10$1UPC4C1IAdNuEwh.y0Vn7.1rYL6CvmSY/.12WAMjIjO0QC4xRmX5C",
            "firstName": "Bananas",
            "lastName": "Split"
        }
    ]
}]
