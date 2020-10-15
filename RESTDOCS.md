### What endpoints exist? ###
These are planned:

Fetch a list of all users, useful during login screen (touch to login).
```
GET     /user
nothing
```

Fetch one specific user, useful once logged in.
```
GET     /user
?id=
```

Fetch the ShoppingList of the logged in user.
```
GET     /shoplist
nothing
```

Create a new user, not useful at all.
```
POST    /user
{name}
```

Delete an existing user, not useful at all.
```
DELETE  /user
?id=
```

Get a list of all registered groceries. Useful when browsing what to get.
```
GET     /grocery
nothing
```

Get one specific grocery. Useful if you want to read more about some grocery.
```
GET     /grocery
?id=
```

Create a new grocery with unique name. There should be a paned that lets user to add new grocery.
```
POST    /grocery
{name, sectionId}
```

Fetch a list of all sections
```
GET     /section
nothing
```

Fetch a list of all recipes. Great for browsing.
```
GET     /recipe
nothing
```

Fetch one specific recipe. Great for when you want to cook it.
```
GET     /recipe
?id=
```

Create a new recipe. There should be a panel that allows for adding.
```
POST    /recipe
{name, ingredients, instructions}: Recipe
```

Update the recipe. Useful to fix typos etc..
```
PUT     /recipe
{id, {name, ingeredients, instructions}: Recipe}
```

Update the recipe instructions. I feel typos are most common here, so give direct access.
```
PUT     /recipe/instruction
{id, instruction}
```

Delete the recipe. If you get sick of them.
```
DELETE  /recipe
?id=
```
