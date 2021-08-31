import mapboxgl, { GeoJSONSource } from "mapbox-gl"
import React from "react"
import ReactDOM from "react-dom"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ""

let selPoints: mapboxgl.LngLatBounds | undefined,
  selMarkers: mapboxgl.Marker[] = []

let selDepMarker: mapboxgl.Marker | undefined,
  selArrMarker: mapboxgl.Marker | undefined,
  selPointsLayer: mapboxgl.Marker | undefined,
  flightMarkers: mapboxgl.Marker[] = [],
  headingIcons: HTMLElement[] = []

const arrIcon = () => {
  const el = document.createElement("div")
  el.className = "marker"
  el.style.backgroundImage = `url(https://dov.voefly.com/lib/images/towerarrival.png)`
  el.style.width = "35px"
  el.style.height = "35px"
  el.style.backgroundSize = "100%"

  return el
}

const depIcon = () => {
  const el = document.createElement("div")
  el.className = "marker"
  el.style.backgroundImage = `url(https://dov.voefly.com/lib/images/towerdeparture.png)`
  el.style.width = "35px"
  el.style.height = "35px"
  el.style.backgroundSize = "100%"

  return el
}

const getHeadingIcon = (heading: number) => {
  if (!(heading in headingIcons)) {
    const el = document.createElement("div")
    el.className = "marker"
    el.style.backgroundImage = `url(https://dov.voefly.com/lib/images/inair/${heading}.png)`
    el.style.width = "35px"
    el.style.height = "35px"
    el.style.backgroundSize = "100%"

    headingIcons[heading] = el
  }

  return headingIcons[heading]
}

const flightInfo = (flight: any) => {
  const div = document.createElement("div")
  const el = React.createElement(
    "span",
    { style: { fontSize: "10px", textAlign: "left", width: "100%" } },
    [
      React.createElement(
        "a",
        { href: "" },
        `${flight.pilotid} - ${flight.pilotname}`
      ),
      React.createElement("br", {}),
      React.createElement("strong", {}, `Flight: ${flight.flightnum}`),
      React.createElement("br", {}),
      `(${flight.depicao} to ${flight.arricao})`,
      React.createElement("br", {}),
      React.createElement("strong", {}, "Status: "),
      flight.phasedetail,
      React.createElement("br", {}),
      React.createElement("strong", {}, "Dist/Time Remain: "),
      `${flight.distremain} miles / ${flight.timeremaining}`,
      React.createElement("br", {}),
    ]
  )

  ReactDOM.render(el, div)

  return div
  //   <span style="font-size: 10px; text-align:left; width: 100%" align="left">
  //   <a href="<?php echo url('/profile/view');?>/<%=flight.pilotid%>"><%=flight.pilotid%> - <%=flight.pilotname%></a><br />
  //   <strong>Flight <%=flight.flightnum%></strong> (<%=flight.depicao%> to <%=flight.arricao%>)<br />
  //   <strong>Status: </strong><%=flight.phasedetail%><br />
  //   <strong>Dist/Time Remain: </strong><%=flight.distremaining%> <?php echo Config::Get('UNITS');?> / <%=flight.timeremaining%><br />
  // </span>
}

const clearSelMarkers = (map: mapboxgl.Map) => {
  if (selDepMarker) {
    selDepMarker.remove()
    selDepMarker = undefined
  }

  if (selArrMarker) {
    selArrMarker.remove()
    selArrMarker = undefined
  }

  if (selPointsLayer) {
    selPointsLayer.remove()
    selPointsLayer = undefined
  }

  for (let i in selMarkers) {
    selMarkers[i].remove()
  }

  selPoints = new mapboxgl.LngLatBounds()
}

const clearMap = () => {
  for (let i in flightMarkers) {
    flightMarkers[i].remove()
  }
}

const flightClick = (flight: any, map: mapboxgl.Map) => {
  clearSelMarkers(map)

  const { lng: depLng, lat: depLat } = flight.depAirport
  const depCoords = new mapboxgl.LngLat(depLng, depLat)
  selDepMarker = new mapboxgl.Marker(depIcon())
    .setLngLat(depCoords)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML("<div>Teste</div>"))
    .addTo(map)

  const { lng: arrLng, lat: arrLat } = flight.arrAirport
  const arrCoords = new mapboxgl.LngLat(arrLng, arrLat)
  selArrMarker = new mapboxgl.Marker(arrIcon())
    .setLngLat(arrCoords)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(""))
    .addTo(map)

  selPoints?.extend(depCoords)
  selPoints?.extend(arrCoords)

  if (map.getSource("route")) {
    ;(<GeoJSONSource>map.getSource("route")).setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [depCoords.lng, depCoords.lat],
          [arrCoords.lng, arrCoords.lat],
        ],
      },
    })
  } else {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [depCoords.lng, depCoords.lat],
            [arrCoords.lng, arrCoords.lat],
          ],
        },
      },
    })
  }

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: { "line-cap": "round" },
    paint: {
      "line-color": "#007296",
      "line-width": 4,
    },
  })

  map.fitBounds(selPoints!, { padding: 100 })
}

const createMap = (mapContainer: HTMLElement) => {
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-43.2532, -22.8072],
    zoom: 9,
    scrollZoom: false,
  })
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }))

  return map
}

const createMarkers = (map: mapboxgl.Map, data?: any) => {
  clearMap()

  if (!data) return

  const bounds = new mapboxgl.LngLatBounds()

  data.forEach((flight: any) => {
    const pos = new mapboxgl.LngLat(flight.lng, flight.lat)
    const marker = new mapboxgl.Marker(getHeadingIcon(flight.heading))
      .setLngLat(pos)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setDOMContent(flightInfo(flight))
      )
      .addTo(map)

    marker
      .getElement()
      .addEventListener("click", () => flightClick(flight, map))

    flightMarkers.push(marker)
    bounds.extend(pos)
  })

  map.fitBounds(bounds, { padding: 100 })
}

export { createMap, createMarkers }
