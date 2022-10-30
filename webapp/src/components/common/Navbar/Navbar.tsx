import React, { FC, Fragment, memo, useEffect } from "react";
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

  useEffect(() => {
    setCurrentTab(location.pathname.split("/")[1]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {items?.map(({ isActive, path, title }, i) => (
                <li id={`navbar_item_${i}`} key={i} className={`${isActive ? "text-blue" : "text-primary"}`} onClick={() => setCurrentTab(path)}>
                  <Link to={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={s.sideNav}>
          <div id="navbar_search" className={s.search} onClick={() => setIsSearchAreaOpen(true)}>
            <p>Search...</p>
            <HiOutlineSearch className={s.icon} />
          </div>

          <DarkModeSwitcher />

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
                        <button className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                          Edit profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => logOutUser()}
                        >
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link id="navbar_login" to="/login">
              <p className={s.login}>Log in</p>
            </Link>
          )}
        </div>

        <div className="md:hidden">
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
