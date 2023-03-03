import { Body, Controller, Get, Post, Query, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dtos/students.dto';
import { ClassesDto } from './dtos/classes.dto';
import { User, NoUser } from '../common/decorators';
import { SensitiveOperation } from '../common/decorators';
import { SensitiveType } from '../sensitive/constants';
import { TransformNamePipe } from '../common/pipes/name.pipes';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
  
    // @Get('who-are-you')
    // whoAreYou(@Query('name', TransformNamePipe) name: string) {
    //     return this.studentsService.ImStudent(name);
    // }

    @NoUser()
    @Post('whoAreYou')
    whoAreYouPost(@Body() student: StudentDto) {
        return this.studentsService.showStudent(student.name);
    }

    @Post('whoIsRequest')
    whoIsReq(@User() user: string) {
        return user;
    }

    @Get('getNameById')
    getNameById(@Query('id', ParseIntPipe) id: number) {
        return this.studentsService.getStudentName(id);
    }

    @SensitiveOperation(SensitiveType.Set)
    @Post('setStudentName')
    setStudentName(@User() user: string) {
        return this.studentsService.setStudent(user);
    }

    @Get('getClass')
    getClass(@Query('id', ParseIntPipe) id: number) {
        return this.studentsService.findClass(id);
    }

    @Post('setClass')
    setClass(@Body() classes: ClassesDto) {
        return this.studentsService.setClass(classes.className, classes.students);
    }
}
