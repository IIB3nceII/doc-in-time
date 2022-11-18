import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProfileEditor } from "src/components/ui";
import s from "./EditProfile.module.scss";

const EditProfile: FC = () => {
  return (
    <div className={s.container}>
      <ProfileEditor />

      <section className={s.docForm}>
        <Link className="text-primary hover:underline dark:text-white" to={"/doc-form"}>
          I am a doctor
        </Link>
      </section>
    </div>
  );
};

export default EditProfile;
