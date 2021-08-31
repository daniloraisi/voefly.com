import { createMap, createMarkers } from "@/lib/map"
import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const { data } = useSWR("/api/flying", fetcher, { refreshInterval: 60000 })

  useEffect(() => {
    if (map.current) return
    map.current = createMap(mapContainer.current!)
  })

  useEffect(() => {
    createMarkers(map.current!, data)
  }, [data])

  return (
    <div ref={mapContainer} className="container" style={{ height: 768 }}></div>
  )
}

export default Map
