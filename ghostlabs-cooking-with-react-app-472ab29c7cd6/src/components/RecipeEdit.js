import React, {useContext} from 'react'
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import {RecipeContext} from "./App";
import {v4 as uuid} from 'uuid';


export default function RecipeEdit({recipe}) {
    const {handleRecipeChange, handleRecipeSelect, handleRecipeSave} = useContext(RecipeContext)

    function handleChange(changes){
        handleRecipeChange(recipe.recipe_id, { ...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ingredients: newIngredients});
    }

    function handleIngredientAdd(){
        const newIngredient = {
            id: uuid(),
            name: '',
            amount: ''
        }
        handleChange({ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(i => i.id !== id)})
    }


    return (
        <div className="recipe-edit">
            <div className="recipe-edit-inner">
            <div className="recipe-edit__remove-button-container">
                <button
                    className="btn recipe-edit__remove-button"
                    onClick={() => handleRecipeSelect(undefined)}
                >&times;</button>
            </div>
            <div className="recipe-edit__details-grid">
                <div className="label-wrap"><label htmlFor="name" className="recipe-edit__label">Name</label>
                <input type="text" name="name" id="name" className="recipe-edit__input" value={recipe.name} onChange={e => handleChange({name: e.target.value})}/></div>
                {/*formatting*/}
                <div className="label-wrap"><label htmlFor="cookTime" className="recipe-edit__label">Cook Time</label>
                <input type="text" name="cookTime" id="cookTime" className="recipe-edit__input" value={recipe.cookTime} onChange={e => handleChange({cookTime: e.target.value})}/></div>
                {/*formatting*/}
                <div className="label-wrap"><label htmlFor="servings" className="recipe-edit__label">Servings</label>
                <input type="number" name="servings" id="servings" min="1" className="recipe-edit__input" value={recipe.servings} onChange={e => handleChange({servings: parseInt(e.target.value) || ''})}/></div>
                {/*formatting*/}
                <div className="label-wrap"><label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
                <textarea name="instructions" id="instructions" className="recipe-edit__input" value={recipe.instructions} onChange={e => handleChange({instructions: e.target.value})}/></div>
            </div>
                <div className="label-wrap"> <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div className="headers">Name</div>
                <div className="headers">Amount</div>
                <div>{/* blank column */}</div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIngredientChange = {handleIngredientChange}
                        handleIngredientDelete = {handleIngredientDelete}
                    />
                ))}
            </div></div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button
                    className="btn btn--primary"
                    onClick={() => handleIngredientAdd()}
                >Add Ingredient</button>
            </div>
            <hr/>
            <button
                className="btn btn--special edit-button"
                onClick={() => handleRecipeSave(recipe.recipe_id)}
            >Save Recipe</button>
            </div>
        </div>
    )
}
