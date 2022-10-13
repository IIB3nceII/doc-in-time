import React, { FC, memo } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineBell, HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
import { SearchArea, Tooltip } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { Link } from "react-router-dom";

interface INavbarProps extends StateProps, DispatchProps {}

const NavbarComponent: FC<INavbarProps> = ({ ui: { isSearchAreaOpen }, setIsSearchAreaOpen }) => {
  return (
    <>
      <header className={s.root}>
        <div className="md:hidden">
          <Tooltip text="Notifications">
            <div className="icon-container">
              <HiOutlineBell />
            </div>
          </Tooltip>
        </div>
        <div className={s.navigationContainer}>
          <Link to="/">
            <span className="font-extrabold">LOGO</span>
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
            <span>Search...</span>
            <HiOutlineSearch />
          </div>

          <Tooltip text="Profile">
            <div className="icon-container">
              <HiOutlineUserCircle />
            </div>
          </Tooltip>

          <Tooltip text="Notifications">
            <div className="icon-container">
              <HiOutlineBell />
            </div>
          </Tooltip>
        </div>

        <div className="md:hidden">
          <Tooltip text="Search">
            <div className="icon-container">
              <HiOutlineSearch onClick={() => setIsSearchAreaOpen(true)} />
            </div>
          </Tooltip>
        </div>
      </header>

      {isSearchAreaOpen && <SearchArea />}
    </>
  );
};

const mapStateToProps = ({ ui }: IRootState) => ({
  ui,
});

const mapDispatchToProps = { setIsSearchAreaOpen };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const Navbar = memo(NavbarComponent);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
