import React, { FC } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IUser } from "src/models";
import s from "./AppointmentCard.module.scss";

interface IAppointmentCardProps {
  startDate: Date;
  endDate: Date;
  doc: IUser | undefined;
  isSelected?: boolean;
}

const AppointmentCard: FC<IAppointmentCardProps> = ({ startDate, endDate, doc, isSelected }) => {
  /**
   * It takes an object of type IAppointmentSlot, and returns a time string.
   * @param {IAppointmentSlot} item - IAppointmentSlot - this is the item that is being rendered.
   * @returns A string with the start and end time of the appointment slot.
   */

  const serializeAppointment = (): string => {
    return `${startDate.getHours() < 10 ? "0" + startDate.getHours() : startDate.getHours()}:${startDate.getMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes()
      } - ${endDate.getHours() < 10 ? "0" + endDate.getHours() : endDate.getHours()}:${endDate.getMinutes() < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes()
      }`;
  };

  return (
    <div className={`${s.container} ${isSelected && s.selected}`}>
      <div className={s.date}>
        <h3>{`${startDate.getFullYear()}. ${startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)}. ${startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate()
          }`}.</h3>
        <p>{serializeAppointment()}</p>
      </div>

      <div className={s.doc}>
        {doc?.imageUrl
          ? <img src={doc?.imageUrl} alt="doc" />
          : <HiOutlineUserCircle className="h-16 w-16 text-white" aria-hidden="true" />
        }
        <span>{`Dr. ${doc?.lastName} ${doc?.firstName}`}</span>
      </div>
      {isSelected && (
        <div className={s.overlay}>
          <p>Selected</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
