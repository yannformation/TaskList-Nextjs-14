import { Schema, model, models } from "mongoose";

import { ITask } from "@/types";


//Construction de la base de données dans mongoDB
const taskSchema = new Schema<ITask>({
  task: {
    type: String,
    required: [true, "Task est requis"],
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = models.Task || model<ITask>('Task', taskSchema)

export default Task;
