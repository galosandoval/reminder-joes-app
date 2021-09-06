const db = require("../../data/connection");
const { findIngredientsByRecipeId } = require("../recipes/recipes-model");

const findIngredients = () => {
  return db("ingredients");
};

const findIngredientById = (id) => {
  return db("ingredients").where("id", id);
};

const addNewIngredients = (newIngredients) => {
  return db("ingredients").insert(newIngredients);
};

const updateIngredient = (id, change) => {
  return db("ingredients")
    .where({ id })
    .update(change)
    .then(() => {
      return findIngredientById(id);
    });
};

const deleteIngredientById = (id) => {
  let deletedIngredient;
  findIngredientById(id).then((ingredientToDelete) => {
    deletedIngredient = ingredientToDelete;
  });
  return db("ingredients")
    .where({ id })
    .del()
    .then(() => {
      return deletedIngredient;
    });
};

const deleteIngredientsByRecipeId = (id) => {
  let deletedIngredients;
  findIngredientsByRecipeId(id).then((ingredientsToDelete) => {
    deletedIngredients = ingredientsToDelete;
  });
  return db("ingredients")
    .where("recipe-id", id)
    .del()
    .then(() => {
      return deletedIngredients;
    });
};

module.exports = {
  findIngredients,
  findIngredientById,
  addNewIngredients,
  updateIngredient,
  deleteIngredientById,
  deleteIngredientsByRecipeId
};