import { generateRandomString } from '../../functions/generateRandomString'

export interface ITask{
  id: string,
  text: string,
  date: Date,
}

export function buildTask(Itext: string, Idate: Date): ITask{
  return {
    id: generateRandomString(16), 
    text: Itext,
    date: Idate,
  }
}

export type TaskDictionary = {
  [key: string]: ITask
}