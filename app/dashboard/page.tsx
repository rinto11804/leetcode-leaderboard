import getAllUsers from "@/lib/dashboard";
import Leaderboard from "../_components/leaderboard";
import TaskForm from "../_components/task-form";
import { Role } from "@/lib/types";

export default async function DashboardPage() {
  let users;
  try {
    users = await getAllUsers();
  } catch (e: any) {
    return <p className="flex flex-col items-center">{e.message}</p>;
  }
  return (
    <div className="">
      <section className="grid lg:grid-cols-[auto_1fr] gap-10 grid-cols-1 p-10">
        <div className="flex flex-col items-center">
          <TaskForm />
        </div>
        <Leaderboard data={users} />
      </section>
    </div>
  );
}
