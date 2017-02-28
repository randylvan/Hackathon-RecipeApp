import React from 'react';

class Choices extends React.Component {
  state = {showCreate: false, name: '', ingredients: '', directions: '', nameSave: '', ingredientsSave: [], directionsSave: [], recipe: {name: ' ', ingredients: [], directions: []}, recipes: []}
  
  // componentDidMount() {
  //   $.ajax({
  //     url: '/recipes',
  //     type:'GET'
  //   }).done( recipes => {
  //     this.setState({recipes});
  //   });
  // }

  showRecipes = () => {
    $.ajax({
      url: '/recipes',
      type:'GET'
    }).done( recipes => {
      this.setState({recipes});
    });
    let recipesArr = this.state.recipes.map((rec, i) => {
      return(
        <li key={i}>{rec.name}</li>
      );
    });

   return recipesArr;
  }

  toggleShowCreate = () => {
    this.setState({showCreate: !this.state.showCreate});
  }

  addName(e) { 
    this.setState({name: e.target.value});
    this.setState({nameSave: e.target.value});
  }

  addIngredients(e){
    this.setState({ingredients: e.target.value});
  }

  ingredientsList = () => {
    return this.state.ingredientsSave.map((ing, i) => {
      return(
        <li key={i}>- {ing}</li>
      );
    });
  }

  addDirections(e){
    this.setState({directions: e.target.value});
  }

  directionsList = () => {
    return this.state.directionsSave.map((dir, i) => {
      return(
        <li key={i}>{dir}</li>}
      );
    });
  }

  submitRecipe = () => {
    let {name, ingredients, directions } = this.state.recipe
    let ing = ingredients.join(',');
    let dir = directions.join(',');
    console.log(ing, dir);
    $.ajax({
      url: '/recipes',
      type:'POST',
      data: {name, ing, dir }
    }).done(
      console.log('woo')
    );
    } 

  createForm() {
    return (
      <div className='row'>
      <div className="col s12 m6 l6">
        <div>
          <h2>New Recipe</h2>
            <form onSubmit={ e => {
            e.preventDefault();
            this.setState({name: ''});
            this.setState({recipe: {name: this.state.nameSave, ingredients: this.state.ingredientsSave, directions: this.state.directionsSave}});
            }}>
              <input
                placeholder ='Name' onChange={(e) => this.addName(e)} value={this.state.name}
                />
            </form>
          <h3>Ingredients</h3>
        </div>
        <div>
          <form onSubmit={ e => {
            e.preventDefault();
            this.setState({ingredientsSave: [...this.state.ingredientsSave, this.state.ingredients]})
            this.setState({ingredients: ''});
            this.setState({recipe: {name: this.state.nameSave, ingredients: this.state.ingredientsSave, directions: this.state.directionsSave}});
            }}>
            <input
            placeholder = 'Ingredient / Portion' onChange={(e) => this.addIngredients(e)} value={this.state.ingredients}
            />
          </form>
        </div>
        <div>
          <h3>Directions</h3>
            <form onSubmit={ e => {
            e.preventDefault();
            this.setState({directionsSave: [...this.state.directionsSave, this.state.directions]})
            this.setState({recipe: {name: this.state.nameSave, ingredients: this.state.ingredientsSave, directions: this.state.directionsSave}});
            this.setState({directions: ''});
            }}>
              <input
              placeholder = 'Directions' onChange={(e) => this.addDirections(e)} value={this.state.directions}
              />
            </form>
        </div>
      </div>
      <div className='col s12 m6 l6'>
        <h2>{this.state.nameSave}</h2>
        <h3>Ingredients</h3>
          <ul>
            {this.ingredientsList()}
            <li>{this.state.ingredients}</li>
          </ul>
        <h3>Directions</h3>
          <ol>
            {this.directionsList()}
            <li>{this.state.directions}</li>
          </ol>
      </div>
      <form onSubmit={ e => {
              e.preventDefault();
                this.setState({recipe: {name: this.state.nameSave, ingredients: this.state.ingredientsSave, directions: this.state.directionsSave}});
                this.setState({nameSave: ''});
                this.setState({directionsSave: []});
                this.setState({ingredientsSave: []});
                this.submitRecipe();
              }
            }
            >
        <button className='btn'>Submit</button>
      </form>
      </div>
    )
  }



  render() {
    return(
      <div className = "center">
          <button className='btn' onClick={this.toggleShowCreate}>{this.state.showCreate ? 'Recipes' : 'Create'}</button>
          <ul>{this.state.showCreate ?
          this.createForm() : this.showRecipes()
          }</ul>
      </div>
    )
  }
}

export default Choices;