import React, { FC, memo } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineBell, HiOutlineSearch, HiOutlineUserCircle } from "react-icons/hi";
import { SearchArea } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { useNavigate } from "react-router-dom";

interface INavbarProps extends StateProps, DispatchProps {}

const NavbarComponent: FC<INavbarProps> = ({ ui: { isSearchAreaOpen }, setIsSearchAreaOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={s.root}>
        <div className="icon-container md:hidden">
          <HiOutlineBell />
        </div>
        <div className={s.navigationContainer}>
          <span className="font-extrabold">LOGO</span>
          <nav>
            <ul>
              <li onClick={() => navigate("/")}>item</li>
              <li onClick={() => navigate("/")}>item</li>
              <li onClick={() => navigate("/")}>item</li>
              <li onClick={() => navigate("/")}>item</li>
              <li onClick={() => navigate("/")}>item</li>
            </ul>
          </nav>
        </div>

        <div className={s.sideNav}>
          <div className={s.search} onClick={() => setIsSearchAreaOpen(true)}>
            <span>Search...</span>
            <HiOutlineSearch />
          </div>

          <div className="icon-container">
            <HiOutlineUserCircle />
          </div>
          <div className="icon-container">
            <HiOutlineBell />
          </div>
        </div>

        <div className="icon-container md:hidden">
          <HiOutlineSearch onClick={() => setIsSearchAreaOpen(true)} />
        </div>
      </div>

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
