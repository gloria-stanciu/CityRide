import * as fsp from 'fs/promises'
import fs from 'fs'
import path from 'path'
import extract from 'extract-zip'
import csv from 'csv-parse/lib/sync'
import got from 'got'
import {
  addFeed,
  addAgency,
  addRoute,
  addShapePoints,
  addShapes,
} from './filesAPIRequest'
import { Feed } from '../models'

require('dotenv').config()

function readCSV(file) {
  try {
    const parsed = csv(file, {
      columns: true,
      skip_empty_lines: true,
      // cast: function (value, context) {
      //   if (value === '') {
      //     return undefined
      //   } else {
      //     return value
      //   }
      // },
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
  try {
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
      shapes: {
        path: `${unzipedFolder}/shapes.txt`,
        url: `${process.env.URL_BACKEND_APP}/shapes`,
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

    const feed = {
      id: 'feed1',
      publisherName: 'publisherName',
      publisherUrl: 'publisherUrl',
      lang: 'lang',
      version: 'version',
      startDate: '2020.01.01',
      endDate: '2020.01.01',
    }
    await addFeed(`${process.env.URL_BACKEND_APP}/feeds`, feed)

    const agencyStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.agencies.path
    )
    const routeStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.routes.path
    )
    const shapePointsStringifiedFile = await getParsedFile(
      unzipedFolder,
      dataset.shapePoints.path
    )

    const agencyParsedFile = readCSV(agencyStringifiedFile)

    const routeParsedFile = readCSV(routeStringifiedFile)

    const shapePointsParsedFile = readCSV(shapePointsStringifiedFile)

    await addAgency(agencyParsedFile, dataset.agencies.url, feed.id)

    await addRoute(routeParsedFile, dataset.routes.url, feed.id)

    await addShapes(shapePointsParsedFile, dataset.shapes.url, feed.id)

    console.time('Benchmark for adding routes and shape points')

    await addShapePoints(
      shapePointsParsedFile,
      dataset.shapePoints.url,
      feed.id
    )

    console.timeEnd('Benchmark for adding routes and shape points')
  } catch (err) {
    console.log(err)
  }
}

main()
