import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { get } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { query } from 'express';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('')
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
        return this.tasksService.getTasks(filterDto );}
    else {
        return this.tasksService.getAllTasks() ;}
    }
    @Get('/:id')
    getTaskById(@Param('id') id :string){
        return this.tasksService.getTaskById(id);
    }
    @Get()
    getAllTasks(){
        return this.tasksService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto :CreateTaskDto){
    return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id :string ,
     @Body('status',TaskStatusValidationPipe) status :TaskStatus )
     :Task{
        return this.tasksService.updateStatus(id, status);
    }

    
}
