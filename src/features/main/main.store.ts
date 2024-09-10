
import { Directions, type test } from '@/shared/contract/api/types';
import { SettingsTabs, SheduleService } from '@/shared/contract/services';
import { type SheduleType } from '@/shared/contract/services/types';
import { StorageAgent } from '@/shared/lib';
import { endOfTomorrow, endOfWeek, startOfToday, startOfTomorrow, startOfWeek } from 'date-fns';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

@injectable()
export class MainStore {
  // объявление полей, которые нужны в разных фичах
  shedules: SheduleType[] = [];
  showSubjects: boolean = false;
  fullSem: boolean = false;
  teacherName: string = 'Сбитнев А.В.';
  grade: number = 4;
  name: string = 'БИС';
  group: number = 1;
  startTimeStamp: string = startOfToday().toISOString();
  endTimeStamp: string = startOfToday().toISOString();
  settingsTab: SettingsTabs = SettingsTabs.STUDENT;
  constructor(private readonly shedule$$: SheduleService, private readonly storage$$: StorageAgent) {
    makeAutoObservable(this);

    const storageGetData = this.storage$$.get<test>('scheduleCache');

    if (storageGetData) {
      if (storageGetData.grade) {
        this.setGrade(storageGetData.grade);
      }

      if (storageGetData.groupName) {
        this.setName(storageGetData.groupName);
      }

      if (storageGetData.group) {
        this.setGroup(storageGetData.group);
      }

      if (storageGetData.teacher) {
        this.setTeacherName(storageGetData.teacher);
      }

      if (storageGetData.startTimeStamp) {
        this.setStartTimeStamp(storageGetData.startTimeStamp);
      }

      if (storageGetData.endTimeStamp) {
        this.setEndTimeStamp(storageGetData.endTimeStamp);
      }

      if (storageGetData.fullSem !== undefined) {
        this.setFullSem(storageGetData.fullSem);
      }

      if (storageGetData.settingTab !== undefined) {
        this.setSettingsTab(storageGetData.settingTab);
      }

      void this.loadShedules(this.startTimeStamp, this.endTimeStamp);

      this.setShowSubjects(true);
    }
  }

  setShowSubjects(bool: boolean): void {
    this.showSubjects = bool;
    this.storage$$.delete('scheduleCache');

    if (!this.showSubjects) {
      this.setFullSem(false);
      this.shedules = [];
    }
  }

  setFullSem(bool: boolean): void {
    this.fullSem = bool;
  }

  setName(name: string): void {
    this.name = name;
  }

  setTeacherName(name: string): void {
    this.teacherName = name;
  }

  setSettingsTab(tab: SettingsTabs): void {
    this.settingsTab = tab;
    this.showSubjects = false;
    this.shedules = [];
  }

  setGrade(grade: number): void {
    this.grade = grade;
  }

  setGroup(group: number): void {
    this.group = group;
  }

  setStartTimeStamp(timeStamp: string): void {
    this.startTimeStamp = timeStamp;
  }

  setEndTimeStamp(timeStamp: string): void {
    this.endTimeStamp = timeStamp;
  }

  async loadFullSem(): Promise<void> {
    await this.loadShedules('2024-09-02', '2024-12-31');

    this.setFullSem(true);
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
    this.startTimeStamp = startOfWeek(+new Date(this.endTimeStamp) + 7 * 24 * 60 * 60 * 1000, {
      weekStartsOn: 1,
    }).toISOString();
    this.endTimeStamp = endOfWeek(+new Date(this.startTimeStamp), {
      weekStartsOn: 1,
    }).toISOString();

    await this.loadShedules();
  }

  private async loadShedules(startTimeStamp?: string, endTimeStamp?: string, isTeacher?: boolean): Promise<void> {
    const result = await this.shedule$$.getList({
      groupName: this.settingsTab === SettingsTabs.STUDENT ? this.name + this.grade : undefined,
      group: this.settingsTab === SettingsTabs.STUDENT ? this.group : undefined,
      teacher: this.settingsTab === SettingsTabs.TEACHER ? this.teacherName : undefined,
      startTimeStamp: startTimeStamp ? startTimeStamp : this.startTimeStamp,
      endTimeStamp: endTimeStamp ? endTimeStamp : this.endTimeStamp,
      sortByDate: Directions.DESC,
    });

    this.shedules = result;

    this.storage$$.set('scheduleCache', {
      groupName: this.settingsTab === SettingsTabs.STUDENT ? this.name + this.grade : undefined,
      group: this.settingsTab === SettingsTabs.STUDENT ? this.group : undefined,
      teacher: this.settingsTab === SettingsTabs.TEACHER ? this.teacherName : undefined,
      startTimeStamp: startTimeStamp ? startTimeStamp : this.startTimeStamp,
      endTimeStamp: endTimeStamp ? endTimeStamp : this.endTimeStamp,
      sortByDate: Directions.DESC,
      settingTab: this.settingsTab,
      fullSem: this.fullSem,
    });
  }

  // написание разных методов(к примеру получить данные)
}
