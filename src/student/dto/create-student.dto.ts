export class CreateStudentDto {
  userId: number;

  father: string | undefined;
  mother: string | undefined;
  address: string | undefined;
  observations: string | undefined;
  activityStatus: string | undefined;

  birthday: Date | undefined;
  registration_day: Date | undefined;

  cpf: number | undefined;
  rg: number | undefined;
  phone: number | undefined;
  registration_number: number | undefined;
  classroomId: number | undefined;
}
