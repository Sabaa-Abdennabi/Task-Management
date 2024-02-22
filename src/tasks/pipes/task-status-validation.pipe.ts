import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';



export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedstatus =[
        TaskStatus.OPEN ,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,

    ];
    
    
    transform(value :any){
        value = value.toUpperCase();
        if(!this.IsValid(value)){
            throw new BadRequestException(`The status ${value} is invalid`)
        }
    }
    
    private IsValid(status :any ) : boolean {
        const indx = this.allowedstatus.indexOf(status);
        return indx !== -1 ;
    }
}