import { Combobox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";

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

  const [selected, setSelected] = useState(clinics[0]);
  const [problemQuery, setProblemQuery] = useState<string>("");

  const filteredPeople =
    problemQuery === ""
      ? clinics
      : clinics.filter((clinic: any) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(problemQuery.toLowerCase().replace(/\s+/g, "")));

  return (
    <div className={s.container}>
      <form>
        <div className={s.formField}>
          <label>What's the problem?</label>

          <div className="fixed top-16 w-72">
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    // displayValue={(clinic) => clinic?.name || ""}
                    onChange={(event) => setProblemQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiOutlineChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setProblemQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPeople.length === 0 && problemQuery !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
                    ) : (
                      filteredPeople.map((clinic: any) => (
                        <Combobox.Option
                          key={clinic.id}
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
