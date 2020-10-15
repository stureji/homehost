### What endpoints exist? ###
These are planned:

Fetch a list of all users
```
GET     /user
nothing
```

Fetch one specific user
```
GET     /user
?id=
```

Create a new user
```
POST    /user
{name}
```

Delete an existing user
```
DELETE  /user
?id=
```

Get a list of all groceries
```
GET     /grocery
nothing
```

Get one specific grocery
```
GET     /grocery
?id=
```

Create a new grocery with unique name
```
POST    /grocery
{name, sectionId}
```

Fetch a list of all sections
```
GET     /section
nothing
```

Fetch a list of all recipes
```
GET     /recipe
nothing
```

Fetch one specific recipe
```
GET     /recipe
?id=
```

Create a new recipe
```
POST    /recipe
{name, ingredients, instructions}: Recipe
```

Update the recipe
```
PUT     /recipe
{id, {name, ingeredients, instructions}: Recipe}
```

Update the recipe instructions
```
PUT     /recipe/instruction
{id, instruction}
```

Delete the recipe
```
DELETE  /recipe
?id=
```
