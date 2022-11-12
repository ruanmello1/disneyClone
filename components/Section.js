import Link from "next/link";
import Card from "./Card";

const Section = ({genre, videos}) => {
    const url = `/category/${((genre)).toLowerCase()}`

    return (
        <div className="section">
            <Link href={url}><h3>{genre}</h3></Link>
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

export default Section;