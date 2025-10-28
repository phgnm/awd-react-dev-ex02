import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhotoById } from "../api/photosApi";


function PhotoDetail() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPhoto = async () => {
            try {
                const photo = await fetchPhotoById(photoId);
                setPhoto(photo);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadPhoto();
    }, [photoId]);

    if (loading) {
        return <div className="p-6 text-center">Loading photo details...</div>;
    }

    if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        {error}
        <Link to="/photos" className="mt-4 text-blue-500 underline">
          ← Back to gallery
        </Link>
      </div>
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            {/* Blurry background */}
            <img
                src={photo.download_url}
                alt={photo.author}
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-lg"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                <img
                    src={photo.download_url}
                    alt={photo.author}
                    className="max-h-[70vh] object-contain rounded-xl shadow-2xl mb-8 transition-transform hover:scale-105 duration-500"
                />
                <h1 className="text-2xl font-bold">{photo.author}</h1>
                <p classname="text-gray-400 mt-2">Photo ID: {photo.id}</p>
                <div className="flex gap-4 mt-6">
                    <a
                        href={photo.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow"
                    >
                        Download Photo
                    </a>
                    <Link
                        to="/photos"
                        className="border border-white/40 hover:border-white transition px-4 py-2 rounded-lg text-sm"
                    >
                        ← Back
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PhotoDetail;
