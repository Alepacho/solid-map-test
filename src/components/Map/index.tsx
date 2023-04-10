import type { Component } from "solid-js";
import { For, createSignal, splitProps, children } from "solid-js";

import { Box, Container, IconButton } from '@hope-ui/solid';

import MapGL, { Viewport, Light, Layer, Control, Popup, Marker, Draw, Source } from "solid-map-gl";
import * as maplibre from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import styles from "./style.module.css";
import { Point } from "../../types/Point";
import { useStore } from "../../store";
interface MapProps {
    isAddingPoint?: boolean
    onAddPoint?: (data: any) => void
    children?: any
}

const Map: Component<MapProps> = (props) => {
    const { points } = useStore();
    const [local, others] = splitProps(props, ["isAddingPoint", "onAddPoint"]);
    const c = children(() => props.children);

    // const [local, others] = splitProps(props, ["children"]);

    const [viewport, setViewport] = createSignal({
		center: [131.91, 43.11],
		// {"lng":131.88978226355096,"lat":43.12636128786147}
		zoom: 12,
	} as Viewport);

    const handleClickMap = (e: maplibre.MapMouseEvent) => {
        console.log("e", e);
        if (local.isAddingPoint) {
            if (local.onAddPoint) local.onAddPoint(e.lngLat);
        }
    }

    const getLineData = () => {
        const coordinates = points.map((p, i) => [p.lng, p.lat]);
        // console.log({coordinates})
        const data = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coordinates,
            },
        };
        return data;
    }

    return <MapGL
        cursorStyle={local.isAddingPoint ? "pointer" : undefined}
        mapLib={maplibre} // <- Pass MapLibre package here
        options={{
            style: import.meta.env.VITE_MAP_STYLE,
            language: "ru"
        }}
        // options={{ style: 'https://demotiles.maplibre.org/style.json' }}
        viewport={viewport()}
        onViewportChange={(evt: Viewport) => setViewport(evt)}
        // style={{ "position": "static" }}
        // style={{ "z-index": "-1" }}
        class={styles.Map}
        onClick={(e) => handleClickMap(e)}
    >   
        <Control type="navigation" position="top-right" />
        {/* <Control type="fullscreen" position="top-right" /> */}
        {/* <Layer> */}
            {/* {c()} */}
        {/* </Layer> */}
        
        
        <Source
            source={{
                type: 'geojson',
                data: getLineData(),
            }}
        >
            <Layer
                style={{
                    type: 'line',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#000000',
                        'line-width': 2,
                    },
                }}
            />
        </Source>


        {/* <Marker lngLat={[131.81, 43.11]} options={{ color: '#F00' }}/> */}
        <For each={points}>{(p, i) => 
            <Marker lngLat={[p.lng, p.lat]} options={{ color: '#F00', scale: 0.5 }}/>
        }</For>
    </MapGL>
}

export default Map;