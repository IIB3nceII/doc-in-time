import React, { FC } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { SearchArea } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";

interface INavbarProps extends StateProps, DispatchProps {}

const Navbar: FC<INavbarProps> = ({ ui: { isSearchAreaOpen }, setIsSearchAreaOpen }) => {
  return (
    <>
      <div className={s.root}>
        <div className="icon-container">
          <HiOutlineSearch onClick={() => setIsSearchAreaOpen(true)} />
        </div>
        <span>LOGO</span>
        <div className="icon-container">
          <HiOutlineBell />
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
