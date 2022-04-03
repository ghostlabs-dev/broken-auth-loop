import React, { useContext } from 'react'
import { RecipeContext } from './App'

export default function Search( recipes ) {
    const { handleRecipeSearch } = useContext(RecipeContext)
    return (
        <div className='recipe-list__search-container'>
            <input
                onChange={handleRecipeSearch}
                className='recipe-edit__input'
                placeholder='Search Here'
                type="text"
                name="search"
                id="search"
            />
        </div>
    )
}
