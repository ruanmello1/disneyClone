import { gql, GraphQLClient } from "graphql-request";
import { useState } from "react";
import Link from 'next/link';

export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
          "Authorization": process.env.GRAPH_CMS_TOKEN
        }
    });

    const pageSlug = pageContext.query.slug;

    const query = gql`
        query {
            video(where: {
                slug: "${pageSlug}"
            }) {
            createdAt,
            id,
            title,
            description,
            seen,
            slug,
            tags,
            thumbnail {
                url
            },
            mp4 {
                url
            }
            }
        }
    `

    const data = await graphQLClient.request(query);
    const video = data.video;

    return {
        props: {
            video
        }
    }
}

const changeToSeen = async (slug) => {
    await fetch('/api/changeToSeen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({slug})
    })
}

const Video = ({video}) => {
    const [watching, setWatching] = useState(false);
    console.log(video)

    let videoSlug = video.slug.replaceAll("-", " ").split(" ");
    let newTitle = "";
    for(let word of videoSlug) {
       word = word.split("");
       word[0] = word[0].toUpperCase();
       word = word.join("");
       newTitle += ` ${word}`
    }

    return (
        <>
            <title>{newTitle}</title>
            
            {!watching && <img className="video-image" src={video.thumbnail.url} alt={video.title} />}
            {!watching && <div className="info">
                <p>{(video.tags.join(" | ")).toUpperCase()}</p>
                <p>{video.description}</p>
                <div className="video-overlay">
                    <button                        
                        onClick={() => {
                            changeToSeen(video.slug)
                            watching ? setWatching(false) : setWatching(true);
                        }}
                    >PLAY</button>
                    <Link href="/"><button>Go back</button></Link>                
                </div>
            </div>
            }
            {watching && (
                <video width="100%" controls className="video">
                    
                    <source src={video.mp4.url} type="video/mp4" />
                    
                </video>
            )}
            {watching && <div><button className="info-footer" onClick={() => watching ? setWatching(false) : null}>Go back</button></div>}
        </>
    )
}

export default Video;