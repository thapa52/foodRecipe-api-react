import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./components/Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
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
  divider: {
    height: 28,
    margin: 4,
  },
}));


function App() {

  

  const classes = useStyles();

  const APP_ID = "1dd92301";
  const APP_KEY = "d785fd8aa37ef128a79386175fdd51bf";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('apple');


  useEffect(() => {
    getRecipe();
  }, [query]);


  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
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
      {recipes.map((recipe) => (
        <Recipe 
          // key={}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      
    </div>
  );
}

export default App;
