import { CreateCourseForm } from "@/features/CoursesList/pub/CreateCourseForm";
import { CoursesList } from "@/features/CoursesList/pub/CoursesList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className={"mb-20 size-44 font-bold"}>COURSE LIST</h1>
      <CreateCourseForm revalidatePagePath="/" className="w-[300px]" />
      <CoursesList revalidatePagePath="/" />
    </main>
  );
}
