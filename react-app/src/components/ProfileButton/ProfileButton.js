import LogoutButton from "../auth/LogoutButton";
import { useEffect, useState } from "react";



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
                <button onClick={openMenu}><i class="fa-solid fa-user"></i></button>
            </div>
            {showMenu && (
                <div>
                    <LogoutButton />
                </div>)}
        </div>
    )
};

export default ProfileButton;
