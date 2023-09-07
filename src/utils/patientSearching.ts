import { SearchPatientProps } from "@/store/PatientContext";
import { PatientProps } from "@/types/Patient"

interface SearchAlgoProps extends SearchPatientProps {
  patients: PatientProps[];
}

const PatientSearchAlgo = ({ patients, query, gender, ageRange, sortAscending }: SearchAlgoProps): PatientProps[] => {

  let data: PatientProps[] = [];
  for (let i = 0; i < patients.length; i++) {
    const item = patients[i];

    const genderFlag = genderCheck(item?.gender, gender as string)
    const ageFlag = ageCheck(item?.age, ageRange as string);
    const queryFlag = queryMatching(item, query as string);

    if (genderFlag && ageFlag && queryFlag) data.push(item);
  }
  if (sortAscending != undefined) data = sortFormation(data, sortAscending)
  return data
}

const genderCheck = (patientGender: string, gender: string): boolean => {
  if (!gender?.length) return true;
  return patientGender.toLowerCase() == gender ? true : false
}

const ageCheck = (patientAge: number, ageRange: string) => {
  if (!ageRange.length) return true;

  const [min, max] = ageRange.split('-');
  if (!max) return patientAge > 45;
  else {
    if (patientAge >= parseInt(min) && patientAge <= parseInt(max)) return true
  }
  return false
}

const queryMatching = (item: PatientProps, query: string): boolean => {
  const { patient_id, first_name, last_name, email } = item
  const regex = new RegExp(query, 'i');
  if (regex.test(patient_id.toString()) || regex.test(first_name) || regex.test(last_name) || regex.test(email)) {
    return true;
  }
  return false
}

const sortFormation = (data: PatientProps[], isAccending: string): PatientProps[] => {
  let sortAsc = data.sort((a, b) => {
    const username1 = a.first_name
    const username2 = b.first_name
    if (username1 < username2) {
      return -1;
    }
    if (username2 > username1) {
      return 1;
    }
    return 0
  })
  if (isAccending == 'dec') sortAsc.reverse();
  return sortAsc
}

export default PatientSearchAlgo