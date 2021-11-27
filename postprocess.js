import { readJSON, writeCSV, removeFile } from 'https://deno.land/x/flat@0.0.11/mod.ts'

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
await removeFile(filename)

const results = json.results.bindings.map(obj => {
    let flatObj = {}
    Object.keys(obj).forEach(key => {
      flatObj[key] = obj[key].value
    })
    return flatObj
 })

await writeCSV(filename.replace('.json', '.csv'), results)
