import { Combobox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";
import { IClinic, IUser } from "src/models";

interface FinderFormProps {
  clinics: IClinic[];
  knowledges: string[];
  doctors: IUser[];
}

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, doctors }) => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [selectedProblem, setSelectedProblem] = useState<string>(knowledges[0] || "Select a problem");
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [selectedDoctor, setSelectedDoctor] = useState<IUser>(doctors[0] || "Select a doctor");
  const [problemQuery, setProblemQuery] = useState<string>("");
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [doctorQuery, setDoctorQuery] = useState<string>("");

  const filteredProblems =
    problemQuery === ""
      ? knowledges
      : knowledges.filter((knowledges: string) =>
          knowledges.toLowerCase().replace(/\s+/g, "").includes(problemQuery.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredClinics =
    clinicQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(clinicQuery.toLowerCase().replace(/\s+/g, "")));

  const filteredDoctors =
    doctorQuery === ""
      ? doctors
      : doctors.filter((doctor: IUser) =>
          `${doctor.firstName} ${doctor.lastName}`.toLowerCase().replace(/\s+/g, "").includes(doctorQuery.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={s.container}>
      <form>
        <div className={s.formField}>
          <label>What's the problem?</label>

          <div className="combobox-container">
            <Combobox value={selectedProblem} onChange={setSelectedProblem}>
              <div className="combobox">
                <div className="input-container">
                  <Combobox.Input
                    className="combobox-input"
                    displayValue={(knowledge: string) => knowledge}
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
                    {filteredProblems.length === 0 && problemQuery !== "" ? (
                      <div className="not-found">Nothing found.</div>
                    ) : (
                      filteredProblems.map((problem: string, i: number) => (
                        <Combobox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-400 text-white" : "text-primary"}`
                          }
                          value={problem}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{problem}</span>
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

        <div className={s.formField}>
          <label>Choose a clinic</label>

          <div className="combobox-container">
            <Combobox value={selectedClinic} onChange={setSelectedClinic}>
              <div className="combobox">
                <div className="input-container">
                  <Combobox.Input
                    className="combobox-input"
                    displayValue={(clinic: IClinic) => clinic.name}
                    onChange={(event) => setClinicQuery(event.target.value)}
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
                  afterLeave={() => setClinicQuery("")}
                >
                  <Combobox.Options className="combobox-options">
                    {filteredClinics.length === 0 && clinicQuery !== "" ? (
                      <div className="not-found">Nothing found.</div>
                    ) : (
                      filteredClinics.map((clinic: any, i: number) => (
                        <Combobox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-sky-400 text-white" : "text-primary"}`
                          }
                          value={clinic}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{clinic.name}</span>
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

        <div className={s.formField}>
          <label>Choose a clinic</label>

          <div className="combobox-container">
            <Combobox value={selectedDoctor} onChange={setSelectedDoctor}>
              <div className="combobox">
                <div className="input-container">
                  <Combobox.Input
                    className="combobox-input"
                    displayValue={(doctor: IUser) => `${doctor.firstName} ${doctor.lastName}`}
                    onChange={(event) => setDoctorQuery(event.target.value)}
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
                  afterLeave={() => setDoctorQuery("")}
                >
                  <Combobox.Options className="combobox-options">
                    {filteredDoctors.length === 0 && doctorQuery !== "" ? (
                      <div className="not-found">Nothing found.</div>
                    ) : (
                      filteredDoctors.map((doctor: IUser, i: number) => (
                        <Combobox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-blue-400 text-white" : "text-primary"}`
                          }
                          value={doctor}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                              >{`${doctor.firstName} ${doctor.lastName}`}</span>
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
      </form>
    </div>
  );
};

export default FinderForm;
