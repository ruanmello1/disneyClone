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

    const genre = pageContext.query.tag.toLowerCase();
    
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
    return(
        <CategorySection genre={genre} videos={videos}></CategorySection>
    )
}

export default Videos;

