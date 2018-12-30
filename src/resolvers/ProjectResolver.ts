import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { projects, tasks } from "../data";
import Project from "../schemas/Project";

@Resolver(of => Project)
export default class {
  @Query(returns => Project, { nullable: true })
  projectByName(@Arg("name") name: string) {
    return projects.find(project => project.name === name);
  }

  @FieldResolver()
  tasks(@Root() project: Project) {
    return tasks.filter(task => {
      return task.project_id === project.id;
    });
  }
}
