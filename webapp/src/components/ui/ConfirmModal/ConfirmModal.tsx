import React, { FC } from "react";
import s from "./ConfirmModal.module.scss";

interface IConfirmModalProps {
  text?: string;
  item: any;
  cancelButtonText?: string;
  submitButtonText?: string;
  cancel: (params: any) => unknown;
  submit: (params: any) => unknown;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ text, item, cancelButtonText, submitButtonText, cancel, submit }) => {
  return (
    <div className="modal">
      <div className={`${s.container} modal-container`}>
        <p>{text}</p>
        <div className={s.buttons}>
          <button onClick={() => cancel(false)}>{cancelButtonText || "Cancel"}</button>
          <button className={s.submitButton} onClick={() => submit(item)}>
            {submitButtonText || "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
