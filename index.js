#!/usr/bin/env node
import inquirer from "inquirer";
import fs from 'fs-extra'
import ejs from 'ejs'
import yargsParser from "yargs-parser";
import path from "path";
import * as url from 'url';
import { createSpinner } from "nanospinner";
import chalk from "chalk";


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const argv = yargsParser(process.argv.slice(2))
const workingDir = path.join(process.cwd()) // in developemnt use 'generated'


const entityDefinition = {
  name: "",
  fields: {
    // "name": {
      //   "type": "text", // or number, date etc
      //   "required": true
      // }
    }
  }

  const sleep = (ms=2000) => new Promise((resolve) =>{ setTimeout(resolve, ms)})

  const getEntityName = async () => {
  const answers = await inquirer.prompt({
    name: 'entity_name',
    type: 'text',
    message: "what is the name of the entity?",
    default(){
      return 'entity'
    }
  })
  entityDefinition.name = answers.entity_name
  return entityDefinition
}

const wantTogetMoreFields = async () => {
  const answer = await inquirer.prompt({
    name: 'wantToAddMoreFields',
    type: 'confirm',
    message: 'do you want to add another field?',
    default: true
  })
  return answer.wantToAddMoreFields
}

const getFields = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'name',
      type: 'text',
      message: "what is the name of the field?",
    },
    {
      name: 'type',
      type: 'list',
      message: 'what type is it?',
      choices: [
        'text',
        'number',
        'email',
        'date',
        'password',
      ],
      default: 'text',
    },
    {
      name: 'required',
      type: 'list',
      message: 'is it a required field?',
      choices: [
        'true',
        'false'
      ],
      default: true
    },
  ])
  entityDefinition.fields[`${answers.name}`] = {type: answers.type, required: answers.required === 'true' ? true : false }
  if(await wantTogetMoreFields()){
    await getFields()
  }else{
    return entityDefinition
  }
}

const generateEntityJson = async() => {
  const spinner = createSpinner('generating entity json...').start();
  await sleep()
  try {
    fs.outputFileSync(path.join(workingDir,`./entities/${entityDefinition.name}.json`), JSON.stringify(entityDefinition.fields))
    spinner.success({
      text:`entity json is generated successfully!!\n\n`
    })
    console.log(`${chalk.bgBlue('[Note]: ')} location of the entity file \n${path.join(workingDir,`./entities/${entityDefinition.name}.json`)}\n`)
  } catch (error) {
    console.error(error)
  }
}

const greetings = async () => {
  console.clear()
  const ascii =
    `
    #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.
    %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.
    %@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@.
    %@@@@@@@@@@%*+-.          ....::
    %@@@@@@@@@@@%%##**++==-::..            *# *######-     -+=+=   :+++=   .=:   =   .=++=:   =    -: .=====. .=+++:.=======
    %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.      %@   .@%      .%-   .. %+   :%- -%%-  @. =%:  .** .@    *= :@      @-   .   .@
    %@@@@@#+-. .::-==+**#%%@@@@@@@@@.      %@   .@%      **      -@     +# -# %= @. @-     @..@    *= :@++++  =***=.   .@
    %@@@@%#*+=-:.             ..:-#@.      %@   .@%      =%      .@:    #+ -#  #=@. #*    -% .@    %= :@          =@   .@
    %@@@@@@@@@@@@@@#*+=-:.    .=#@@@.      #%   .%#       -*++++: .*+++*=  -*   #@.  +*++#*.  -*++*+  :@++++: *+++*=   .@
    ==:   .-=+#%@@@@@@@@@@@@%%@@@@@@.                                                    ==
    *+-.         .:-+*#@@@@@@@@@@@@@.
    %@@@@#+-.            -#@@@@@@@@@.
    %@@@@@@@@@#+-.   :+#@@@@@@@@@@@@.
    %@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@#
    %@@@@@@@@@@@@@@@@@@@@@@@@@@@@#:
    %@@@@@@@@@@@@@@@@@@@@@@@@@@#:

    `
  console.log(ascii)
}


