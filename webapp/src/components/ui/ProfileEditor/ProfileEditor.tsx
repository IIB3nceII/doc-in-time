import React, { FC, useState } from "react";
import s from "./ProfileEditor.module.scss";
import { HiOutlinePencil, HiOutlineUser } from "react-icons/hi";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { editUserName } from "src/utils/firebase/firestore";

interface IProfileEditorProps extends StateProps, DispatchProps {}

const ProfileEditor: FC<IProfileEditorProps> = ({ auth }) => {
  const [name, setName] = useState<string>(auth.account?.fullName || "acc name");

  const [isContentEditable, setIsContentEditable] = useState<boolean>(false);

  const saveNewName = async (): Promise<void> => {
    try {
      if (auth?.account?.id) {
        await editUserName(auth.account.id, name);
        setIsContentEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={s.container}>
      {auth.account?.imageUrl ? (
        <img className={s.profile} src={auth.account?.imageUrl} alt="user" />
      ) : (
        <HiOutlineUser className={`${s.profile} text-slate-400`} />
      )}
      <div className={s.edit}>
        {isContentEditable ? (
          <div className={s.editable}>
            <HiOutlinePencil className="h-5 w-5 text-blue" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => saveNewName()}>Save</button>
          </div>
        ) : (
          <div className={s.details} onClick={() => setIsContentEditable(true)}>
            <p>{name}</p>
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
