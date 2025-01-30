import {
    Map,
    View,
    TileLayer,
} from "./src/deps.ts"
import { MyTile } from "./src/MyTile.ts"

new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: await MyTile.from(),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
        projection: "EPSG:4326",
    })
})
