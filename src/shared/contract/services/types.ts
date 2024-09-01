import { type SubjectDto } from '../api';

export interface SheduleType {
  grade: number;

  faculty: string;

  name: string;

  group: number;

  subgroup?: string;

  date: string;

  subjects: SubjectDto[];
}
