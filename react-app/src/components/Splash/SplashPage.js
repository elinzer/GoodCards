import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Decks from '../Decks/Decks';
import './SplashPage.css';
import splashHeader from '../../images/splashWText.png';


const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className="splash-container">
            <img style={{opacity: '75%'}} className="header-image" src={splashHeader} alt=''></img>
            <div className="decks-container">
                <Decks />
            </div>
        </div>
    )
}

export default SplashPage;
