import React, { FC, memo, useState } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineSearch, HiOutlineUserCircle, HiOutlineLogin } from "react-icons/hi";
import { DarkModeSwitcher, SearchArea, Tooltip } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { logOutUser } from "../../../shared/store/actions/auth.action";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";

interface INavbarProps extends StateProps, DispatchProps {}

const NavbarComponent: FC<INavbarProps> = ({ ui: { isSearchAreaOpen }, auth: { account }, setIsSearchAreaOpen, logOutUser }) => {
  const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="dark:bg-slate-900 dark:border-b-[1px] dark:border-slate-700">
        <div className="md:hidden">
          <DarkModeSwitcher />
        </div>
        <div className={s.navigationContainer}>
          <Link to="/">
            <img src={Logo} alt="LOGO" />
          </Link>
          <nav>
            <ul>
              <Link to="calendar">
                <li>calendar</li>
              </Link>
              <Link to="#">
                <li>item</li>
              </Link>
              <Link to="#">
                <li>item</li>
              </Link>
              <Link to="#">
                <li>item</li>
              </Link>
              <Link to="#">
                <li>item</li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className={s.sideNav}>
          <div className={s.search} onClick={() => setIsSearchAreaOpen(true)}>
            <p>Search...</p>
            <HiOutlineSearch className={s.icon} />
          </div>

          <DarkModeSwitcher />

          {account ? (
            <div className={s.profile}>
              <Tooltip text="Profile">
                <div className="icon-container" onClick={() => setIsProfileOptionsOpen(!isProfileOptionsOpen)}>
                  <HiOutlineUserCircle />
                </div>
              </Tooltip>
              {isProfileOptionsOpen && (
                <ul>
                  <li>Edit Profile</li>
                  <li onClick={() => logOutUser()}>Log out</li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
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
