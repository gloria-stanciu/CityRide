import * as fsp from 'fs/promises'
import fs from 'fs'
import path from 'path'
import extract from 'extract-zip'
import csv from 'csv-parse/lib/sync'
import got from 'got'
import { addFeed, addAgency, addRoute, addShapePoints } from './filesAPIRequest'

require('dotenv').config()

function readCSV(file) {
  try {
    const parsed = csv(file, {
      columns: true,
      cast: function (value, context) {
        if (value === '') {
          return null
        } else {
          return value
        }
      },
    })
    return parsed
  } catch (err) {
    console.log(`readCSV error \n ${err}`)
  }
}

async function getParsedFile(unzipedFolder, filePath) {
  try {
    let absolutePathFile = path.resolve(unzipedFolder, filePath)
    const stringifiedFile = await fsp.readFile(absolutePathFile)
    // const parsedFile = readCSV(stringifiedFile)
    return stringifiedFile
  } catch (err) {
    console.log(`getParsedFile error \n ${err}`)
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
    console.log(`Extract ZIP error \n ${err}`)
  }
}

async function main() {
  // try {
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

  // const feed = {
  //   id: 'id1',
  //   publisherName: 'publisherName',
  //   publisherUrl: 'publisherUrl',
  //   lang: 'lang',
  //   version: 'version',
  //   startDate: '2020.01.01',
  //   endDate: '2020.01.01',
  // }
  // await addFeed(`${process.env.URL_BACKEND_APP}/feeds`, feed)
  try {
    const agencyStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.agencies.path
    )
    const agencyParsedFile = readCSV(agencyStringifiedFile)
    await addAgency(agencyParsedFile, dataset.agencies.url, 'id1')
  } catch (error) {
    console.log(`Agency error\n ${error}`)
  }

  try {
    const routeStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.routes.path
    )
    const routeParsedFile = readCSV(routeStringifiedFile)
    await addRoute(routeParsedFile, dataset.routes.url, 'id1')
  } catch (error) {
    console.log(`Route error\n ${error}`)
  }

  try {
    const shapePointsStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.shapePoints.path
    )

    const shapePointsParsedFile = readCSV(shapePointsStringifiedFile)

    // console.time('Benchmark for adding routes and shape points')
    await addShapePoints(shapePointsParsedFile, dataset.shapePoints.url)
    // console.timeEnd('Benchmark for adding routes and shape points')
  } catch (error) {
    console.log(`Shape Point error\n ${error}`)
  }
  // }
  // catch (err) {
  //   console.log(err)
  // }
}

main()
