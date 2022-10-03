import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SplashPage.css'
import backgroundImg from '../../images/mtgBackground.jpeg'


const SplashPage = () => {

    const sessionUser = useSelector(state => state.session.user)
    let sessionLinks;
    if (!sessionUser) {
        sessionLinks = (
            <div>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </div>
        )
    }


    return (
        <div className="splash-container">
            <div>
                <img src={backgroundImg}></img>
            </div>
            <div className="session-links">
                {sessionLinks}
            </div>
        </div>
    )
}

export default SplashPage;
