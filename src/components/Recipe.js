import React from 'react'

const Recipe = (props) => {
  return (
    <div>
        <p>{props.title}</p>
        <p>{props.calories}</p>
        <img src={props.image} alt='' />
        <ol>
            {props.ingredients.map(ingredient => (
                <li>{ingredient.text}</li>
            ))}
        </ol>
    </div>
  )
}

export default Recipe;