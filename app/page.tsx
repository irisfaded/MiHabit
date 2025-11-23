import Header from "@/components/task-list/TaskListHeader";
import Todo from "@/components/task-list/TaskListClient";
import Wrapper from "@/components/wrapper";
import TaskListClient from "@/components/task-list/TaskListClient";

export default function Home() {
  return (
    <Wrapper>
      <TaskListClient/>
    </Wrapper>
  );
}
