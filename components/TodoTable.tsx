import { IList } from "@/types/components/todo-table";
import Row from "@/components/ui/row";
import Table from "@/components/ui/table";

export default function TodoTable({ list }: IList) {
  function getListProperties() {
    const keysButID = Object.keys(list[0]).filter((key) => key !== "id");

    return keysButID;
  }

  const columns = getListProperties();

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Team members
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            100 users
          </span>
        </div>
        <Table columns={columns}>
          <Row />
        </Table>
      </section>
    </div>
  );
}
