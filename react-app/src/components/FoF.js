import fourOhfour from '../images/404.png';
import './FoF.css';
import { NavLink } from 'react-router-dom';


const FourOhFour = () => {
    return (
        <div className='fof-cont'>
            <NavLink to='/'><img className='fof-img' src={fourOhfour}></img></NavLink>
            <div className='fof-text' >Whoops! Missed a turn. Please click the card to mulligan (start over).</div>
        </div>
    )
}

export default FourOhFour;
