# ReciTwist Javascript Library 
## Putting a twist on your recipes

Landing page: https://recitwist-library.herokuapp.com/

Documentation: https://recitwist-library.herokuapp.com/documentation.html

## Getting Started

### To get started, include: 

 - [this ReciTwist javascript file](https://recitwist-library.herokuapp.com/recitwist.js)
 - [this ReciTwist css file](https://recitwist-library.herokuapp.com/recitwist.css)
 - this script to call the recitwist javascript file in your html: 
```
    <link rel="stylesheet" href="recitwist.css"> 
    <script defer type="text/javascript" src='recitwist.js'></script> 
``` 
 - There are no external modules needed for this library
 
 

### Here is how to demonstrate some basic functionality: 

#### First we will create an Ingredient List 

```
const ingredientsList = new IngredientList(".IngredientsList", "Ingredients"); 

// This creates an ingredients list with a title of "Ingredients" that will go into any div with the "IngredientsList" classname. 

// Next we will add ingredients to this list 
ingredientsList.addIngredient("2 teaspoons Kosher salt")
ingredientsList.addIngredient("1 teaspoon Sugar ")
ingredientsList.addIngredient("1 pound (1-inch-thick) Bone-in pork rib chops", 
                                ["Pork shoulder steak", 
                                "Boneless, skinless chicken thighs", 
                                "Skirt or flank steak cut into 4-inch sections"])
// This ingredient has a list of alternative ingredients that are placed as the second parameneter in a list
```

#### Second we will create  a set of Instructions


```
const instructions = new Instructions(".recipeInstructions", 
    {title: "Instructions", crossout: true,
    description:"desc: A little bit of sugar mixed into the salt helps these chops brown during their relatively short cook time, and while they rest, make the wilted greens in the pork drippings."})
    // This creates a list of instructions. This instruction list has a title and description, 
    and also allows the user to click on each step so that they can cross out each step as they go through the recipe

instructions.addStep({title: "Season meat", 
     description: "Mix kosher salt and sugar in a small bowl. Lightly pound the pork chops with a meat mallet, rolling pin, or the heel of your hand until they're about 1 inch thick. Pat dry, then season all over with the salt-sugar mixture. Let chops sit while you prep the radicchio and onion. ", 
    estimatedTime:3})
    // This will add a step to the instructions list. Information like title and description can be added. Wach step also requires an estimated time, which will be used in the timeline. If this is not given, it defaults to 0. 
    
    
instructions.addStep({title: "Cook meat",
    description: "Press down to ensure that the center of each chop is making good contact with the hot oil and the pan. Cook, turning every minute, until the chops are very well browned with some charred spots on the fattiest areas, 5 to 6 minutes total. They will still be a little pink—if you like yours well-done, add another 1 or 2 minutes of cooking time. Transfer to a large plate to rest.", 
    estimatedTime:6})



```

#### Finally,  we will create a timeline for those instructions

```
instructions.addTimeline(".timeline", {width: "1000px", height:"30px"})

// this timeline has a specified height and width, and will be added to divs with the classname "timeline"

```


