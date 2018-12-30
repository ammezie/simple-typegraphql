import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { projects, tasks } from "../data";
import Task from "../schemas/Task";

@Resolver(of => Task)
export default class {
  @Query(returns => [Task])
  fetchTasks() {
    return tasks;
  }

  @Query(returns => Task, { nullable: true })
  getTask(@Arg("id") id: number) {
    return tasks.find(task => task.id === id);
  }

  @Mutation(returns => Task)
  markAsCompleted(@Arg("taskID") taskID: number) {
    const task = tasks.find(task => {
      return task.id === taskID;
    });

    if (!task) {
      throw new Error(`Couldn't find the task with id ${taskID}`);
    }

    if (task.completed === true) {
      throw new Error(`Task with id ${taskID} is already completed`);
    }

    task.completed = true;

    return task;
  }

  @FieldResolver()
  project(@Root() task: Task) {
    return projects.find(project => {
      // task.project is undefined
      return project.id === task.project.id;
    });
  }
}
