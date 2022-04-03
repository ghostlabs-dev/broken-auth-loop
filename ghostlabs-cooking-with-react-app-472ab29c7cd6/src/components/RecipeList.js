import React, {useContext, useState} from 'react'
import Recipe from "./Recipe";
import {RecipeContext} from "./App";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import Loading from "./loading";
import axios from "axios";
import Search from "./Search";


const RecipeList = (props) => {
    console.log(props)
    const { recipes, selectedRecipeEdited } = props
    const {handleRecipeAdd} = useContext(RecipeContext)
    return (
        <>
            <div className="recipe-list">
                <div className="recipe-list__add-recipe-btn-container">
                    <button
                        className="btn btn--primary"
                        onClick={handleRecipeAdd}
                    >
                        Add Recipe
                    </button>
                </div>
                <div>
                    <Search />
                </div>
                <div className="recipes-container">
                    {recipes.map(recipe => {
                        return (
                            <Recipe
                                key={recipe.recipe_id}
                                {...recipe}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default withAuthenticationRequired(RecipeList, {
    onRedirecting: () => <Loading />,
});
