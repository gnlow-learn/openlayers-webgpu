import {
    Map,
    View,
} from "./src/deps.ts"
import { MyLayer } from "./src/MyLayer.ts"

const map = new Map({
    target: "map",
    layers: [
        await MyLayer.from()
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    })
})
