import Link from "next/link";
import Card from "./Card";

const RecommendedSection = ({genre, videos}) => {
    const url = `/category/${((genre)).toLowerCase()}`

    return (
        <div className="section">
            <h3>{genre}</h3>
            <div>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail}/>
                    </a>
                ))}
            </div>
            
        </div>
    )
}

export default RecommendedSection;