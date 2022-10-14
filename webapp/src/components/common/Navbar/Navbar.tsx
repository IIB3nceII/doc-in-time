import React, { FC, memo } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineSearch, HiOutlineUserCircle, HiOutlineLogin } from "react-icons/hi";
import { DarkModeSwitcher, SearchArea, Tooltip } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";

interface INavbarProps extends StateProps, DispatchProps {}

const NavbarComponent: FC<INavbarProps> = ({ ui: { isSearchAreaOpen }, auth: { account }, setIsSearchAreaOpen }) => {
  return (
    <>
      <header className={s.root}>
        <div className="md:hidden">
          <DarkModeSwitcher />
        </div>
        <div className={s.navigationContainer}>
          <Link to="/">
            <img src={Logo} alt="LOGO" />
          </Link>
          <nav>
            <ul>
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
              <Link to="#">
                <li>item</li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className={s.sideNav}>
          <div className={s.search} onClick={() => setIsSearchAreaOpen(true)}>
            <p>Search...</p>
            <HiOutlineSearch />
          </div>

          <DarkModeSwitcher />

          {account ? (
            <Tooltip text="Profile">
              <div className="icon-container">
                <HiOutlineUserCircle />
              </div>
            </Tooltip>
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

const mapDispatchToProps = { setIsSearchAreaOpen };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const Navbar = memo(NavbarComponent);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
