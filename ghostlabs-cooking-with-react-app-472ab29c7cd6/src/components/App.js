import React, {useState, useEffect} from "react";
import RecipeList from "./RecipeList";
import '../css/app.css';
import {v4 as uuid} from 'uuid';
import RecipeEdit from "./RecipeEdit";
import Test from "./Test";
import {Route, Routes} from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';
import axios from "axios";
import Loading from './loading';
import Profile from '../views/profile';
import NavBar from "./nav-bar";
import Home from "./Home";


export const RecipeContext = React.createContext(undefined)
const LOCAL_STORAGE_KEY = 'cookingWithReact.app.recipes'

const recipeUrl = "http://localhost:3001/recipes";

const App = () => {
    const [selectedRecipeId, setSelectedRecipeId] = useState()
    const [recipes, setRecipes] = useState(sampleRecipes)
    const [userId, setUserId] = useState('')
    // const [userRecipes, setUserRecipes] = useState(sampleRecipes)
    const selectedRecipe = recipes.find(recipe => recipe.recipe_id === selectedRecipeId)
    const { isLoading } = useAuth0();
    const user = useAuth0();
    // const [searchActive, setSearchActive] = useState(false);
    // const isAuthenticated = useAuth0();
    useEffect(() => {
        console.log('rendered first time')
        // console.log('user is logged in')
        const recipesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(recipesJson != null) setRecipes(JSON.parse(recipesJson))
    }, [])

    useEffect(() => {
        console.log('rendered recipe')
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    }, [recipes])

    useEffect(() => {
        console.log('User ID: ', userId)
    }, [userId])


    const getGitHubUserWithAxios = async (userSub) => {

        // console.log(userSub)
        console.log('getting recipes')
        const data = await axios.post(recipeUrl, {"user_sub": userSub})
        console.log(data.data.length)
        if(data.data.length > 0){
            setRecipes(data.data);
        } else {
            handleStartingRecipe()
        }
        // return data.data
    };

    if (isLoading) {
        return <Loading />;
    }

    // console.log(user.user.name, user.isAuthenticated)

    // THIS CAUSES AN INFINITE LOOP whether the if statement exists or not - because we are setting state?
    if(user.user.sub.length > 0){
        console.log('user is authenticated: ', user.user.sub);
        setUserId(user.user.sub)
    }

    // THIS WORKS fine whether the if statement exists or not, but we are not setting any state
    // if(user.user.sub.length > 0){
    //     console.log('user is authenticated: ', user.user.sub);
    // }

    // THIS WORKS but still makes 2 requests on the Axios function - may need to set a fetching variable or something to limit it to 1 call?
    // if(user.user.sub !== userId){
    //     console.log('user is authenticated: ', user.user.sub);
    //     setUserId(user.user.sub)
    //     getGitHubUserWithAxios(user.user.sub).then(r => console.log('finished post function'))
    // }

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange,
        handleRecipeSave,
        // handleRecipeSearch
    }

    // function handleRecipeSearch(e) {
    //     if (e.target.value.length > 0) {
    //         const filteredRecipes = recipes.filter((recipe) => {
    //             return recipe.name.includes(e.target.value);
    //         });
    //         console.log(filteredRecipes);
    //         setRecipesView(filteredRecipes);
    //         setSearchActive(true)
    //     } else {
    //         console.log(recipes);
    //         setRecipesView(recipes);
    //         setSearchActive(false)
    //     }
    // }

    function handleRecipeSelect(id){
        setSelectedRecipeId(id)
    }

    function handleRecipeAdd() {
        const newRecipe = {
            recipe_id: uuid(),
            name: '',
            servings: 1,
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuid(),
                    name: '',
                    amount: ''
                }
            ],
            edited: false,
            owner_sub: user.user.sub
        }
        setSelectedRecipeId(newRecipe.id)
        axios.post("http://localhost:3001/recipesCreate", {"recipe": newRecipe}).then(r => {
            setRecipes([...recipes, newRecipe]);
            console.log('recipe added')})
    }

    function handleStartingRecipe() {
        const newRecipe = {
            recipe_id: uuid(),
            name: '',
            servings: 1,
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuid(),
                    name: '',
                    amount: ''
                }
            ],
            edited: false,
            owner_sub: user.user.sub
        }
        setSelectedRecipeId(newRecipe.id)
        setRecipes([newRecipe])
    }


    function handleRecipeChange(id, recipe){
        // console.log('search active', searchActive)
        const newRecipes = [...recipes]
        const index = newRecipes.findIndex(r => r.recipe_id === id)
        newRecipes[index] = recipe
        newRecipes[index].edited = true;
        setRecipes(newRecipes)
    }
    function handleRecipeSave(id){
        console.log(id)
        const newRecipes = [...recipes]
        const index = newRecipes.findIndex(r => r.recipe_id === id)
        newRecipes[index].edited = false;
        const saveRecipe = newRecipes[index];
        console.log(saveRecipe)
        axios.post("http://localhost:3001/recipesUpdate", {"recipe_id": id, "recipe": saveRecipe}).then(r => {
            setRecipes(newRecipes)
        console.log('recipe saved')})
    }

    function handleRecipeDelete(id) {
        if(selectedRecipeId != null && selectedRecipeId === id){
            setSelectedRecipeId(undefined)
        }
        axios.post("http://localhost:3001/recipesDelete", {"recipe_id": id}).then(r => {
            setRecipes(recipes.filter(recipe => recipe.recipe_id !== id));
            console.log('recipe Deleted')})
    }

    return (
        <div className="mainAppView">
            <div className="sideBar">
            <h1>Recipe App</h1>
            <nav>
                <NavBar />
            </nav>
            </div>
            <div className="childAppView">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/recipes"
                               element={<RecipeContext.Provider value={recipeContextValue}>
                                   {recipes && <RecipeList
                                       recipes={recipes}
                                   />}
                                   {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
                               </RecipeContext.Provider>}
                    />
                    <Route path="/profile" element={<Profile />}/>
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
            </Routes>
            </div>
        </div>
    )

}
const sampleRecipes = [
]

export default App;
