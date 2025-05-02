export const TMDDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzc3ZGM3ZjBhN2U2YjNhM2ZjZDhhYmNlMGViY2Y0ZiIsIm5iZiI6MTc0NjA0ODA4NS42MDUsInN1YiI6IjY4MTI5NDU1ZTg2OWNlMDMxMjU2N2I3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4OnsW5D66iVbiWOPdn3_SrJM-vA3BXvl1-z6AZspC4',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzc3ZGM3ZjBhN2U2YjNhM2ZjZDhhYmNlMGViY2Y0ZiIsIm5iZiI6MTc0NjA0ODA4NS42MDUsInN1YiI6IjY4MTI5NDU1ZTg2OWNlMDMxMjU2N2I3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4OnsW5D66iVbiWOPdn3_SrJM-vA3BXvl1-z6AZspC4'}`
    }
  };
  

  export const fetchMovies = async ({ query }: { query: string }) => {
    try {
      const endpoint = query
        ? `${TMDDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDDB_CONFIG.API_KEY}`
        : `${TMDDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMDDB_CONFIG.API_KEY}`;
  
      console.log("Fetching endpoint:", endpoint); // Debugging endpoint
  
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDDB_CONFIG.headers,
      });
  
      if (!response.ok) {
        console.error("Failed to fetch movies:", response.statusText);
        throw new Error(`Failed to fetch movies ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Movies data:", data); // Log the movie data for debugging
  
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any other errors
      throw error;  // You can handle the error gracefully in the UI
    }
  };

  export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try{
        const response = await fetch(`${TMDDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDDB_CONFIG.API_KEY}`,{
          method: 'GET',
          headers: TMDDB_CONFIG.headers,
        });
        if(!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
