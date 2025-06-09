import { Command } from "commander";
import { scafoldProject } from "./scafolder";

const program = new Command();
program
  .name("plum")
  .description("A CLI tool for scaffolding projects structures")
  .version("1.0.0");

program
  .command("create <projectName>")
  .description("generates a new project")
  .option(
    "-t, --template <template>",
    "template names (bare-express, bare-hono)",
    "bare-hono",
  )
  .action(async (projectName, options) => {
    console.log("Generating a new project...");
    await scafoldProject(projectName, options.template);
  });

program.parse(process.argv);
