export interface AddTaskProps {
    task: string;
    setTask: (task: string) => void;
    handleCreateTask: () => void;
}

//repésentation de ma tâche en base de données
export interface ITask {
    _id: string;
    task: string;
    completed: boolean;
}

export interface TaskProps {
    individualTask: ITask;
    handleCompleteTask: (id: string) => void;
    handleDeleteTask: (id: string) => void;

}

export interface IDeleteTaskRequestParam {
    params: {
        id: string
    }
}