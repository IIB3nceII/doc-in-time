import React, { FC, Fragment, memo, useState } from "react";
import s from "./Navbar.module.scss";
import { HiOutlineSearch, HiOutlineUserCircle, HiOutlineLogin } from "react-icons/hi";
import { DarkModeSwitcher, SearchArea, Tooltip } from "../../ui";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { logOutUser } from "../../../shared/store/actions/auth.action";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { Menu, Transition } from "@headlessui/react";

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
              <Menu as="div" className={s.profileMenu}>
                <div>
                  <Menu.Button className={s.menuButton}>
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
                          <button
                            className={`${active ? "bg-slate-200" : "text-primary"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
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
