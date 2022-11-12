
import Image from "next/image";
import Link from "next/link";
import Card from "./Card";
import back from "../public/arrow.png"

const CategorySection = ({genre, videos}) => {

    return (
        <div>
            <div className="button-section">
                <Link href="/"><Image className="back-image" alt="back image" src={back} /></Link>  
                <h2 className="category-title">{genre.toUpperCase()}</h2>
            </div>
            <div className="category-videos">
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                            <Card thumbnail={video.thumbnail}/>
                    </a>
                ))}
            </div>
            
        </div>
    )
}

export default CategorySection;