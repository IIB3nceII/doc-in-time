import React, { FC, Fragment } from "react";
import s from "./FormCombobox.module.scss";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";
import { Combobox, Transition } from "@headlessui/react";

interface IFormComboboxProps {
  state: any;
  setState: (state: any) => void;
  query: string;
  setQuery: (query: string) => void;
  items: any[];
  label?: string;
}

const FormCombobox: FC<IFormComboboxProps> = ({ state, setState, query, setQuery, items, label }) => {
  return (
    <div className={s.container}>
      {label && <label>{label}</label>}

      <div className="combobox-container">
        <Combobox value={state} onChange={setState}>
          <div className="combobox">
            <div className="input-container">
              <Combobox.Input
                className="combobox-input"
                displayValue={(item: any) => item["name"] || item["fullName"] || item}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="combobox-button">
                <HiOutlineChevronDown className="combobox-button-icon" aria-hidden="true" />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="combobox-options">
                {items.length === 0 && query !== "" ? (
                  <div className="not-found">Nothing found.</div>
                ) : (
                  items.map((item: any, i: number) => (
                    <Combobox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-400 text-white" : "text-primary"}`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {item["name"] ||
                              item["fullName"] ||
                              (typeof item === "string" && item) ||
                              (item instanceof String && item) ||
                              "item name is not set"}
                          </span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-blue"}`}>
                              <HiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default FormCombobox;
