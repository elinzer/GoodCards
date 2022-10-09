# GoodCards
A Magic The Gathering™️ deck collection site loosely inspired by GoodReads. <a href='http://goodcards.herokuapp.com/'>Link to live site!</a>

## This project was developed with:
#### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
#### Database:
SQLAlchemy
#### Frontend:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
#### Hosted with:
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Wiki Shortcuts
* <a href='https://github.com/elinzer/GoodCards/wiki/DB-Schema'>Database Schema</a>
* <a href='https://github.com/elinzer/GoodCards/wiki/MVP-Feature-List'>MVP Features</a>
* <a href='https://github.com/elinzer/GoodCards/wiki/API-Routes'>API Routes</a>
* <a href='https://github.com/elinzer/GoodCards/wiki/Redux-State-Shape'>Redux State Shape</a>

## How to run GoodCards locally:
1. Clone the repository in your terminal (see 'Code' button above)
2. In root of the repo run ```pipenv install```
3. Enter the shell with ```pipenv shell``` then ```flask db upgrade``` and ```flask seed all``` to seed the database. Then start the backend server with ```flask run```
4. In a second terminal, cd into react-app and ```npm install``` then ```npm start``` to start frontend server
5. The project should be up and running locally!
