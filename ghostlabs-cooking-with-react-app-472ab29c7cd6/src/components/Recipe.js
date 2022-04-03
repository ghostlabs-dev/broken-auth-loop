import React, {useContext} from 'react'
import IngredientList from "./IngredientList";
import {RecipeContext} from "./App";

export default function Recipe(props) {
    const {recipe_id, name, cookTime, servings, instructions, ingredients, edited} = props
    const {handleRecipeDelete, handleRecipeSelect, handleRecipeSave} = useContext(RecipeContext)
    return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
      </div>
      <div className="recipe__row">
        <span className="recipe__label mr-1">Cook Time:</span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label mr-1">Servings:</span>
        <span className="recipe__value">{servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label mr-1">Instructions:</span>
        <div className="recipe__value recipe__value--instructions recipe__value--indented">{instructions}</div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label mr-1">Ingredients:</span>
        <div className="recipe__value recipe__value--indented"><IngredientList ingredients={ingredients}/></div>
      </div>
      <div className="recipe__footer">
          <button className="btn btn--primary mr-1"
                  onClick={() => handleRecipeSelect(recipe_id)}
          >Edit</button>
          {edited === true && <button
              className="btn btn--special"
              onClick={() => handleRecipeSave(recipe_id)}
          >Save</button>}
          <button
              className="btn btn--danger"
              onClick={() => handleRecipeDelete(recipe_id)}
          >Delete</button>
      </div>
    </div>
  )
}
