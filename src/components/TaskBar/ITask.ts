import { generateRandomString } from '../../functions/generateRandomString'

export interface ITask{
  id: string,
  text: string,
  date: Date,
  isComplited: boolean
}

export function buildTask(Itext: string, Idate: Date, IisComplited: boolean = false): ITask{
  return {
    id: generateRandomString(16), 
    text: Itext,
    date: Idate,
    isComplited: IisComplited
  }
}

export type TaskDictionary = {
  [key: string]: ITask
}