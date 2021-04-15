import { json } from 'express'
import got, { GotReturn } from 'got'
import { Agency, Feed, Routes, ShapePoints } from './interfaces'

async function addFeed(url, feed: Feed) {
  const feedData: Feed = {
    id: feed.id,
    publisherName: feed.publisherName,
    publisherUrl: feed.publisherUrl,
    lang: feed.lang,
    version: feed.version,
    startDate: feed.startDate,
    endDate: feed.endDate,
  }
  try {
    await got.get(`${url}/${feed.id}`)
    await got.put(`${url}/${feed.id}`, {
      json: feedData,
    })
  } catch (err) {
    await got.post(url, {
      json: { feedData },
      responseType: 'json',
    })
    await got.get(`${url}/${feed.id}`)
  }
}

async function addAgency(parsedFile: Agency[], url, feedId) {
  for (const obj of parsedFile) {
    const agencyData = {
      id: obj.agency_id,
      feedId: feedId,
      name: obj.agency_name,
      url: obj.agency_url,
      timezone: obj.agency_timezone,
      lang: obj.agency_lang,
      phone: obj.agency_phone,
      fareUrl: obj.agency_fare_url,
      email: obj.agency_email,
    }
    try {
      await got.get(`${url}/${obj.agency_id}`)
      await got.put(`${url}/${obj.agency_id}`, {
        json: agencyData,
      })
    } catch (err) {
      console.log(obj)
      await got.post(url, {
        json: agencyData,
      })
    }
  }
}

async function addRoute(parsedFile: Routes[], url, feedId) {
  for (const obj of parsedFile) {
    const routeData = {
      id: obj.route_id,
      feedId: feedId,
      agencyId: obj.agency_id,
      shortName: obj.route_short_name,
      longName: obj.route_long_name,
      desc: obj.route_desc,
      type: parseInt(obj.route_type),
      url: obj.route_url,
      color: obj.route_color,
      textColor: obj.route_text_color,
    }
    try {
      obj.route_type = parseInt(obj.route_type)
      await got.get(`${url}/${obj.route_id}/${obj.agency_id}/${feedId}`)
      await got.put(`${url}/${obj.route_id}/${obj.agency_id}/${feedId}`, {
        json: routeData,
      })
    } catch (err) {
      console.log(obj)
      await got.post(url, {
        json: routeData,
      })
    }
  }
}

async function addShapes(parsedFile: ShapePoints[], url, feedId) {
  for (const obj of parsedFile) {
    const shapeData = {
      id: obj.shape_id,
      feedId: feedId,
    }
    try {
      await got.get(`${url}/${obj.shape_id}/${feedId}`)

      await got.put(`${url}/${obj.shape_id}/${feedId}`, {
        json: shapeData,
      })
    } catch (err) {
      console.log(obj)
      await got.post(url, {
        json: shapeData,
      })
    }
  }
}

async function addShapePoints(parsedFile: ShapePoints[], url, feedId) {
  for (const obj of parsedFile) {
    const shapePointData = {
      shapeId: obj.shape_id,
      feedId: feedId,
      lat: obj.shape_pt_lat,
      long: obj.shape_pt_lon,
      sequence: obj.shape_pt_sequence,
      shapeDistTraveled: obj.shape_dist_traveled,
    }
    try {
      // await got.get(`${url}/${obj.shape_pt_lat}/${obj.shape_pt_lon}`)
      await got.post(url, {
        json: shapePointData,
      })
    } catch (err) {
      await got.put(`${url}/${obj.shape_pt_lat}/${obj.shape_pt_lon}`, {
        json: shapePointData,
      })
    }
  }
}
export { addFeed, addAgency, addRoute, addShapes, addShapePoints }
