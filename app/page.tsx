import TodoTable from "@/components/TodoTable";
import { IActivity } from "@/types/activity";

const data: IActivity[] = [
  {
    id: "m5gr84i9",
    title: "my custom title",
    description: "success",
    done: false,
  },
  {
    id: "3u1reuv4",
    title: "my custom title",
    description: "success",
  },
  {
    id: "derv1ws0",
    title: "my custom title",
    description: "processing",
  },
  {
    id: "5kma53ae",
    title: "my custom title",
    description: "success",
  },
  {
    id: "bhqecj4p",
    title: "my custom title",
    description: "failed",
  },
];

export default function Home() {
  return (
    <div>
      <TodoTable list={data} />
    </div>
  );
}
