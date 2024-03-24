import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
@Injectable()
export class TasksService {
    private tasks : Task[]=[];
    getAllTasks() : Task[]{
        return this.tasks;
    }

    getTasks(taskfilter :GetTasksFilterDto) : Task[]{
        const { status ,search } = taskfilter;
        let tasks = this.getAllTasks();
        if (search){
            tasks= tasks.filter(task => 
                task.description.includes(search) || task.title.includes(search)
                )
        }
        if (status){
            tasks = tasks.filter(tas => tas.status==status);

        }
        return tasks;

    }
    createTask(createTaskDto: CreateTaskDto){
        const {title ,description}=createTaskDto;
        const task: Task={
            id: uuidv1(),
            title,
            description,
            status : TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id :string): Task{
        const found = this.tasks.find(task =>task.id==id);
        if(!found){
        throw new NotFoundException(`task with "${id}" not found `);}
        return found ;
    }
    deleteTaskById(id :string): void{
        const found =this.getTaskById(id);

        this.tasks.filter(task => task.id != found.id);
    }
    updateStatus(id :string , status : TaskStatus) : Task{
        const task : Task =this.getTaskById(id);
        if (task){
            task.status=status;
            return task ;
        }else{
            return null ;
        }
    }
}
