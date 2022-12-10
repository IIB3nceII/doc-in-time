//@ts-nocheck
import React, { FC, useState, useTransition } from "react";
import s from "./SearchArea.module.scss";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { setIsSearchAreaOpen } from "../../../shared/store/actions/ui.action";
import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { useTranslation } from "react-i18next";

interface ISearchAreaProps extends StateProps, DispatchProps { }

const SearchArea: FC<ISearchAreaProps> = ({ setIsSearchAreaOpen }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { t } = useTranslation();

  const handleSearchInputChange = (input: string) => {
    startTransition(() => {
      setSearchKeyword(input);
    });
  };

  const handleSearch = () => {
    console.log("search");
  };

  return (
    <div id="search_area" className={s.container} onClick={() => setIsSearchAreaOpen(false)}>
      <div className={s.searchContainer} onClick={(e) => e.stopPropagation()}>
        <div className={s.search}>
          <HiOutlineX className={s.icon} onClick={() => setSearchKeyword("")} />
          <input type="text" placeholder={`${t('navbar.search')}`} value={searchKeyword} onChange={(e) => handleSearchInputChange(e.target.value)} />
          <HiOutlineSearch className={s.icon} onClick={() => handleSearch()} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ui }: IRootState) => ({
  ui,
});

const mapDispatchToProps = { setIsSearchAreaOpen };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);
