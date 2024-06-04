export interface JobApply {
  id?: string; // Optional because we will add it manually
  jobId: string;
  jobTitle: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  phone: string;
  cvUrl: string;
  companyName: string;
  applicationDate: any; // Firestore timestamp
}
