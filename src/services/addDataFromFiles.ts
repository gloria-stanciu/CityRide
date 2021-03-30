import fs from 'fs'
import path from 'path'
import extract from 'extract-zip'
import csv from 'csv-parse'
import assert from 'assert'
require('dotenv').config()

function readCSV(file) {
  try {
    csv(
      file,
      {
        columns: true,
        cast: function (value, context) {
          if (value === '') {
            return undefined
          } else {
            return value
          }
        },
      },
      function (err, records) {
        console.log(records)
        return records
      }
    )
  } catch (err) {
    console.log(err)
  }
}

async function getParsedFile(unzipedFolder, filePath) {
  try {
    // for (const [key, value] of Object.entries(dataset)) {
    let absolutePathFile = path.resolve(unzipedFolder, filePath)
    const stringifiedFile = await fs.readFileSync(absolutePathFile)
    const parsedFile = await readCSV(stringifiedFile)
    // }
  } catch (err) {
    console.log(err)
  }
}

async function extractZip(zipFile) {
  try {
    if (!fs.existsSync(zipFile.split('.').slice(0, -1).join('.'))) {
      await extract(zipFile, {
        dir: zipFile.split('.').slice(0, -1).join('.'),
      })
      console.log('Extraction complete')
    }
    return zipFile.split('.').slice(0, -1).join('.')
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  const unzipedFolder = await extractZip(
    `${process.env.ZIP_PATH}/timisoara.zip`
  )
  const dataset = {
    agencies: {
      path: `${unzipedFolder}/agency.txt`,
      url: `${process.env.URL_BACKEND_APP}/agencies`,
    },
    routes: {
      path: `${unzipedFolder}/routes.txt`,
      url: `${process.env.URL_BACKEND_APP}/routes`,
    },
    trips: {
      path: `${unzipedFolder}/trips.txt`,
      url: `${process.env.URL_BACKEND_APP}/trips`,
    },
    shapePoints: {
      path: `${unzipedFolder}/shapes.txt`,
      url: `${process.env.URL_BACKEND_APP}/shapePoints`,
    },
    calendarDates: {
      path: `${unzipedFolder}/calendar_dates.txt`,
      url: `${process.env.URL_BACKEND_APP}/calendarDates`,
    },
    stops: {
      path: `${unzipedFolder}/stops.txt`,
      url: `${process.env.URL_BACKEND_APP}/stops`,
    },
    stopTimes: {
      path: `${unzipedFolder}/stop_times.txt`,
      url: `${process.env.URL_BACKEND_APP}/stopTimes`,
    },
    transfers: {
      path: `${unzipedFolder}/transfers.txt`,
      url: `${process.env.URL_BACKEND_APP}/transfers`,
    },
  }

  await getParsedFile(unzipedFolder, dataset.agencies.path)
}

main()
