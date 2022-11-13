/* eslint-disable @next/next/no-img-element */
import {gql, GraphQLClient} from "graphql-request";
import Link from "next/link";
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Section from '../components/Section';
import RecommendedSection from '../components/RecommendedSection';
import disney from '../public/disney-button.png';
import marvel from '../public/marvel-button.png';
import natgeo from '../public/natgeo-button.png';
import pixar from '../public/pixar-button.png';
import starwars from '../public/starwars-button.png';
import whatif from '../public/what-if.png';
import marvelimg from '../public/marvel.png';

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })

  const videosQuery = gql `
    query Videos {
      videos (first: 500) {
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

  const accountQuery = gql`
    query {
      account(where: {id: "clac2j4wu3k8p0alzos0r4qtc"}) {
        username,
        avatar {
          url
        }    
      }
    }
  `

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account
    }
  };
}

const Home = ({videos, account}) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null);
  }

  return (
    <>
    <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <Image src={marvelimg}
            alt={""}/>          
        </div>

        <section className="video-feed">
          <div className="franchise">
             <Link href="#disney">            
                <Image src={disney} alt="Disney logo"/>           
              </Link>
            </div>

            <div className="franchise">
              <Link href="#pixar">            
                <Image src={pixar} alt="Pixar logo"/>           
              </Link>
            </div>

            <div className="franchise" >
             <a href="#star-wars">            
                <Image src={starwars} alt="Star wars logo"/>           
              </a>
            </div>

            <div className="franchise">
              <Link href="#nat-geo">            
                <Image src={natgeo} alt="National Geographic logo"/>           
              </Link>
            </div>

            <div className="franchise">
            <Link href="#marvel">            
                <Image src={marvel} alt="Marvel logo"/>           
              </Link>
            </div>
        </section>

        <RecommendedSection genre={"Recommended for you"} videos={unSeenVideos(videos)}/>
        <Section genre={"Family"} videos={filterVideos(videos, "family")}/>
        <Section genre={"Thriller"} videos={filterVideos(videos, "thriller")}/>
        <Section genre={"Classic"} videos={filterVideos(videos, "classic")}/>
        <div id="disney">
          <Section genre={"Disney"} videos={filterVideos(videos, "disney")}/>
        </div>
        
        <div id="pixar">
          <Section  className={"pixar"} genre={"Pixar"} videos={filterVideos(videos, "pixar")}/>
        </div>

        <div id="star-wars">
          <Section genre={"Star Wars"} videos={filterVideos(videos, "star-wars")}/>
        </div>

        <div id="nat-geo">
          <Section genre={"National Geographic"} videos={filterVideos(videos, "national-geographic")}/>
        </div>

        <div id="marvel">
          <Section genre={"Marvel"} videos={filterVideos(videos, "marvel")}/>
        </div>
        
      </div>
      
    </>
  )
}

export default Home;