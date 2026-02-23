import { useState, useEffect, useCallback } from 'react';
import type { FilterState } from './useGalleryFilters';

export interface NasaImageItem {
    nasa_id: string;
    title: string;
    description: string;
    date_created: string;
    keywords: string[];
    imageUrl: string;
    source: 'NasaImageAPI' | 'APOD';
}

interface NasaResponse {
    collection: {
        items: Array<{
            data: Array<{
                nasa_id: string;
                title: string;
                description: string;
                date_created: string;
                keywords?: string[];
            }>;
            links?: Array<{
                href: string;
                render?: string;
            }>;
        }>;
    };
}

interface ApodResponse {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

const APOD_API_KEY = import.meta.env.VITE_APOD_API_KEY || 'DEMO_KEY';

export function useNasaData(filters: FilterState) {
    const [images, setImages] = useState<NasaImageItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Reset pagination when filters change
    useEffect(() => {
        setImages([]);
        setPage(1);
        setHasMore(true);
    }, [filters]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!hasMore && page > 1) return;
            setLoading(true);
            setError(null);

            try {
                let fetchedItems: NasaImageItem[] = [];
                const isApodSearch = filters.query.toLowerCase().includes('apod');

                if (isApodSearch || (filters.query === 'space' && page === 1)) {
                    // Fetch APOD
                    const apodResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${APOD_API_KEY}&count=20`);
                    if (!apodResponse.ok) throw new Error('Failed to fetch APOD');

                    const apodData: ApodResponse[] = await apodResponse.json();

                    const newApods = apodData
                        .filter(item => item.media_type === 'image')
                        .map(item => ({
                            nasa_id: `apod-${item.date}`,
                            title: item.title,
                            description: item.explanation,
                            date_created: item.date,
                            keywords: ['APOD', 'Astronomy Picture of the Day'],
                            imageUrl: item.url,
                            source: 'APOD' as const
                        }));
                    fetchedItems = [...fetchedItems, ...newApods];
                }

                if (!isApodSearch) {
                    // Fetch standard NASA Image Library
                    const queryParams = new URLSearchParams({
                        q: filters.query || 'space',
                        media_type: 'image',
                        year_start: filters.yearStart,
                        year_end: filters.yearEnd,
                        page: page.toString(),
                    });

                    filters.dynamicFields.forEach(field => {
                        if (field.key && field.value) {
                            queryParams.append(field.key, field.value);
                        }
                    });

                    const response = await fetch(`https://images-api.nasa.gov/search?${queryParams.toString()}`);
                    if (!response.ok) throw new Error('NASA Image API response was not ok');
                    const data: NasaResponse = await response.json();

                    const newLibItems = data.collection.items
                        .filter(item => item.links?.[0]?.href)
                        .map(item => ({
                            nasa_id: item.data[0].nasa_id,
                            title: item.data[0].title || 'Untitled',
                            description: item.data[0].description || '',
                            date_created: item.data[0].date_created,
                            keywords: item.data[0].keywords || [],
                            imageUrl: item.links![0].href,
                            source: 'NasaImageAPI' as const
                        }));

                    fetchedItems = [...fetchedItems, ...newLibItems];
                    if (newLibItems.length === 0) setHasMore(false);
                }

                if (isMounted) {
                    setImages(prev => {
                        const newItems = fetchedItems.filter(item => !prev.some(p => p.nasa_id === item.nasa_id));
                        return page === 1 ? fetchedItems : [...prev, ...newItems];
                    });

                    if (isApodSearch && fetchedItems.length > 0) {
                        setHasMore(true);
                    }
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || 'An error occurred fetching data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [filters, page]);

    return { images, loading, error, loadMore, hasMore };
}
