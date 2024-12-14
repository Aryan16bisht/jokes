import React from 'react'; 
import { useLocation } from 'react-router-dom'; 
import { Card, CardContent, Typography } from '@mui/material'; 

function Favorites() {
  const location = useLocation();
  const { favorites } = location.state || { favorites: [] }; 

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Jokes
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '16px' }}>
        {favorites.length > 0 ? (
          favorites.map((joke) => (
            <Card key={joke.joke_id} style={{ margin: '8px', width: 'fit-content' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {joke.joke}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No favorite jokes found.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Favorites;