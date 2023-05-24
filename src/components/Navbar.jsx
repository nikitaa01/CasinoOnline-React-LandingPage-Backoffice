import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useLangContext } from "../contexts/LangContext";
import { useEffect, useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

export default function Navbar() {
    const { user, error, logout } = useAuthContext();
    const { langValues, lang, setLang } = useLangContext();
    const [profileOpen, setProfileOpen] = useState(false)
    const [burgerOpen, setBurgerOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setBurgerOpen(false)
        setProfileOpen(false)
    }, [location])

    return (
        <>
            <nav className={`w-auto fixed inset-0 backdrop-blur-[2px] h-[90px] flex items-center ${burgerOpen && 'nav-lite:h-screen  nav-lite:bg-white'} nav-lite:z-50`}>
                {!burgerOpen && <button
                    className="nav:hidden ml-auto"
                    onClick={() => setBurgerOpen(true)}
                >
                    <MenuOutlined
                        className="text-[2rem] mr-10"
                    />
                </button>}
                <ul className={`w-full flex flex-row items-center gap-20 [&_a]:flex [&_a]:items-center px-10 ${burgerOpen || 'nav-lite:hidden'} nav-lite:flex-col nav-lite:bg-white nav-lite:gap-2 nav-lite:h-full nav-lite:py-5`}>
                    {burgerOpen && <button
                        className="mr-auto nav:hidden"
                        onClick={() => setBurgerOpen(false)}
                    >
                        <CloseOutlined />
                    </button>}
                    <li>
                        <Link
                            className="rounded p-4 hover:text-main"
                            to="/"
                        >
                            {langValues.nav.home}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="rounded p-4 hover:text-main"
                            to="/buy"
                        >
                            {langValues.nav.buy}
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="rounded p-4 hover:text-main"
                            to="/download"
                        >
                            {langValues.nav.download}
                        </Link>
                    </li>
                    {user && user.role === 'ADMIN' && <li>
                        <Link
                            className="rounded p-4 hover:text-main"
                            to="/backoffice"
                        >
                            {langValues.nav.backoffice}
                        </Link>
                    </li>}
                    <div className="nav:ml-auto flex nav:gap-5 nav-lite:flex-col"
                    >
                        <li className="flex items-center justify-center">
                            <select defaultValue={lang} className="outline-none" onChange={e => setLang(e.target.value)}>
                                <option value='es'>es</option>
                                <option value='en'>en</option>
                            </select>
                        </li>
                        {user && <li className="relative min-w-[200px]"
                            onBlur={() => setProfileOpen(false)}
                        >
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="rounded p-4 hover:text-main w-full"
                            >
                                <div className="flex gap-2 items-center justify-between rounded-full border border-gray-200 relative w-full">
                                    <div className="py-2 pl-4 flex items-start flex-col">
                                        <div>
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {user.role === 'ADMIN' && 'admin | '}{user.coin_balance} {langValues.nav.coins}
                                        </div>
                                    </div>
                                    <img className="h-12 mr-1 my-1 aspect-square rounded-full" src={user.avatar_url} alt="user_avatar_photo" />
                                </div>
                            </button>
                            {profileOpen && <div
                                className="absolute top-20 w-full px-9"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <div className="border rounded bg-white">
                                    <ul>
                                        <li>
                                            <Link
                                                className="rounded px-4 py-2 hover:text-main"
                                                to={`/profile/${user.id}`}
                                            >
                                                {langValues.nav.profile}
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="rounded px-4 py-2 hover:text-main"
                                                onClick={logout}
                                            >
                                                {langValues.nav.logout}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                        </li>}
                        {error && <li>
                            <Link
                                className="rounded p-4 hover:text-main"
                                to="/login"
                            >
                                {langValues.nav.login}
                            </Link>
                        </li>
                        }
                    </div>
                </ul>
            </nav>
            <div className="h-[90px]"></div>
        </>
    )
}