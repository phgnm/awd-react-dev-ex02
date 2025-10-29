import { useEffect, useState} from 'react';
import { fetchPhotos } from '../api/photosApi';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from '../../../components/SkeletonCard';
    
function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPhotos = async (pageNum) => {
            try {
                const photos = await fetchPhotos(pageNum, 30);
                if (photos.length === 0) {
                    setHasMore(false);
                }
                else {
                    setPhotos(prevPhotos => [...prevPhotos, ...photos]);
                }
            } catch (error) {
                setError(error);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        loadPhotos(1);
    }, []);

    const fetchMorePhotos = () => {
        const nextPage = page + 1;
        loadPhotos(nextPage);
        setPage(nextPage);
    };

    if (error) {
        return <div className="p-8 text-center text-red-500">Error loading photos: {error.message}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                📷 Photo Gallery
            </h1>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (

                <InfiniteScroll
                    dataLength={photos.length}
                    next={fetchMorePhotos}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center py-4 text-gray-500">
                            Loading more photos...
                        </div>
                    }
                    endMessage={
                        <div className="text-center py-6 text-gray-400">
                            Yay! You have seen all the photos.
                        </div>
                    }
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {photos.map(photo => (
                        <Link
                            key={photo.id + Math.random()}
                            to={`/photos/${photo.id}`}
                            className="group block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                        >
                            <img
                                src={photo.download_url}
                                alt={photo.author}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="p-2 bg-white text-sm text-gray-700 text-center truncate">
                                {photo.author}
                            </div>
                        </Link>
                    ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default PhotoList