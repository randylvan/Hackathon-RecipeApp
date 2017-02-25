import React from 'react';

render() {
  let recipes = this.state.recipes.map( board => {
    return(
      <RecipesPage
        key={recipe._id}
        {...recipe}
      />
    );
  });
}

export default Recipes;