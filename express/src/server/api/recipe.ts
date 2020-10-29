import express  from 'express';
import Recipe from '../../database/schemes/Recipe';
import ServerResponse from '../ServerResponse';
import { pool } from '../../database/DatabaseConnectionPool';
import Section from '../../database/schemes/Section';
import Grocery from '../../database/schemes/Grocery';
import Ingredient from '../../database/schemes/Ingredient';
import RecipeSignature from '../../database/schemes/RecipeSignature';
const app = module.exports = express();

const GET_INGREDIENT_LIST_QUERY = `SELECT
section.section_id, section.section_name, section.sorting_order, grocery.grocery_id, ingredient.ingredient_id, grocery.grocery_name, ingredient_amount, ingredient_unit
FROM ingredients
INNER JOIN ingredient
ON ingredients.ingredient_id = ingredient.ingredient_id
INNER JOIN grocery
ON ingredient.grocery_id = grocery.grocery_id
INNER JOIN section
ON grocery.section_id = section.section_id
WHERE recipe_id = $1`;
const GET_RECIPE_QUERY = 'SELECT recipe_name, instructions FROM recipe WHERE recipe_id = $1';
const GET_ALL_RECIPE_QUERY = 'SELECT * FROM recipe';

app.get('/api/recipe/all', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/recipe/all');

  try {
    response.data = await pool.query(GET_ALL_RECIPE_QUERY).then((qres) => {
      return qres.rows.map(r => {
        return new RecipeSignature(r.recipe_id, r.recipe_name);
      });
    });
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});

app.get('/api/recipe/:id', async (req: any, res: any) => {
  const id = req.params.id;

  const response = new ServerResponse('GET', '/api/recipe/' + id);

  try {
    const listOfIngredientsByRecipeId = await pool.query(GET_INGREDIENT_LIST_QUERY, [id]).then((qres) => {
      return qres.rows.map(r => {
        const s = new Section(r.section_id, r.section_name, r.sorting_order);
        const g = new Grocery(r.grocery_id, r.grocery_name, s);
        return new Ingredient(r.ingredeint_id, r.ingredient_amount, r.ingredient_unit, g);
      });
    });

    const recipeFromQueryResults = await pool.query(GET_RECIPE_QUERY, [id]).then((qres) => {
      if(qres.rowCount > 0) {
        const r = qres.rows[0];
        return [new Recipe(r.recipe_id, r.recipe_name, listOfIngredientsByRecipeId, r.instructions)];
      } else {
        return new Array<Recipe>();
      }
    });

    if(recipeFromQueryResults.length == 1) {
      response.data = recipeFromQueryResults;
    } else {
      response.data = [];
      response.status = 401;
    }
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});

interface SectionInstruction {
  name: string,
  sort: number
}

interface GroceryInstruction {
  name: string,
  section: number | SectionInstruction
}

interface IngredientInstruction {
  grocery: number | GroceryInstruction,
  amout: number,
  unit: string
}

app.post('/api/recipe/add', async(req: any, res: any) => {
  /**
   * This API call is used to add a new recipe into the database. The post request either needs
   * to contain an ID for exisiting ingredient, grocery, section etc OR provide all data necessary
   * to create new entries of respective type.
   *
   * request body = {
   *     "recipe_name": string
   *     "ingredients": Array<number | { IngredientInstruction }>
   * }
   *
   * If the request breaks this typing, an error will be thrown and BAD_REQUEST will be returned
   */
});
