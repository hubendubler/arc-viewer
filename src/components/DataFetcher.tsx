import React, {ComponentType, useCallback, useEffect, useState, VoidFunctionComponent} from 'react';
import {useDropzone} from 'react-dropzone';
import {useTranslation} from 'react-i18next';
import {ArcData, TimelineItem} from '../interfaces/ArcData';
import ArcLogo from '../assets/arc-viewer-logo.png';
import './DataFetcher.scss';

function fetchDataFromURL(urls: string[]) {
    return Promise.all(
        urls.map((u) =>
            fetch(u)
                .then((r) => r.json())
                .then((d) => d.timelineItems)
        )
    ).then(
        (arr) =>
            ({
                timelineItems: arr.flat()
            } as ArcData)
    );
}

function fetchDataFromDrop(acceptedFiles: Array<File>): Promise<TimelineItem[]> {
    return new Promise((resolve, reject) => {
        try {
            const droppedFileData: Array<Promise<ArcData>> = acceptedFiles.map(
                (file) =>
                    new Promise((res, rej) => {
                        const reader = new FileReader();
                        reader.addEventListener('abort', rej);
                        reader.addEventListener('error', rej);
                        reader.addEventListener('load', () => {
                            try {
                                console.timeEnd(`reading file ${file.name}`);
                                console.time(`parsing file ${file.name}`);
                                const data = JSON.parse(reader.result as string);
                                console.timeEnd(`parsing file ${file.name}`);
                                res(data as ArcData);
                            } catch (error) {
                                rej(error);
                            }
                        });
                        reader.readAsText(file);
                        console.time(`reading file ${file.name}`);
                    })
            );
            Promise.all(droppedFileData).then((arcDataSets: Array<ArcData>) => {
                console.time('merging dataset');
                const merged = arcDataSets
                    .flatMap((d) => d.timelineItems);
                console.timeEnd('merging dataset');
                console.time('time to first mapview render');
                resolve(merged);
            });
        } catch (error) {
            reject(error);
        }
    });
}

export interface ComponentWithDataProps {
    data: Array<TimelineItem>
}

export interface DataFetcherProps {
    urls?: Array<string>;
    component: ComponentType<ComponentWithDataProps>;
}

export const DataFetcher: VoidFunctionComponent<DataFetcherProps> = (props) => {
    const {urls, component: ComponentToRender} = props;
    const {t} = useTranslation('data_fetcher');
    const [data, setData] = useState<TimelineItem[]>([]);

    const onDrop = useCallback((acceptedFiles) => {
        fetchDataFromDrop(acceptedFiles).then(setData);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    useEffect(() => {
        if (urls) {
            fetchDataFromURL(urls).then((arcData) => {
                setData(arcData.timelineItems ?? []);
            });
        } else {
            setData([]);
        }
    }, [urls]);

    if (data.length === 0 && !urls) {
        return (
            <div className="page-background">
                <div className="dropzone" {...getRootProps()}>
                    <img src={ArcLogo} alt="" />
                    <h3>{t('welcome')}</h3>
                    <h1>Arc Viewer</h1>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>{t('info_while_dragging')}</p> : <p>{t('info')}</p>}
                </div>
            </div>
        );
    }

    if (data.length === 0 && urls) {
        return (
            <div className="page-background">
                <div className="dropzone">
                    <img src="../assets/arc-viewer-logo.png" alt="" />
                    <h3>{t('welcome')}</h3>
                    <h1>Arc Viewer</h1>
                    <p>{t('loading')}</p>
                </div>
            </div>
        );
    }

    return <ComponentToRender data={data}/>;
};
