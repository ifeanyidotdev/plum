import { Command } from "commander";
import inquirer from "inquirer"
import chalk from "chalk";
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
  //
  .action(async (projectName, _) => {
    try {

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
      console.log(chalk.green("Generating a new project..."));
      await scafoldProject(projectName, opts.template);

    } catch (error: unknown) {
      console.error(chalk.red("Error generating project"))
      console.error(chalk.red(error))
    }
  });

program.parse(process.argv);
