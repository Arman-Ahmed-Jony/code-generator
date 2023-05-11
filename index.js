#!/usr/bin/env node
const fs = require("fs-extra")
const ejs = require("ejs")
const argv = require("yargs-parser")(process.argv.slice(2))
const path = require("path")

const main = () => {
  console.log("Generating template...")
  try {
    const { _: entities } = argv

    const options = {}
    if (!entities.length>0) {
      console.error("please provide entities that to be generated. :(")
      process.exit(1)
    }

    const entityJsonFiles = entities.map(entity => path.join(__dirname, `./entity/${entity}.json`))

    entityJsonFiles.forEach(entityJsonFile => {
      const entityName = path.parse(entityJsonFile).name

      const generatedEntityForm = path.join(__dirname, `./generated/${entityName}s/components/${entityName}Form.vue`)
      const generatedEntityList = path.join(__dirname, `./generated/${entityName}s/components/${entityName}List.vue`)
      const generatedEntityCrudIndex = path.join(__dirname, `./generated/${entityName}s/pages/${entityName}Index.vue`)
      const generatedEntityApi = path.join(__dirname, `./generated/services/${entityName}Service.js`)
      const generatedEntityAction = path.join(__dirname, `./generated/stores/${entityName}-store/actions.js`)
      const generatedStoreIndex = path.join(__dirname, `./generated/stores/${entityName}-store/index.js`)
      const generatedRoutes = path.join(__dirname, `./generated/${entityName}s/routes.js`)
      const generatedTemplateIndex = path.join(__dirname, `./generated/${entityName}s/index.js`)

      const formTemplate = path.join(__dirname, `./templates/form.ejs`)
      const listTemplate = path.join(__dirname, `./templates/list.ejs`)
      const apiTemplate = path.join(__dirname, `./templates/api.ejs`)
      const actionTemplate = path.join(__dirname, `./templates/actions.ejs`)
      const storeIndexTemplate = path.join(__dirname, `./templates/storeIndex.ejs`)
      const CrudIndexTemplate = path.join(__dirname, `./templates/crudIndex.ejs`)
      const routesTemplate = path.join(__dirname, `./templates/routes.ejs`)



      fs.readFile(entityJsonFile, "utf8", function (err, fileContent) {

        const data = {
          attributes: Object.keys(JSON.parse(fileContent)),
          entityName
        }

        if (err) throw err;

        // form generation
        ejs.renderFile(formTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityForm)
          fs.outputFileSync(generatedEntityForm, str)
        })
        ejs.renderFile(listTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityList)
          fs.outputFileSync(generatedEntityList, str)
        })
        ejs.renderFile(apiTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityApi)
          fs.outputFileSync(generatedEntityApi, str)
        })
        ejs.renderFile(actionTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityAction)
          fs.outputFileSync(generatedEntityAction, str)
        })
        ejs.renderFile(storeIndexTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedStoreIndex)
          fs.outputFileSync(generatedStoreIndex, str)
        })
        ejs.renderFile(CrudIndexTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityCrudIndex)
          fs.outputFileSync(generatedEntityCrudIndex, str)
        })
        ejs.renderFile(routesTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedRoutes)
          fs.outputFileSync(generatedRoutes, str)
        })
        fs.outputFileSync(generatedTemplateIndex,'export { default as routes } from \'./routes\'\n')
      })
    })


  } catch (err) {
    console.error(err)
  }
}

main()
