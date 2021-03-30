import got from 'got'

interface Agency {
  agency_id
  agency_name
  agency_url
  agency_timezone
  agency_lang
  agency_phone
  agency_fare_url
  agency_email
}

async function addAgency(parsedFile, url, feedId) {
  parsedFile.forEach(async (obj: Agency) => {
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
  })
}
