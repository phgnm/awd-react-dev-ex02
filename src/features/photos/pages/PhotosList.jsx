import { useEffect, useState} from 'react';
import { fetchPhotos } from '../api/photosApi';
import { Link } from 'react-router-dom';
    
function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const photos = await fetchPhotos();
                setPhotos(photos);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadPhotos();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading photos...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error loading photos: {error.message}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">📷 Photo Gallery</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map(photo => (
                    <Link
                        key={photo.id}
                        to={`/photos/${photo.id}`}
                        className="group block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
                    >
                        <img
                            src={photo.download_url}
                            alt={photo.author}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-2 bg-white text-sm text-gray-700 text-center truncate">
                            {photo.author}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PhotoList