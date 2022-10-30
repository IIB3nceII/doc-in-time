import { Combobox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";
import { IClinic } from "src/models";

interface FinderFormProps {
  clinics: any;
}

const FinderForm: FC<FinderFormProps> = ({ clinics }) => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [selected, setSelected] = useState<IClinic>(clinics[0]);
  const [problemQuery, setProblemQuery] = useState<string>("");

  const filteredPeople =
    problemQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(problemQuery.toLowerCase().replace(/\s+/g, "")));

  return (
    <div className={s.container}>
      <form>
        <div className={s.formField}>
          <label>What's the problem?</label>

          <div className="combobox-container">
            <Combobox value={selected} onChange={setSelected}>
              <div className="combobox">
                <div className="input-container">
                  <Combobox.Input
                    className="combobox-input"
                    displayValue={(clinic: IClinic) => clinic.name}
                    onChange={(event) => setProblemQuery(event.target.value)}
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
                  afterLeave={() => setProblemQuery("")}
                >
                  <Combobox.Options className="combobox-options">
                    {filteredPeople.length === 0 && problemQuery !== "" ? (
                      <div className="not-found">Nothing found.</div>
                    ) : (
                      filteredPeople.map((clinic: any, i: number) => (
                        <Combobox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"}`
                          }
                          value={clinic}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{clinic.name}</span>
                              {selected ? (
                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}>
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

          <input type="text" {...register("lastName", { required: true })} aria-invalid={errors.lastName ? "true" : "false"} />
          {errors.lastName?.type === "required" && <p>error</p>}
        </div>
      </form>
    </div>
  );
};

export default FinderForm;