const main = async () => {
  await greetings()
  await sleep(1000)
  await getEntityName()
  await getFields()
  await generateEntityJson()

  try {
    const options = {}
      const entityJsonFile = path.join(workingDir, `./entities/${entityDefinition.name}.json`)
      const entityName = path.parse(entityJsonFile).name

      const generatedEntityForm = path.join(workingDir, `./src/modules/${entityName}s/components/${entityName.charAt(0).toUpperCase()}${entityName.slice(1)}Form.vue`)
      const generatedEntityList = path.join(workingDir, `./src/modules/${entityName}s/components/${entityName.charAt(0).toUpperCase()}${entityName.slice(1)}List.vue`)
      const generatedEntityCrudIndex = path.join(workingDir, `./src/modules/${entityName}s/pages/${entityName.charAt(0).toUpperCase()}${entityName.slice(1)}Index.vue`)
      const generatedEntityApi = path.join(workingDir, `./src/services/${entityName}Service.js`)
      const generatedEntityAction = path.join(workingDir, `./src/stores/${entityName}-store/actions.js`)
      const generatedStoreIndex = path.join(workingDir, `./src/stores/${entityName}-store/index.js`)
      const generatedRoutes = path.join(workingDir, `./src/modules/${entityName}s/routes.js`)
      const generatedTemplateIndex = path.join(workingDir, `./src/modules/${entityName}s/index.js`)

      const formTemplate = path.join(__dirname, `./templates/form.ejs`)
      const listTemplate = path.join(__dirname, `./templates/list.ejs`)
      const apiTemplate = path.join(__dirname, `./templates/api.ejs`)
      const actionTemplate = path.join(__dirname, `./templates/actions.ejs`)
      const storeIndexTemplate = path.join(__dirname, `./templates/storeIndex.ejs`)
      const CrudIndexTemplate = path.join(__dirname, `./templates/crudIndex.ejs`)
      const routesTemplate = path.join(__dirname, `./templates/routes.ejs`)

      fs.readFile(entityJsonFile, "utf8", function (err, fileContent) {
        const parsedFileContent = JSON.parse(fileContent)
        const data = {
          attributes: Object.keys(parsedFileContent).map(item => {
            // console.log('callweoif',{name: item,
            //   ...parsedFileContent[`${item}`]}, parsedFileContent);
            return {
                name: item,
                ...parsedFileContent[`${item}`]
            }
          }),
          entityName
        }

        if (err) throw err;

        // form generation
        ejs.renderFile(formTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityForm)
          fs.outputFileSync(generatedEntityForm, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the form component \n${generatedEntityForm}\n`)
        })
        ejs.renderFile(listTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityList)
          fs.outputFileSync(generatedEntityList, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the list component \n${generatedEntityList}\n`)
        })
        ejs.renderFile(apiTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityApi)
          fs.outputFileSync(generatedEntityApi, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the service file \n${generatedEntityApi}\n`)
        })
        ejs.renderFile(actionTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityAction)
          fs.outputFileSync(generatedEntityAction, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the action \n${generatedEntityAction}\n`)
        })
        ejs.renderFile(storeIndexTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedStoreIndex)
          fs.outputFileSync(generatedStoreIndex, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the store index \n${generatedStoreIndex}\n`)
        })
        ejs.renderFile(CrudIndexTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityCrudIndex)
          fs.outputFileSync(generatedEntityCrudIndex, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the crud index template \n${generatedEntityCrudIndex}\n`)
        })
        ejs.renderFile(routesTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedRoutes)
          fs.outputFileSync(generatedRoutes, str)
          console.log(`${chalk.bgBlue('[Note]: ')} location of the routes.js \n${generatedRoutes}\n`)
        })
        fs.outputFileSync(generatedTemplateIndex,'export { default as routes } from \'./routes\'\n')
      })
      await sleep(1000)
      const spinner = createSpinner('generating templates, store and service files...\n\n').start();
      await sleep(1000)
      spinner.success({
        text:`templates, store and service files are generated successfully!!`
      })

      console.log(`\n${chalk.bgBlue('[Note]: ')} please add your module into routes.js and run: \nnpm run lint:fix \n`)
  } catch (err) {
    console.error(err)
  }
}

main()
