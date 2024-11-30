import React from "react";

type Task = {
  text: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  toggleComplete: (index: number) => void;
  deleteTask: (index: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  toggleComplete,
}) => {
  return (
    <div className="w-full text-center flex items-center flex-col gap-5">
      <h1 className="text-blue-600 uppercase font-semibold text-2xl">
        Task List
      </h1>
      <div className="w-1/2 bg-slate-300 backdrop-blur-lg px-3 py-5 rounded-md">
        <ul className="flex flex-col gap-4">
          {" "}
          {/* Wrap the list in a proper <ul> */}
          {tasks.map((task, index) => (
            <li
              key={index}
              className={
                "list-none w-full flex justify-between items-center break-norma"
              }
            >
              <span
                className={`w-2/3 text-left transition-all duration-300 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 font-medium rounded-md"
                  onClick={() => toggleComplete(index)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 font-medium rounded-md"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
