import LogoutButton from "../auth/LogoutButton";
import { useEffect, useState } from "react";
import './ProfileButton.css'



const ProfileButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div>
            <div>
                <button
                className="profile-button"
                onClick={openMenu}>
                    <i className="prof-icon fa-regular fa-user"></i></button>
            </div>
            {showMenu && (
                <div>
                    <div>
                        Hello, {user.username}!
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>)}
        </div>
    )
};

export default ProfileButton;
