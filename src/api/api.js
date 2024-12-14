import axios from "axios"; 

const API_URL = 'http://localhost:5000/api';


export const fetchRandomJoke = async () => {
  try {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json', 
        'User-Agent': 'My Joke App (https://github.com/username/repo)', 
      },
    });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Error fetching joke:', error); 
    throw error; 
  }
};

export const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorites`);
      return response.data;
    } catch (error) {
      console.error('Error fetching favorite jokes:', error);
      throw error; 
    }
  };
  
  export const toggleFavorite = async (joke, favorites) => {
    try {
      if (favorites.includes(joke.id)) {
        await axios.delete(`${API_URL}/favorite/remove`, {
          data: { joke_id: joke.id },
        });
      } else {
        await axios.post(`${API_URL}/favorite`, {
          joke_id: joke.id,
          joke: joke.joke,
          image: joke.image,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error; 
    }
  };