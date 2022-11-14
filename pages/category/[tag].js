import Card from '../../components/Card';
import { gql, GraphQLClient } from "graphql-request";
import CategorySection from '../../components/CategorySection';

export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
          "Authorization": process.env.GRAPH_CMS_TOKEN
        }
    });

    const genre = pageContext.query.tag.replace(" ", '-').toLowerCase();
    
    console.log(genre)

    const query = gql`
        query {
            videos(where: {
                tags_contains_all: "${genre}"
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
    const videos = data.videos;

    return {
        props: {
            videos,
            genre
        }
    }
}

const Videos = ({videos, genre}) => {
    let genreUC = genre.replaceAll("-", " ").split(" ");
    let newTitle = "";
    for(let word of genreUC) {
       word = word.split("");
       word[0] = word[0].toUpperCase();
       word = word.join("");
       newTitle += ` ${word}`
    }
    
    return(
        <>
            <head>
                <title>{newTitle}</title>
            </head>
            <CategorySection genre={genre} videos={videos}></CategorySection>
        </>
    )
}

export default Videos;

