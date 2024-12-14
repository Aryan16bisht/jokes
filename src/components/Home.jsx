import React, { useEffect, useState } from 'react'; 
import { TextField, Button, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material'; 
import { fetchRandomJoke, fetchFavorites, toggleFavorite } from '../api/api'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";



function Home() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [jokes, setJokes] = useState([]); 
  const [favorites, setFavorites] = useState([]); 
  const navigate = useNavigate(); 
  const { enqueueSnackbar } = useSnackbar(); 

  const handleSearch = async () => {
    try {
      const joke = await fetchRandomJoke(searchTerm); 
      if(joke.lenght>0){
        setJokes([joke, ...jokes]); 
      }
      else{
        throw error;
      }
     
    } catch (error) {
      enqueueSnackbar("no joke found", {
        variant: "error",
      });

      console.error('Error fetching jokes:', error);
    }
  };

  useEffect(() => {
    const fetchFavoriteJokes = async () => {
      try {
        const data = await fetchFavorites(); 
        setFavorites(data); 
      } catch (error) {
        console.error('Error fetching favorite jokes:', error);
      }
    };
    
    fetchFavoriteJokes(); 
  }, []);

  const handleToggleFavorite = async (joke) => {
    try {
      await toggleFavorite(joke, favorites);
      if (favorites.includes(joke.id)) {
        setFavorites(favorites.filter((id) => id !== joke.id));
      } else {
        setFavorites([...favorites, joke]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    const fetchInitialJokes = async () => {
      try {
        const randomJokes = await  fetchRandomJoke(""); 
        setJokes(randomJokes); 
        console.log(randomJokes);
      } catch (error) {
        console.error('Error fetching initial jokes:', error);
      }
    };
    
    fetchInitialJokes(); 
  }, []);

  const goToFavorites = () => {
    navigate('/favorites', { state: { favorites } }); 
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField 
            variant="outlined" 
            label="Search" 
            size="small" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ marginRight: '8px' }} 
          />
          <Button variant="contained" color="primary" onClick={handleSearch}> 
            Search
          </Button>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={goToFavorites}
          > 
            Favorites
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '16px' }}>
        {jokes.map((joke) => (
          <Card key={joke.id} style={{ margin: '8px', width: 'fit-content' }}>
            {joke.img ? (
              <CardMedia
                component="img"
                height="140"
                image={joke.image}
                alt={joke.joke}
              />
            ) : null}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {joke.joke}
              </Typography>
              <IconButton 
                onClick={() => handleToggleFavorite(joke)} 
                color={favorites.find((data) => data.id === joke.id) ? 'secondary' : 'default'}
              >
                <FavoriteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;