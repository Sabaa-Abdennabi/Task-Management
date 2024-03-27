import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { get } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { query } from 'express';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('')
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }
/* 
    @Get('')
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){ 
        return this.tasksService.getTasks(filterDto );}
    else {
        return this.tasksService.getAllTasks() ;}
    }
    */

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id :number ) : Promise<Task>{
        return this.tasksService.getTaskById(id);
    }
    /*
    @Get()
    getAllTasks(){
        return this.tasksService.getAllTasks();
    }
*/
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto :CreateTaskDto){
    return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id :number): Promise<Task>{
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatus(
    @Param('id', ParseIntPipe) id :number ,
    @Body('status',TaskStatusValidationPipe) status : TaskStatus )
    :Promise<Task>
    {
        return this.tasksService.updateStatus(id, status);
    }

   
}
