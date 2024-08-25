import { Directions, type SheduleOut } from '@/shared/contract/api/types';
import { SheduleService } from '@/shared/contract/services';
import { endOfTomorrow, startOfToday, startOfTomorrow } from 'date-fns';
import subDays from 'date-fns/subDays';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class MainStore {
  // объявление полей, которые нужны в разных фичах
  shedules: SheduleOut[] = [];
  showSubjects: boolean = false;
  grade: number = 3;
  name: string = 'БИС';
  group: number = 1;
  startTimeStamp: string = '2024-02-01';
  endTimeStamp: string = '2024-02-01';
  constructor(private readonly shedule$$: SheduleService) {
    makeAutoObservable(this);
  }

  setShowSubjects(bool: boolean): void {
    this.showSubjects = bool;
  }

  setName(name: string): void {
    this.name = name;
  }

  setGrade(grade: number): void {
    this.grade = grade;
  }

  setgroup(group: number): void {
    this.group = group;
  }

  setStartTimeStamp(timeStamp: string): void {
    this.startTimeStamp = timeStamp;
  }

  setEndTimeStamp(timeStamp: string): void {
    this.endTimeStamp = timeStamp;
  }

  async loadShedulesThisWeek(): Promise<void> {
    this.startTimeStamp = subDays(startOfToday(), 7).toISOString();
    this.endTimeStamp = startOfTomorrow().toISOString();

    await this.loadShedules();
  }

  async loadShedulesToomorrow(): Promise<void> {
    this.startTimeStamp = startOfTomorrow().toISOString();
    this.endTimeStamp = endOfTomorrow().toISOString();

    await this.loadShedules();
  }

  async loadShedulesToday(): Promise<void> {
    this.startTimeStamp = startOfToday().toISOString();
    this.endTimeStamp = startOfTomorrow().toISOString();

    await this.loadShedules();
  }

  async loadShedulesNextWeek(): Promise<void> {
    this.startTimeStamp = subDays(startOfTomorrow(), 7).toISOString();
    this.endTimeStamp = startOfTomorrow().toISOString();

    await this.loadShedules();
  }

  private async loadShedules(startTimeStamp?: string, endTimeStamp?: string): Promise<void> {
    const result = await this.shedule$$.getList({
      grade: this.grade,
      name: this.name,
      group: this.group,
      startTimeStamp: startTimeStamp ? startTimeStamp : this.startTimeStamp,
      endTimeStamp: endTimeStamp ? endTimeStamp : this.endTimeStamp,
      sortByDate: Directions.DESC,
    });

    console.log(result);

    this.shedules = result;
  }

  // написание разных методов(к примеру получить данные)
}
