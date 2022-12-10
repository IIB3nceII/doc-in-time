import { FC } from "react";
import s from "./EditModal.module.scss";

interface IEditModalProps {
  text?: string;
  item: any;
  cancelButtonText?: string;
  submitButtonText?: string;
  cancel: (params: any) => unknown;
  submit: (params: any) => unknown;
}

const EditModal: FC<IEditModalProps> = ({ text, item, cancelButtonText, submitButtonText, cancel, submit }) => {
  return (
    <div className="modal">
      <div className={`${s.container} modal-container`} style={{ textAlign: 'center' }}>
        <p>{item.clinicName}</p>
        <p>{item.problemName}</p>
        <br />
        <label>Kezdő időpont: <input value={item.startDate.toLocaleString()} style={{ borderRadius: 4, border: '1px solid black', padding: '4px 8px' }} /></label>
        <label>Záró időpont: <input value={item.endDate.toLocaleString()} style={{ borderRadius: 4, border: '1px solid black', padding: '4px 8px' }} /></label>
        <br />
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

export default EditModal;
