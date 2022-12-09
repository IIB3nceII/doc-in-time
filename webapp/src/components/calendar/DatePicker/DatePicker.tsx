import React, { FC } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";
import s from "./DatePicker.module.scss";
import { MONTHS } from "src/utils/constants";
import DayPicker from "../DayPicker";
import { IUser } from "src/models";

interface IDatePickerProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  isLoading?: boolean;
  doc?: IUser;
}

const DatePicker: FC<IDatePickerProps> = ({
  years,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  isLoading,
  doc,
}) => {

  return (
    <div className={s.container}>
      <div>
        <div className={s.listboxContainer}>
          <div className={s.listbox}>
            <Listbox value={selectedYear} onChange={setSelectedYear} disabled={isLoading}>
              <div className={s.listboxContainer}>
                <Listbox.Button className={s.listboxButton}>
                  <span className={s.selectedYear}>{selectedYear}</span>
                  <span className={s.dropdownIconContainer}>
                    <HiOutlineChevronDown className={s.icon} aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className={s.listboxOptions}>
                    {years.map((year, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-300 text-white" : "text-gray-900"}`
                        }
                        value={year}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{year}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue">
                                <HiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className={s.listbox}>
            <Listbox value={selectedMonth} onChange={setSelectedMonth} disabled={isLoading}>
              <div className={s.listboxContainer}>
                <Listbox.Button className={s.listboxButton}>
                  <span className={s.selectedYear}>{selectedMonth}</span>
                  <span className={s.dropdownIconContainer}>
                    <HiOutlineChevronDown className={s.icon} aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className={s.listboxOptions}>
                    {MONTHS.map((month, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-300 text-white" : "text-gray-900"}`
                        }
                        value={month}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{month}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue">
                                <HiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        <div className={s.day}>
          {selectedYear && selectedMonth && (
            <DayPicker isLoading={isLoading} year={selectedYear} month={String(selectedMonth)} day={selectedDay} setDay={setSelectedDay} />
          )}
        </div>
      </div>

      {/*doc?.doc?.clinics?.length ? (
        <div className="flex flex-col space-y-2 h-48 w-full overflow-y-scroll lg:mt-10">
          {doc?.doc?.clinics.map((clinic, i) => (
            <div
              key={i}
              className={`flex items-center space-x-4 max-w-sm py-2 px-4 font-semibold rounded-lg border-2 overflow-hidden`}
              style={{ color: `${clinic.color}`, borderColor: `${clinic.color}`, backgroundColor: `${clinic.color}3f` }}
            >
              <p>{clinic.clinicName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No Clinics</div>
      )*/}
    </div>
  );
};
export default DatePicker;
