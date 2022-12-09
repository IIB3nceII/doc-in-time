import React, { FC, Fragment, memo, useEffect, useState } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineSearch, HiOutlineUserCircle, HiOutlineLogin } from "react-icons/hi";
import { DarkModeSwitcher, SearchArea, Tooltip } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { logOutUser } from "../../../shared/store/actions/auth.action";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { Menu, Transition } from "@headlessui/react";
import { INavBarItem } from "src/models";
import { useTranslation } from "react-i18next";
import { auth } from "src/utils/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById } from "src/utils/firebase/firestore";

interface INavbarProps extends StateProps, DispatchProps {
  items: INavBarItem[];
  setCurrentTab: (pathName: string) => void;
}

const NavbarComponent: FC<INavbarProps> = ({
  ui: { isSearchAreaOpen },
  auth: { account },
  setIsSearchAreaOpen,
  logOutUser,
  items,
  setCurrentTab,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<boolean>(false);
  const [userIsDoc, setUserIsDoc] = useState<boolean>(false);

  useEffect(() => {
    setCurrentTab(location.pathname.split("/")[1]);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(true)
        const userDoc = await getUserById(user.uid)
        if (userDoc) {
          setUserIsDoc(userDoc.isDoc)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLang = (lang: string): void => {
    i18n.changeLanguage(lang);
    localStorage.lang = lang;
  };

  return (
    <>
      <header id="navbar" className="dark:bg-slate-900 dark:border-b-[1px] dark:border-slate-700">
        <div className="md:hidden">
          <DarkModeSwitcher />
        </div>
        <div className={s.navigationContainer}>
          <Link to="/" onClick={() => setCurrentTab("/")}>
            <img src={Logo} alt="LOGO" id="navbar_logo" />
          </Link>
          <nav>
            <ul>
              {items?.map(({ isActive, icon, path, title_key, isAuth, isDoc }, i) => {
                if (isAuth && !user) { return null }
                if (isDoc && !userIsDoc) { return null }
                if (icon === null && user) { return null }
                return (
                  <li
                    key={i}
                    className={`${isActive ? "text-blue" : "text-primary"} ${!isActive && "dark:text-white"}`}
                    onClick={() => setCurrentTab(path)}
                    id={"navbar_" + t(title_key).toLowerCase()}
                  >
                    <Link to={path}>{t(title_key)}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className={s.sideNav}>
          <div id="navbar_search" className={s.search} onClick={() => setIsSearchAreaOpen(true)}>
            <p>{t('navbar.search')}</p>
            <HiOutlineSearch className={s.icon} />
          </div>

          <DarkModeSwitcher />

          <div className="flex items-center space-x-2">
            {account ? (
              <Menu as="div" className={s.profileMenu}>
                <div>
                  <Menu.Button className={s.menuButton} name="profile">
                    <HiOutlineUserCircle className="h-8 w-8 dark:text-white" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className={s.menuItems}>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/edit-profile"}
                            className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {t('navbar.edit_profile')}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => logOutUser()}
                          >
                            {t('navbar.logout')}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link id="navbar_login" to="/login">
                <p className={s.login}>{t('navbar.login')}</p>
              </Link>
            )}
            <ul className="flex space-x-2 divide-x text-primary dark:text-white">
              <li className="cursor-pointer" onClick={() => changeLang("en")}>
                EN
              </li>
              <li className="pl-2 cursor-pointer" onClick={() => changeLang("hu")}>
                HU
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          {account ? (
            <Tooltip text="Search">
              <div className="icon-container">
                <HiOutlineSearch onClick={() => setIsSearchAreaOpen(true)} />
              </div>
            </Tooltip>
          ) : (
            <Tooltip text="Log in">
              <Link to="/login">
                <div className="icon-container">
                  <HiOutlineLogin />
                </div>
              </Link>
            </Tooltip>
          )}

          <ul className="flex space-x-2 divide-x text-primary dark:text-white">
            <li className="cursor-pointer" onClick={() => changeLang("en")}>
              EN
            </li>
            <li className="pl-2 cursor-pointer" onClick={() => changeLang("hu")}>
              HU
            </li>
          </ul>
        </div>
      </header>

      {isSearchAreaOpen && <SearchArea />}
    </>
  );
};

const mapStateToProps = ({ ui, auth }: IRootState) => ({
  ui,
  auth,
});

const mapDispatchToProps = { setIsSearchAreaOpen, logOutUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const Navbar = memo(NavbarComponent);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
