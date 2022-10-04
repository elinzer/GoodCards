import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Decks from '../Decks/Decks';
import './SplashPage.css';
import splashHeader from '../../images/mtgSplash.png';
import defaultCard from '../../images/defaultCard.png'


const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user)
    let sessionLinks;
    if (!sessionUser) {
        sessionLinks = (
            <div className="session-links">
                <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>
                </div>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </div>
        )
    }


    return (
        <div className="splash-container">
            <img className="header-image" src='https://assets.dicebreaker.com/magic-the-gathering-trading-card-game-cards-8.JPG/BROK/thumbnail/1600x900/format/jpg/quality/80/magic-the-gathering-trading-card-game-cards-8.JPG' alt=''></img>
            <div className="decks-container">
                <Decks />
            </div>
            <div className="link-container">
                <div>
                    {sessionLinks}
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
