"use client";

import TaskList from "@/components/TaskList";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type Task = {
  text: string;
  completed: boolean;
};

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTasks, setNewTasks] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTasks.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTasks.trim(), completed: false },
      ]);
      setNewTasks("");
    }
  };

  const toggleComplete = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks((prevTask) => prevTask.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTasks(e.target.value);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-8">
      <div className="flex justify-center items-center gap-6">
        <input
          className="w-72 border-2 rounded-md px-3 py-3 bg-grey-300 backdrop-blur-lg"
          placeholder="Masukan Todo List Kamu"
          onChange={handleInputChange}
          value={newTasks}
        />
        <button
          className="h-full px-5 py-2 bg-blue-500 rounded-md font-medium text-white "
          onClick={addTask}
        >
          Tambah Todo Item
        </button>
      </div>
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Home;
