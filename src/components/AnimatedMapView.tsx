import moment from 'moment';
import 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import './AnimatedMapView.scss';
import {Sample, TimelineItem} from '../interfaces/ArcData';
import {MapView} from './MapView';

export const AnimatedMapView: React.FC<{data: Array<TimelineItem>}> = ({data}: {
    data: Array<TimelineItem>;
}) => {
    (window as typeof window & {arc: Array<TimelineItem>}).arc = data;

    const {t} = useTranslation('mapview', {useSuspense: false});
    const [filteredData, setFilteredData] = useState<Array<TimelineItem>>([]);
    const [allSamples, setAllSamples] = useState<Array<Sample>>([]);
    const [animationPaused, setPause] = useState(true);
    const [maxVal, setMaxVal] = useState<number>(0);
    const [frameRate, setFrameRate] = useState(33);
    const [increment, setIncrement] = useState(50);
    const [hiddenControls, setHiddenControls] = useState(false);

    const [rangeVal, setRangeVal] = useState<number>(0);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'h') {
                setHiddenControls(!hiddenControls);
            } else if (e.key === ' ') {
                setPause(!animationPaused);
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, [animationPaused, hiddenControls]);

    useEffect(() => {
        if (!animationPaused) {
            setTimeout(() => {
                if (rangeVal + increment >= maxVal) {
                    setRangeVal(0);
                } else {
                    setRangeVal(rangeVal + increment);
                }
            }, frameRate);
        }
    }, [rangeVal, animationPaused, frameRate, increment, maxVal]);

    useEffect(() => {
        console.log(data);
        if (data.length > 0) {
            setFilteredData(data);
            const newMaxVal =
                data.filter((d) => !d.place).reduce((p, c) => p + (c.samples?.length ?? 0), 0) - 1;
            setMaxVal(newMaxVal);
            setRangeVal(newMaxVal);
            setAllSamples(
                data
                    .filter((d) => !d.place)
                    .flatMap((m) => m.samples ?? []),
            );
        }
    }, [data]);

    useEffect(() => {
        let counter = 0;
        setFilteredData(
            data
                .filter((d) => !d.place)
                .map((d) => {
                    const counterBefore = counter;
                    counter += d.samples?.length ?? 0;
                    if (rangeVal > counter) {
                        return d;
                    }
                    const idx = rangeVal - counterBefore;
                    if (idx > (d.samples?.length ?? 0)) {
                        return {...d, samples: []};
                    }

                    return {...d, samples: d.samples?.filter((s, i) => i < idx) ?? []};

                }),
        );
    }, [rangeVal, data]);

    const handleOnClick = () => {
        setPause(!animationPaused);

        return false;
    };

    return (
        <div className="App">
            <div className="controls" style={{display: hiddenControls ? 'none' : 'block'}}>
                <table>
                    <thead/>
                    <tbody>
                    <tr>
                        <td>{t('animation.frames_per_second')}:</td>
                        <td>
                            <input
                                type="range"
                                min={17}
                                max={1000}
                                value={frameRate}
                                disabled={!animationPaused}
                                onChange={(e) => setFrameRate(Number.parseInt(e.target.value, 10))}
                            />
                        </td>
                        <td>{Math.round(1000 / frameRate)}</td>
                    </tr>
                    <tr>
                        <td>{t('animation.sample_increment_per_frame')}:</td>
                        <td>
                            <input
                                type="range"
                                min={1}
                                max={2000}
                                value={increment}
                                disabled={!animationPaused}
                                onChange={(e) => setIncrement(Number.parseInt(e.target.value, 10))}
                            />
                        </td>
                        <td>{increment}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <button className="button" onClick={handleOnClick} type="button">
                                {animationPaused ? t('animation.play') : t('animation.pause')}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>{t('animation.info')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="timeline" style={{display: hiddenControls ? 'none' : 'block'}}>
                <div className="currentDate">
                    {moment(allSamples[rangeVal]?.date).format('dddd, DD.MM.YYYY HH:mm')} -{' '}
                    {moment(allSamples[rangeVal]?.date).valueOf()} -{' '}
                    {moment(allSamples[rangeVal]?.date).toISOString()}
                </div>
                {/* {renderActivityTimeline()} */}
                {/* <ActivityTimeline data={data} /> */}
                <input
                    type="range"
                    min={0}
                    max={maxVal}
                    value={rangeVal}
                    disabled={!animationPaused}
                    onChange={(e) => setRangeVal(Number.parseInt(e.target.value, 10))}
                />
                <div className="date-range">
                    <p>{moment(allSamples[0]?.date).format('DD.MM.YYYY')}</p>
                    <p>{t('sample_1_to_x_of_y', {x: rangeVal + 1, y: maxVal + 1})}</p>
                    <p>{moment(allSamples[allSamples.length - 1]?.date).format('DD.MM.YYYY')}</p>
                </div>
            </div>
            <MapView data={filteredData}/>
        </div>
    );
};
