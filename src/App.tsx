import React, {FC} from 'react';
import {AnimatedMapView} from './components/AnimatedMapView';
import {DataFetcher} from './components/DataFetcher';

export const App: FC = () => (
    <DataFetcher component={AnimatedMapView} />
);
