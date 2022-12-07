import React, { FC, useEffect, useState } from "react";
import s from "./ProfileEditor.module.scss";
import { HiOutlinePencil, HiOutlineUser } from "react-icons/hi";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { getUserById } from "src/utils/firebase/firestore";
import { async } from "@firebase/util";
import { auth } from "src/utils/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { editFirstName, editEmail, editLastName, editPhoneNumber } from "src/utils/firebase/firestore/edit-user-name";
import { t } from "i18next";

interface IProfileEditorProps extends StateProps, DispatchProps {}

const ProfileEditor: FC<IProfileEditorProps> = ({ auth }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [tajNumber, setTajNumber] = useState<string>("");
  const [isFirstNameEditable, setFirstNameEditable] = useState<boolean>(false);
  const [isLastNameEditable, setLastNameEditable] = useState<boolean>(false);
  const [isEmailEditable, setEmailEditable] = useState<boolean>(false);
  const [isPhoneEditable, setPhoneEditable] = useState<boolean>(false);
  const [isTajNumberEditable, setTajNumberEditable] = useState<boolean>(false);
  let hasTaj = false;

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getUserById(user.uid)
        if (userDoc)
        {
          setFirstName(userDoc.firstName);
          setLastName(userDoc.lastName);
          setEmail(userDoc.email);
          setPhone(userDoc.phone);
          setTajNumber(userDoc.tajNumber);
          if (tajNumber)
            hasTaj = true;
        }
      }
      else
      {
        window.location.href = "/";
      }
    })
  }, []);
  
  const saveFirstName = async (): Promise<void> => {
    try {
      if (auth?.currentUser?.uid) {
        await editFirstName(auth.currentUser.uid, firstName);
        setFirstNameEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveLastName = async (): Promise<void> => {
    try {
      if (auth?.currentUser?.uid) {
        await editLastName(auth.currentUser.uid, lastName);
        setLastNameEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveEmail = async (): Promise<void> => {
    try {
      if (auth?.currentUser?.uid) {
        await editEmail(auth.currentUser.uid, email, tajNumber);
        setEmailEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const savePhone = async (): Promise<void> => {
    try {
      if (auth?.currentUser?.uid) {
        await editPhoneNumber(auth.currentUser.uid, phone);
        setPhoneEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={s.container}>
      <HiOutlineUser className={`${s.profile} text-slate-400`}/>
      <div className={s.edit} style={{paddingTop: "4em"}}>
        {isFirstNameEditable ? (
          <div className={s.editable}>
            <label>{t("profile.first_name")} : </label>
            <HiOutlinePencil className="h-5 w-5 text-blue" />
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <button onClick={() => saveFirstName()}>Save</button>
          </div>
        ) : (
          <div className={s.details} onClick={() => setFirstNameEditable(true)}>
            <label>{t("profile.first_name")} : </label>
            <p>{firstName}</p>
          </div>
        )}
        {isLastNameEditable ? (
          <div className={s.editable}>
            <label>{t("profile.last_name")} : </label>
            <HiOutlinePencil className="h-5 w-5 text-blue" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <button onClick={() => saveLastName()}>Save</button>
          </div>
        ) : (
          <div className={s.details} onClick={() => setLastNameEditable(true)}>
            <label>{t("profile.last_name")} : </label>
            <p>{lastName}</p>
          </div>
        )}
        {isEmailEditable ? (
          <div className={s.editable}>
            <label>{t("profile.email")} : </label>
            <HiOutlinePencil className="h-5 w-5 text-blue" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={() => saveEmail()}>Save</button>
          </div>
        ) : (
          <div className={s.details} onClick={() => setEmailEditable(true)}>
            <label>{t("profile.email")} : </label>
            <p>{email}</p>
          </div>
        )}
        {isPhoneEditable ? (
          <div className={s.editable}>
            <label>{t("profile.phone")} : </label>
            <HiOutlinePencil className="h-5 w-5 text-blue" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button onClick={() => savePhone()}>Save</button>
          </div>
        ) : (
          <div className={s.details} onClick={() => setPhoneEditable(true)}>
            <label>{t("profile.phone")} : </label>
            <p>{phone}</p>
          </div>
        )}
        { hasTaj ? ( 
         <div className={s.details}>
         <label>{t("profile.taj")} : </label>
         <p>{tajNumber}</p>
         </div> 
        ) : ( null )}
      </div>
    </section>
  );
};

const mapStateToProps = () => ({ auth });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
