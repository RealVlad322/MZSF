import { Directions, type SheduleOut } from '@/shared/contract/api/types';
import { SheduleService } from '@/shared/contract/services';
import { endOfTomorrow, endOfWeek, startOfToday, startOfTomorrow, startOfWeek } from 'date-fns';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class MainStore {
  // объявление полей, которые нужны в разных фичах
  shedules: SheduleOut[] = [];
  showSubjects: boolean = false;
  grade: number = 4;
  name: string = 'БИТ211';
  group: number = 1;
  startTimeStamp: string = startOfToday().toISOString();
  endTimeStamp: string = startOfToday().toISOString();
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
    this.startTimeStamp = startOfWeek(startOfToday(), { weekStartsOn: 1 }).toISOString();
    this.endTimeStamp = endOfWeek(startOfToday(), { weekStartsOn: 1 }).toISOString();

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
    const nextWeekStart = +startOfToday() + 7 * 24 * 60 * 60 * 1000;

    if (this.startTimeStamp === startOfWeek(nextWeekStart, { weekStartsOn: 1 }).toISOString()) {
      this.endTimeStamp = endOfWeek(+new Date(this.startTimeStamp) + 7 * 24 * 60 * 60 * 1000, { weekStartsOn: 1 }).toISOString();
      this.startTimeStamp = startOfWeek(+new Date(this.startTimeStamp) + 7 * 24 * 60 * 60 * 1000, { weekStartsOn: 1 }).toISOString();
    } else {
      const nextWeekStart = +startOfToday() + 7 * 24 * 60 * 60 * 1000;
      this.startTimeStamp = startOfWeek(nextWeekStart, { weekStartsOn: 1 }).toISOString();
      this.endTimeStamp = endOfWeek(nextWeekStart, { weekStartsOn: 1 }).toISOString();
    }

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
