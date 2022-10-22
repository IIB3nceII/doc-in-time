import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";
import s from "./DatePicker.module.scss";
import { MONTHS } from "src/utils/constants";

const DatePicker = () => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [months, setMonths] = useState<string[]>(MONTHS);
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth() - 1]);

  useEffect(() => {
    generateYears();
  }, []);

  const generateYears = (): void => {
    const max = new Date().getFullYear();
    const min = max - 50;
    let yrs = [];

    for (var i = max; i >= min; i--) {
      yrs.push(i);
    }

    setYears(yrs);
    setSelectedYear(yrs[0]);
  };

  return (
    <div className={s.container}>
      <div className={s.listbox}>
        <Listbox value={selectedYear} onChange={setSelectedYear}>
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
        <Listbox value={selectedMonth} onChange={setSelectedMonth}>
          <div className={s.listboxContainer}>
            <Listbox.Button className={s.listboxButton}>
              <span className={s.selectedYear}>{selectedMonth}</span>
              <span className={s.dropdownIconContainer}>
                <HiOutlineChevronDown className={s.icon} aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className={s.listboxOptions}>
                {months.map((month, i) => (
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
  );
};

export default DatePicker;
