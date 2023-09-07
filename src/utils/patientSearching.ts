import { SearchPatientProps } from "@/store/PatientContext";
import { PatientProps } from "@/types/Patient"

interface SearchAlgoProps extends SearchPatientProps {
  patients: PatientProps[];
}

const PatientSearchAlgo = ({ patients, query, gender, ageRange, sortAscending }: SearchAlgoProps) => {
  console.log({ patients, query, gender, ageRange, sortAscending });
  // filter by ID, name, email
  // filter by gender Male | Female
  // filter by Age Groups
  // Sort result Asc | Dec
  return patients
}

export default PatientSearchAlgo