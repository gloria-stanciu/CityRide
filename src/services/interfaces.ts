interface Feed {
  id: string
  publisherName: string | null
  publisherUrl: string | null
  lang: string | null
  version: string | null
  startDate: string | null
  endDate: string | null
}

interface Agency {
  agency_id: string
  agency_name: string
  agency_url: string
  agency_timezone: string
  agency_lang: string | null
  agency_phone: string | null
  agency_fare_url: string | null
  agency_email: string | null
}

interface Routes {
  route_id: string
  agency_id: string
  route_short_name: string | null
  route_long_name: string | null
  route_desc: string | null
  route_type
  route_url: string | null
  route_color: string | null
  route_text_color: string | null
}

interface Trips {
  route_id: string | null
  service_id: string | null
  trip_id: string
  trip_headsign: string | null
  trip_short_name: string | null
  direction_id: number | null
  block_id: string | null
  shape_id: string | null
  wheelchair_accessible: number | null
  bikes_allowed: number | null
}

interface ShapePoints {
  shape_id: string | null
  shape_pt_lat: string
  shape_pt_lon: string
  shape_pt_sequence: string
  shape_dist_traveled: string | null
}

interface CalendarDates {
  service_id: string
  date: Date
  exception_type: number
}

interface Stops {
  stop_id: string
  stop_code: string | null
  stop_name: string | null
  stop_desc: string | null
  stop_lat: string
  stop_lon: string
  zone_id: number | null
  stop_url: string | null
  location_type: number | null
  parent_station: string | null
  stop_timezone: Date | null
  wheelchair_boarding: number | null
}

interface StopTimes {
  trip_id: string
  arrival_time: Date | null
  departure_time: Date | null
  stop_id: string
  stop_sequence: number
  stop_headsign: string | null
  pickup_type: number | null
  drop_off_type: number | null
  timepoint: number | null
  shape_dist_traveled: string | null
}

interface Transfers {
  from_stop_id: string
  to_stop_id: string
  transfer_type: number | null
  min_transfer_time: number | null
}

export {
  Feed,
  Agency,
  Routes,
  Trips,
  ShapePoints,
  CalendarDates,
  Stops,
  StopTimes,
  Transfers,
}
