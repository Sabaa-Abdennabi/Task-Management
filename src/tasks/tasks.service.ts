import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { get } from 'http';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository,
    ){}

    async getTasks(filterDto : GetTasksFilterDto):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);    
    }
  /*   getAllTasks() : Task[]{
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
*/
async getTaskById(id : number): Promise<Task>{
    const found = await this.taskRepository.findOne({ where: { id } });
    if(!found){
        throw new NotFoundException(`task with "${id}" not found `);}
        return found ;
}

async createTask(creatTaskDto : CreateTaskDto) : Promise<Task>{
    return this.taskRepository.createTask(creatTaskDto);

}
async deleteTask(id :number): Promise<Task>{
    const found=this.getTaskById(id);
    if(found){
    this.taskRepository.delete(id);
    return found;}
    else{
        throw new NotFoundException(`Couldn't delet the Task :/ `);
    }
    
}


/*
    getTaskById(id :string): Task{
        const found = this.tasks.find(task =>task.id==id);
        if(!found){
        throw new NotFoundException(`task with "${id}" not found `);}
        return found ;
    }
    deleteTaskById(id :string): void{
        const found =this.getTaskById(id);

        this.tasks.filter(task => task.id != found.id);
    }*/

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task= await this.getTaskById(id);
        task.status=status;
        await task.save();
        return task ;
    }
    

}