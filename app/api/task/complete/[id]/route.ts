import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

import { NextResponse } from 'next/server'

import { IDeleteTaskRequestParam } from "@types";

export const PATCH = async(request: Request, {params} : IDeleteTaskRequestParam) => {
    try{
        await connectToDB()

        const existingTask = await Task.findById(params.id)

        if(!existingTask){
            return NextResponse.json("tâche non trouvée", {status: 404})
        }
        existingTask.completed=true
        await existingTask.save()

        return NextResponse.json("Tâche complétée avec succès", {status: 200})

    }
    catch(error){
        return NextResponse.json("Erreur dans la complétion de la tâche", { status: 500 });
    }
}