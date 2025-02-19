

import tmdbApi from "@/api/tmdbApi";
import Navbar from "./Navbar";
import Row from "./Row";
import Banner from "./Banner";


export default function HomeScreen() {
  return (
    <div className="bg-[#111]">
      <Navbar/>
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={tmdbApi.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={tmdbApi.fetchTrending} />
      <Row title="Top Rated" fetchUrl={tmdbApi.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={tmdbApi.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={tmdbApi.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={tmdbApi.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={tmdbApi.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={tmdbApi.fetchDocumentMovies} />
    </div>
  );
}