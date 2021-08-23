import {PathLayer, ScatterplotLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import React from 'react';
import {StaticMap} from 'react-map-gl';
import {ActivityType, getActivityColor} from '../interfaces/ActivityType';
import {TimelineItem} from '../interfaces/ArcData';

const initialViewState = {
    // Edinburgh
    longitude: -3.195,
    latitude: 55.94,
    zoom: 13,
};

export const MapView: React.FC<{ data: TimelineItem[] }> = ({data}: { data: TimelineItem[] }) => {
    interface Path {
        color: [number, number, number];
        name: string;
        path: Array<[number, number]>
    }
    const pathData: Array<Path> = data
        .filter((i) => i.activityType && i.samples && i.samples.length > 0)
        .map((item) => ({
            color: getActivityColor(item.activityType as ActivityType)
                .rgb()
                .array() as [number, number, number],
            name: item.startDate,

            path: (item.samples ?? [])
                .filter(
                    (s) =>
                        s &&
                        s.location &&
                        s.location.longitude !== undefined &&
                        s.location.latitude !== undefined,
                )
                .map((sample) => [sample?.location?.longitude, sample?.location?.latitude] as [number, number]),
        }));

    interface Place {
        name: string;
        coordinates: [number, number];
    }
    const places = data
        .filter((i) => i.place)
        .map((i) => ({
            name: i.place?.name ?? 'Stationary',
            coordinates: [i.center.longitude, i.center.latitude],
        }));
    const layers = [
        new PathLayer({
            id: 'path-layer',
            data: pathData,
            rounded: true,
            pickable: true,
            widthScale: 1,
            widthMinPixels: 5,
            getPath: (d) => (d as Path).path,
            getColor: (d) => (d as Path).color,
            getWidth: () => 2,
        }),
        new ScatterplotLayer({
            id: 'scatterplot-layer',
            data: places,
            pickable: true,
            opacity: 0.8,
            stroked: true,
            filled: true,
            radiusScale: 6,
            radiusMinPixels: 1,
            radiusMaxPixels: 8,
            lineWidthMinPixels: 2,
            getPosition: (d) => (d as Place).coordinates,
            getRadius: () => 15,
            getFillColor: () => [0, 69, 202],
            getLineColor: () => [255, 255, 255],
        }),
    ];

    return (
        <DeckGL
            width="100%"
            height="100%"
            initialViewState={initialViewState}
            controller
            layers={layers}
        >
            <StaticMap
                mapStyle="mapbox://styles/mapbox/light-v10"
                width="100%"
                height="100%"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onLoad={() => console.timeEnd('time to first mapview render')}
            />
        </DeckGL>
    );
};
