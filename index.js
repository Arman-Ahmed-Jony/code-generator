#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import ejs from "ejs";
import yargsParser from "yargs-parser";
import path from "path";
import * as url from "url";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import { companyASCII, sleep } from "./utils/utilities.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const argv = yargsParser(process.argv.slice(2));
const workingDir = path.join(process.cwd()); // in developemnt use 'generated'

const entityDefinition = {
  name: "",
  fields: {},
};

const getEntityName = async () => {
  const answers = await inquirer.prompt([
    {
      name: "entity_name",
      type: "text",
      message: "what is the name of the entity?",
      default() {
        return "entity";
      },
    },
    {
      name: "aditionals",
      type: "checkbox",
      message: "aditional features.",
      choices: [
        { label: "pagination", value: "pagination" },
        { label: "filter(coming soon)", value: "filter" },
      ],
      default: ["pagination"],
    },
  ]);
  entityDefinition.name = answers.entity_name;
  entityDefinition.aditionals = answers.aditionals;
  return entityDefinition;
};

const wantTogetMoreFields = async () => {
  const answer = await inquirer.prompt({
    name: "wantToAddMoreFields",
    type: "confirm",
    message: "do you want to add another field?",
    default: true,
  });
  return answer.wantToAddMoreFields;
};

const getFields = async () => {
  const answers = await inquirer.prompt([
    {
      name: "name",
      type: "text",
      message: "what is the name of the field?",
    },
    {
      name: "type",
      type: "list",
      message: "what type is it?",
      choices: ["text", "number", "email", "date", "password"],
      default: "text",
    },
    {
      name: "required",
      type: "list",
      message: "is it a required field?",
      choices: ["true", "false"],
      default: true,
    },
  ]);
  entityDefinition.fields[`${answers.name}`] = {
    type: answers.type,
    required: answers.required === "true" ? true : false,
  };
  if (await wantTogetMoreFields()) {
    await getFields();
  } else {
    return entityDefinition;
  }
};

const generateEntityJson = async () => {
  const spinner = createSpinner("generating entity json...").start();
  await sleep();
  try {
    fs.outputFileSync(
      path.join(workingDir, `./entities/${entityDefinition.name}.json`),
      JSON.stringify(entityDefinition.fields)
    );
    spinner.success({
      text: `entity json is generated successfully!!\n\n`,
    });
    console.log(
      `${chalk.bgBlue("[Note]: ")} location of the entity file \n${path.join(
        workingDir,
        `./entities/${entityDefinition.name}.json`
      )}\n`
    );
  } catch (error) {
    console.error(error);
  }
};

const greetings = async () => {
  console.clear();
  console.log(companyASCII);
};

const main = async () => {
  await greetings();
  await sleep(1000);
  await getEntityName();
  await getFields();
  await generateEntityJson();

  try {
    const options = {};
    const entityName = entityDefinition.name;

    const generatedEntityForm = path.join(
      workingDir,
      `./src/modules/${entityName}s/components/${entityName
        .charAt(0)
        .toUpperCase()}${entityName.slice(1)}Form.vue`
    );
    const generatedFilter = path.join(
      workingDir,
      `./src/modules/${entityName}s/components/${entityName
        .charAt(0)
        .toUpperCase()}${entityName.slice(1)}Filter.vue`
    );
    const generatedEntityList = path.join(
      workingDir,
      `./src/modules/${entityName}s/components/${entityName
        .charAt(0)
        .toUpperCase()}${entityName.slice(1)}List.vue`
    );
    const generatedEntityCrudIndex = path.join(
      workingDir,
      `./src/modules/${entityName}s/pages/${entityName
        .charAt(0)
        .toUpperCase()}${entityName.slice(1)}Index.vue`
    );
    const generatedEntityApi = path.join(
      workingDir,
      `./src/services/${entityName}Service.js`
    );
    const generatedEntityAction = path.join(
      workingDir,
      `./src/stores/${entityName}-store/actions.js`
    );
    const generatedStoreIndex = path.join(
      workingDir,
      `./src/stores/${entityName}-store/index.js`
    );
    const generatedRoutes = path.join(
      workingDir,
      `./src/modules/${entityName}s/routes.js`
    );
    const generatedTemplateIndex = path.join(
      workingDir,
      `./src/modules/${entityName}s/index.js`
    );

    const formTemplate = path.join(__dirname, `./templates/form.ejs`);
    const filterTemplate = path.join(__dirname, `./templates/filter.ejs`);
    const listTemplate = path.join(__dirname, `./templates/list.ejs`);
    const apiTemplate = path.join(__dirname, `./templates/api.ejs`);
    const actionTemplate = path.join(__dirname, `./templates/actions.ejs`);
    const storeIndexTemplate = path.join(
      __dirname,
      `./templates/storeIndex.ejs`
    );
    const CrudIndexTemplate = path.join(__dirname, `./templates/crudIndex.ejs`);
    const routesTemplate = path.join(__dirname, `./templates/routes.ejs`);

    const data = {
      attributes: Object.keys(entityDefinition.fields).map((item) => {
        return {
          name: item,
          ...entityDefinition.fields[`${item}`],
        };
      }),
      entityName,
      aditionals: entityDefinition.aditionals,
    };

    [
      {
        template: formTemplate,
        fileToBeGenerated: generatedEntityForm,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the form component \n${generatedEntityForm}\n`,
        ],
      },
      {
        template: filterTemplate,
        fileToBeGenerated: generatedFilter,
        generate: entityDefinition.aditionals.includes('filter'),
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the filter component \n${generatedFilter}\n`,
        ],
      },
      {
        template: listTemplate,
        fileToBeGenerated: generatedEntityList,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the list component \n${generatedEntityList}\n`,
        ],
      },
      {
        template: apiTemplate,
        fileToBeGenerated: generatedEntityApi,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the service file \n${generatedEntityApi}\n`,
        ],
      },
      {
        template: actionTemplate,
        fileToBeGenerated: generatedEntityAction,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the action \n${generatedEntityAction}\n`,
        ],
      },
      {
        template: storeIndexTemplate,
        fileToBeGenerated: generatedStoreIndex,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the store index \n${generatedStoreIndex}\n`,
        ],
      },
      {
        template: CrudIndexTemplate,
        fileToBeGenerated: generatedEntityCrudIndex,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the crud index template \n${generatedEntityCrudIndex}\n`,
        ],
      },
      {
        template: routesTemplate,
        fileToBeGenerated: generatedRoutes,
        generate: true,
        logs: [
          `${chalk.bgBlue(
            "[Note]: "
          )} location of the routes.js \n${generatedRoutes}\n`,
        ],
      },
    ]
    .filter(item => item.generate)
    .forEach(({ template, fileToBeGenerated, logs }) => {
      ejs.renderFile(template, data, options, function (err, str) {
        if (err) throw err;
        fs.ensureFileSync(fileToBeGenerated);
        fs.outputFileSync(fileToBeGenerated, str);
        logs.forEach((log) => {
          console.log(log);
        });
      });
    });

    // extra files that has no template
    fs.outputFileSync(
      generatedTemplateIndex,
      "export { default as routes } from './routes'\n"
    );

    await sleep(1000);
    const spinner = createSpinner(
      "generating templates, store and service files...\n\n"
    ).start();
    await sleep(1000);
    spinner.success({
      text: `templates, store and service files are generated successfully!!`,
    });

    console.log(
      `\n${chalk.bgBlue(
        "[Note]: "
      )} please add your module into routes.js and run: \nnpm run lint:fix \n`
    );
  } catch (err) {
    console.error(err);
  }
};

main();
