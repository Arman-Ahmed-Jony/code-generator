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

      const generatedEntityForm = path.join(__dirname, `./generated/${entityName}Form.vue`)
      const generatedEntityList = path.join(__dirname, `./generated/${entityName}List.vue`)
      const generatedEntityApi = path.join(__dirname, `./generated/${entityName}Api.js`)

      const formTemplate = path.join(__dirname, `./templates/form.ejs`)
      const listTemplate = path.join(__dirname, `./templates/list.ejs`)
      const ApiTemplate = path.join(__dirname, `./templates/api.ejs`)

      

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
        ejs.renderFile(ApiTemplate, data, options, function (err, str) {
          if (err) throw err;
          fs.ensureFileSync(generatedEntityApi)
          fs.outputFileSync(generatedEntityApi, str)
        })
        
      })
    })

    
  } catch (err) {
    console.error(err)
  }
}

main()