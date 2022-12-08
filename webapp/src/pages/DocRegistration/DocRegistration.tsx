import { FC, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import s from "./DocRegistration.module.scss";
import { IClinic } from "src/models";
import { FormCombobox } from "src/components/ui";
import { useForm } from "react-hook-form";
import IDocRegisterFormData from "src/models/doctor-registration-form-data-model";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "src/utils/firebase/firebase.config";
import MultiSelect from "src/components/ui/MultiSelect";
import { getUserById } from "src/utils/firebase/firestore";

interface DocRegistrationProps extends StateProps, DispatchProps { }

export interface ItemProps {
  key: String,
  value: String
}

const DocRegistration: FC<DocRegistrationProps> = ({ auth }) => {
  const navigation = useNavigate();

  const clinics: IClinic[] = useLoaderData() as IClinic[];

  const [selectedClinic, setSelectedClinic] = useState<IClinic | null>(null);
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selectedItems, setSelected] = useState<ItemProps[]>([]);

  const {
    register,
    setValue,
    handleSubmit,
  } = useForm<IDocRegisterFormData>({
    defaultValues: {
      range: 30,
      monday_startTime: "08:00:00",
      monday_endTime: "16:00:00",
      tuesday_startTime: "08:00:00",
      tuesday_endTime: "16:00:00",
      wednesday_startTime: "08:00:00",
      wednesday_endTime: "16:00:00",
      thursday_startTime: "08:00:00",
      thursday_endTime: "16:00:00",
      friday_startTime: "08:00:00",
      friday_endTime: "16:00:00",
    }
  });

  const filteredClinics =
    clinicQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(clinicQuery.toLowerCase().replace(/\s+/g, "")));


  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(query(collection(db, "illnesses")))

      const data: ItemProps[] = []
      res.forEach((item) => {
        const item_data = item.data()
        data.push({
          key: item.id,
          value: item_data.name
        })
      })
      if (auth.account) {
        const doctor = await getUserById(auth.account.uid)
        if (doctor.isDoc) {
          const doc_clinic = clinics.filter(item => item.id === doctor.doc.clinics[0].clinicId)
          setSelectedClinic(doc_clinic[0])
          const doc_items = data.filter(item => doctor.doc.knowledges.includes(item.key))
          setSelected(doc_items)
          const doc_ranges = doctor.doc.ranges
          Object.keys(doc_ranges).forEach(key => {
            setValue(key as "range" | "monday_startTime" | "monday_endTime" | "tuesday_startTime" | "tuesday_endTime" | "wednesday_startTime" | "wednesday_endTime" | "thursday_startTime" | "thursday_endTime" | "friday_startTime" | "friday_endTime", doc_ranges[key])
          })
        }
      }
      setItems(data)
    }
    getData()
  }, [auth, clinics, setValue])

  const createNewDocReg = async (item: IDocRegisterFormData): Promise<void> => {
    try {
      if (auth?.account?.uid && selectedClinic && selectedItems.length > 0) {
        await updateDoc(doc(db, "users", auth.account.uid), {
          isDoc: true,
          doc: {
            clinics: [
              {
                clinicId: selectedClinic.id
              }
            ],
            fields: [
              "doctor"
            ],
            knowledges: [
              ...selectedItems.flatMap(item => item.key)
            ],
            ranges: {
              ...item
            }
          }
        })
        navigation("/edit-profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createNewDocReg)}>
        <div className={s.selection}>
          <div className={s.clinicchooser}>
            <FormCombobox
              state={selectedClinic}
              setState={setSelectedClinic}
              query={clinicQuery}
              setQuery={setClinicQuery}
              items={filteredClinics}
              label={"Choose a clinic"}
            />
          </div>
          <MultiSelect items={items} selectedItems={selectedItems} setSelected={setSelected} />
          <label>Intervallum</label>
          <input type='number' {...register('range')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          <label>Hétfő</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, marginBottom: 16 }}>
            <input type='text' {...register('monday_startTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
            <input type='text' {...register('monday_endTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          </div>
          <label>Kedd</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, marginBottom: 16 }}>
            <input type='text' {...register('tuesday_startTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
            <input type='text' {...register('tuesday_endTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          </div>
          <label>Szerda</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, marginBottom: 16 }}>
            <input type='text' {...register('wednesday_startTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
            <input type='text' {...register('wednesday_endTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          </div>
          <label>Csütörtök</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, marginBottom: 16 }}>
            <input type='text' {...register('thursday_startTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
            <input type='text' {...register('thursday_endTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          </div>
          <label>Péntek</label>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, marginBottom: 16 }}>
            <input type='text' {...register('friday_startTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
            <input type='text' {...register('friday_endTime')} className="my-2 px-2 py-1 flex border border-gray-200 bg-white rounded shadow" />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 32 }}>
            <div className={s.cancel}>
              <Link to="/edit-profile">Cancel</Link>
            </div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )

};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocRegistration);

