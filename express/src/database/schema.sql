CREATE DATABASE homehost;

CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    last_login TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id),
    CHECK(LENGTH(username) >= 4)
);

CREATE TABLE section(
    section_id INT GENERATED ALWAYS AS IDENTITY,
    section_name TEXT NOT NULL,
    PRIMARY KEY(section_id)
);

CREATE TABLE grocery(
    grocery_id INT GENERATED ALWAYS AS IDENTITY,
    grocery_name TEXT NOT NULL,
    section_id INT DEFAULT 0,
    PRIMARY KEY(grocery_id),
    CONSTRAINT fk_section
        FOREIGN KEY(section_id)
            REFERENCES section(section_id)
            ON DELETE SET DEFAULT,
    CHECK(LENGTH(grocery_name) >= 2)
);

CREATE TABLE ingredient(
    ingredient_id INT GENERATED ALWAYS AS IDENTITY,
    grocery_id INT NOT NULL,
    ingredient_amount INT,
    ingredient_unit TEXT,
    PRIMARY KEY(ingredient_id),
    CONSTRAINT fk_grocery
        FOREIGN KEY(grocery_id)
            REFERENCES grocery(grocery_id)
            ON DELETE NO ACTION,
    CHECK( ingredient_amount >= 0)
);

CREATE TABLE ingredients(
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY(recipe_id, ingredient_id),
    CONSTRAINT fk_recipe
        FOREIGN KEY(recipe_id)
            REFERENCES recipe(recipe_id)
            ON DELETE NO ACTION,
    CONSTRAINT fk_ingredient
        FOREIGN KEY(ingredient_id)
            REFERENCES ingredient(ingredient_id)
            ON DELETE NO ACTION
);

CREATE TABLE recipe(
    recipe_id INT GENERATED ALWAYS AS IDENTITY,
    recipe_name TEXT NOT NULL,
    instructions TEXT,
    PRIMARY KEY(recipe_id),
    CHECK(LENGTH(recipe_name) >= 4),
    CHECK(LENGTH(instructions) >= 10)
);
