import Header from "@/components/header";
import Todo from "@/components/task_list/tasks";
import Wrapper from "@/components/wrapper";

export default function Home() {
  return (
    <Wrapper>
      <Header/>
      <Todo/>
    </Wrapper>
  );
}
