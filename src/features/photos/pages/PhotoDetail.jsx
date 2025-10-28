import { useParams } from "react-router-dom";

function PhotoDetail() {
    const { photoId } = useParams();

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Photo Detail</h1>
            <p className="text-gray-500">Details for photo ID: {photoId}</p>
        </div>
    );
}

export default PhotoDetail;
