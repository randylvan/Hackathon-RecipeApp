const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
  Recipe.findById(req.params.id, ( err, recipe) => {
    res.render('recipe', {recipe});
  });
});

router.post('/', (req, res) =>{
  let ingredients = req.body.ing.split(',')
  let directions= req.body.dir.split(',')
  console.log(req.body.name, req.body.ing, req.body.dir);
  new Recipe({
    name: req.body.name,
    ingredients: ingredients,
    directions: directions
  }).save( (err, recipe) => {
    res.json(recipe);
  });
});

module.exports = router;