import fs from "fs-extra";
import path from "path";
import { render } from "ejs";
import chalk from "chalk";

export async function scafoldProject(
  projectName: string,
  templateName: string,
) {
  console.log(chalk.grey(projectName));
  const TEMPLATE_PATH = path.join(__dirname, `../templates`, templateName);
  const PROJECT_PATH = path.resolve(projectName);

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(chalk.red(`✖ Template "${templateName}" not found!`));
    process.exit(1);
  }

  if (fs.existsSync(PROJECT_PATH)) {
    console.error(chalk.red(`✖ Project "${projectName}" already exists!`));
    process.exit(1);
  }

  try {
    // Copy template files
    await fs.copy(TEMPLATE_PATH, PROJECT_PATH);

    // Process package.json
    const packageJsonPath = path.join(PROJECT_PATH, "package.json");
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    // Process EJS templates
    const files = await fs.readdir(PROJECT_PATH);
    for (const file of files) {
      if (file.endsWith(".ejs")) {
        const filePath = path.join(PROJECT_PATH, file);
        const content = await fs.readFile(filePath, "utf-8");
        const rendered = render(content, { projectName });
        const newPath = filePath.replace(/\.ejs$/, "");

        await fs.writeFile(newPath, rendered);
        await fs.remove(filePath);
      }
    }

    console.log(
      chalk.green(`✔ Project "${projectName}" created successfully!`),
    );
    console.log(chalk.blue(`→ cd ${projectName} && bun install`));
  } catch (error) {
    console.error(chalk.red("Error generating project:"), error);
    process.exit(1);
  }
}
