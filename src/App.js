import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./components/Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function App() {
  
  const classes = useStyles();

  const APP_ID = "1dd92301";
  const APP_KEY = "d785fd8aa37ef128a79386175fdd51bf";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('mango');


  useEffect(() => {
    getRecipe();
  }, [query]);


  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  }


  const updateSearch = (event) => {
    setSearch(event.target.value)
  }
  const updateQuery = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch('')
  }


  return (
    <div className="App">
      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
        <InputBase
          type='text' 
          value={search} 
          onChange={updateSearch}
          className={classes.input}
          placeholder="Search Food Recipe"
          inputProps={{ 'aria-label': 'search food recipe' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
    </Paper>
    <div style={{ width: '100%' }}>
    <Box 
      display="flex" 
      flexWrap="wrap"
      justifyContent="space-evenly"
      p={1}
      m={1}
    >
      {recipes.map((recipe) => (
        <Box p={1} >
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
        </Box>
      ))}
      </Box >
      </div>
    </div>
  );
}

export default App;
