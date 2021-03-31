import got from 'got'
import { Agency, Feed, Routes, ShapePoints } from './interfaces'

async function addFeed(url, feed: Feed) {
  try {
    const feedExists = await got.get(`${url}/${feed.id}`)
    if (feedExists != undefined) {
      await got.put(`${url}/${feed.id}`, {
        json: {
          id: feed.id,
          publisherName: feed.publisherName,
          publisherUrl: feed.publisherUrl,
          lang: feed.lang,
          version: feed.version,
          startDate: feed.startDate,
          endDate: feed.endDate,
        },
      })
    } else {
      await got.post(url, {
        json: {
          id: feed.id,
          publisherName: feed.publisherName,
          publisherUrl: feed.publisherUrl,
          lang: feed.lang,
          version: feed.version,
          startDate: feed.startDate,
          endDate: feed.endDate,
        },
        responseType: 'json',
      })
    }
    await got.get(`${url}/${feed.id}`)
  } catch (err) {
    console.log(`addFeed \n ${err}`)
  }
}

async function addAgency(parsedFile, url, feedId) {
  try {
    parsedFile.forEach(async (obj: Agency) => {
      const agencyExists = await got.get(`${url}/${obj.agency_id}`)
      if (agencyExists != undefined) {
        await got.put(`${url}/${obj.agency_id}`, {
          json: {
            id: obj.agency_id,
            feedId: feedId,
            name: obj.agency_name,
            url: obj.agency_url,
            timezone: obj.agency_timezone,
            lang: obj.agency_lang,
            phone: obj.agency_phone,
            fareUrl: obj.agency_fare_url,
            email: obj.agency_email,
          },
        })
      } else {
        await got.post(url, {
          json: {
            id: obj.agency_id,
            feedId: feedId,
            name: obj.agency_name,
            url: obj.agency_url,
            timezone: obj.agency_timezone,
            lang: obj.agency_lang,
            phone: obj.agency_phone,
            fareUrl: obj.agency_fare_url,
            email: obj.agency_email,
          },
          responseType: 'json',
        })
      }
    })
  } catch (err) {
    console.log(`add agency \n ${err}`)
  }
}

async function addRoute(parsedFile, url, feedId) {
  try {
    parsedFile.forEach(async (obj: Routes) => {
      const routeExists = await got.get(
        `${url}/${obj.route_id}/${obj.agency_id}/${feedId}`
      )
      console.log('asta merge')
      if (routeExists != undefined) {
        console.log(routeExists.body)
        await got.put(`${url}/${obj.route_id}/${obj.agency_id}/${feedId}`, {
          json: {
            id: obj.route_id,
            feedId: feedId,
            agencyId: obj.agency_id,
            shortName: obj.route_short_name,
            longName: obj.route_long_name,
            desc: obj.route_desc,
            type: obj.route_type,
            url: obj.route_url,
            color: obj.route_color,
            textColor: obj.route_text_color,
          },
        })
      } else {
        console.log('eu trebuie sa ma vad')
        await got.post(url, {
          json: {
            id: obj.route_id,
            feedId: feedId,
            agencyId: obj.agency_id,
            shortName: obj.route_short_name,
            longName: obj.route_long_name,
            desc: obj.route_desc,
            type: obj.route_type,
            url: obj.route_url,
            color: obj.route_color,
            textColor: obj.route_text_color,
          },
          responseType: 'json',
        })
      }
      console.log('final fara erori')
    })
  } catch (err) {
    console.log(`addRoute \n ${err}`)
  }
}

async function addShapePoints(parsedFile, url) {
  try {
    parsedFile.forEach(async (obj: ShapePoints) => {
      const shapePointExists = await got.get(`${url}/${obj.shape_id}`)
      if (shapePointExists != undefined) {
        await got.put(`${url}/${obj.shape_id}`, {
          json: {
            id: obj.shape_id,
            shapeId: null,
            lat: obj.shape_pt_lat,
            long: obj.shape_pt_lon,
            sequence: obj.shape_pt_sequence,
            shapeDistTraveled: obj.shape_dist_traveled,
          },
        })
      } else {
        await got.post(url, {
          json: {
            id: obj.shape_id,
            shapeId: null,
            lat: obj.shape_pt_lat,
            long: obj.shape_pt_lon,
            sequence: obj.shape_pt_sequence,
            shapeDistTraveled: obj.shape_dist_traveled,
          },
          responseType: 'json',
        })
      }
    })
  } catch (err) {
    console.log(`addShapePoints \n ${err}`)
  }
}
export { addFeed, addAgency, addRoute, addShapePoints }
