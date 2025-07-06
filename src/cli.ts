import { Command } from "commander";
import inquirer from "inquirer"
import { scafoldProject } from "./scafolder";

const program = new Command();
program
  .name("plum")
  .description("A CLI tool for scaffolding projects structures")
  .version("1.0.0");

program
  .command("create <projectName>")
  .description("generates a new project")
  // .option(
  //   "-t, --template <template>",
  //   "template names (bare-express, bare-hono)",
  //   "bare-hono",
  // )
  .action(async (projectName, _) => {
    const opts = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "Which template are you rooting for",
        default: "hono",
        choices: [
          "express",
          "express-mongo",
          "hono",
          "hono-bun",
          "hono-bun-mongo"
        ]
      }
    ])
    console.log("Generating a new project...");
    await scafoldProject(projectName, opts.template);
  });

program.parse(process.argv);
