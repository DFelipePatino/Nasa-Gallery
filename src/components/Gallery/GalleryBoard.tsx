import React, { useCallback, useMemo, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import type { NasaImageItem } from '../../hooks/useNasaData';
import { ImageCard } from './ImageCard';
import { useElementSize } from '../../hooks/useElementSize';
import { motion } from 'framer-motion';
import { ImageDetailsModal } from './ImageDetailsModal';

interface GalleryBoardProps {
    images: NasaImageItem[];
    loading: boolean;
    hasMore: boolean;
    loadMore: () => void;
    isSearchExpanded: boolean;
}

const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 350;

const GalleryBoard: React.FC<GalleryBoardProps> = ({ images, loading, hasMore, loadMore, isSearchExpanded }) => {
    const [ref, size] = useElementSize<HTMLDivElement>();
    const [selectedImage, setSelectedImage] = useState<NasaImageItem | null>(null);

    // Use useMemo for expensive derived dimensions
    const columnCount = useMemo(() => {
        return Math.max(1, Math.floor(size.width / COLUMN_WIDTH));
    }, [size.width]);

    const rowCount = useMemo(() => {
        return Math.ceil(images.length / columnCount) + (hasMore ? 1 : 0);
    }, [images.length, columnCount, hasMore]);

    // Adjust column width to fill available space symmetrically
    const adjustedColumnWidth = useMemo(() => {
        if (columnCount === 0 || size.width === 0) return COLUMN_WIDTH;
        return Math.floor(size.width / columnCount);
    }, [size.width, columnCount]);

    const Cell = useCallback(({ columnIndex, rowIndex, style }: any) => {
        const itemIndex = rowIndex * columnCount + columnIndex;

        // Check if we are at the end to trigger loadMore
        if (itemIndex >= images.length) {
            if (hasMore && !loading && itemIndex === images.length) {
                // We use a timeout to avoid react setState during render warnings
                setTimeout(loadMore, 0);
            }
            return loading && itemIndex === images.length ? (
                <div style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner" />
                </div>
            ) : null;
        }

        const item = images[itemIndex];
        if (!item) return null;

        return <ImageCard item={item} style={style} onClick={setSelectedImage} />;
    }, [images, columnCount, hasMore, loading, loadMore]);

    const height = isSearchExpanded ? '460px' : '670px';

    return (
        <motion.div
            ref={ref}
            className="glass-panel"
            style={{ flex: 1, height: '100%', minHeight: height, overflow: 'hidden', padding: '0.5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {images.length === 0 && !loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <h3>No images found for this search.</h3>
                </div>
            )}
            {size.width > 0 && size.height > 0 && images.length > 0 && (
                <FixedSizeGrid
                    columnCount={columnCount}
                    columnWidth={adjustedColumnWidth}
                    height={size.height - 16} /* account for padding */
                    rowCount={rowCount}
                    rowHeight={ROW_HEIGHT}
                    width={size.width - 16} /* account for padding */
                    style={{ overflowX: 'hidden' }}
                >
                    {Cell as any}
                </FixedSizeGrid>
            )}

            <ImageDetailsModal
                item={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </motion.div>
    );
};

export default GalleryBoard;
