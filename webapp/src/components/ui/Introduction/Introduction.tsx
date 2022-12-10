import React from "react";
import s from "./Introduction.module.scss";
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineChatAlt2 } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className={s.container}>
      <h2 className={s.mainTitle}>{t("introduction.title")}</h2>

      <div className={s.gridContainer}>
        <div className={s.card}>
          <HiOutlineClipboardCheck className={s.icon} />
          <h3>{t("introduction.card_1.title")}</h3>
          <p className={s.description} dangerouslySetInnerHTML={{ __html: t("introduction.card_1.description", { 'interpolation': { 'escapeValue': false } }) }}></p>
        </div>
        <div className={s.card}>
          <HiOutlineClock className={s.icon} />
          <h3>{t("introduction.card_2.title")}</h3>
          <p className={s.description} dangerouslySetInnerHTML={{ __html: t("introduction.card_2.description", { 'interpolation': { 'escapeValue': false } }) }}></p>
        </div>
        <div className={s.card}>
          <HiOutlineChatAlt2 className={s.icon} />
          <h3>{t("introduction.card_3.title")}</h3>
          <p className={s.description} dangerouslySetInnerHTML={{ __html: t("introduction.card_3.description", { 'interpolation': { 'escapeValue': false } }) }}></p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
