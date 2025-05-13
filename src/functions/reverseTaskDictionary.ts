import { type TaskDictionary } from "@/components/TaskBar/ITask"
export const reverseTaskDictionary = (obj: TaskDictionary): TaskDictionary => {
  let newObject: TaskDictionary = {}
  let reversedKeys: string[] = Object.keys(obj).reverse()
  reversedKeys.forEach((key) => { 
    newObject[key] = obj[key]
  })
  return newObject
}

