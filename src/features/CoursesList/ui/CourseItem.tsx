"use client"; // делаем текущий компонент клиентским
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { useTransition } from "react";

export function CourseItem({
  course,
  onDelete,
}: {
  course: CourseListElement;
  onDelete: () => Promise<void>;
}) {
  const [isDeleting, startDeleteTransition] = useTransition(); // TODO прочитать про этот хук, что он делает
  const handleDelete = () => {
    startDeleteTransition(async () => {
      await onDelete();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button disabled={isDeleting} onClick={handleDelete}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
