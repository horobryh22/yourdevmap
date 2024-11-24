import { cache } from "react";
import { dbClient } from "@/shared/lib/db";

//  cache - чтобы в рамках одного рендера был только один запрос к БД (даже если значение используется в нескольких компонентах)

class CoursesRepository {
  getCoursesList = cache((): Promise<CourseListElement[]> => {
    return dbClient.course.findMany()
  })
  createCourseElement = (command: CreateCourseListElementCommand): Promise<CourseListElement> => {
    return dbClient.course.create({data: {...command}})
  }
  deleteCourseElement = (command: DeleteCourseListElementCommand): Promise<CourseListElement> => {
    return dbClient.course.delete({ where: { id: command.id} });
  }
}

export const coursesRepository = new CoursesRepository();
