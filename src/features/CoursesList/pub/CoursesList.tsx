import { coursesRepository } from "@/features/CoursesList/courses.repository";
import { CourseItem } from "@/features/CoursesList/ui/CourseItem";
import { revalidatePath } from "next/cache";
import { cn } from "@/shared/ui/utils";

export async function CoursesList({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className?: string;
}) {
  const courses = await coursesRepository.getCoursesList();

  const handleDeleteAction = async (courseId: string) => {
    "use server";

    await coursesRepository.deleteCourseElement({ id: courseId });

    // чтобы ревалидировать страницу, после изменений (когда экшен будет выполнен)
    // в БД (в нашем случае после удаления)
    revalidatePath(revalidatePagePath);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {courses.map((course) => (
        <CourseItem
          key={course.id}
          course={course}
          onDelete={handleDeleteAction.bind(null, course.id)} // TODO почитать про bind для actions
        />
      ))}
    </div>
  );
}
