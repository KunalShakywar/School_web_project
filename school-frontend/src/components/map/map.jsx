import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
    return (
        <div style={{ height: "400px", width: "100%" }}>    
<MapContainer center={[23.2599, 77.4126]} zoom={13} style={{ height: "400px" }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
</MapContainer>
</div>  );
}
export default Map;s