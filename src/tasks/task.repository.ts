import { DataSource, Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
    

constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(creatTaskDto : CreateTaskDto) : Promise<Task>{
    const task= new Task();
    const {title ,description}= creatTaskDto;
    task.title=title;
    task.description=description;
    task.status=TaskStatus.OPEN;
    await task.save();
    return task;
}
  async getTasks(filterDto : GetTasksFilterDto): Promise<Task[]>{
    const {status,search} = filterDto;
    const query=this.createQueryBuilder('task');
    if (status){
      query.andWhere('task.status = :status ',{status});
    }
    if (search){
      query.andWhere('task.title LIKE :search OR task.description LIKE  :search ',{search : `%${search}`});
    }
    const tasks = await query.getMany();
    return tasks ;
    
  }
}
