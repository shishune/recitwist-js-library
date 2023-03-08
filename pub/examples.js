"use strict";

// EXAMPLE 1: RECIPE

// create an ingredients list and add each ingredient
const ingredientsList = new IngredientList(".IngredientsList", "Ingredients");

ingredientsList.addIngredient("2 teaspoons Kosher salt")
ingredientsList.addIngredient("1 teaspoon Sugar ")
ingredientsList.addIngredient("1 pound (1-inch-thick) Bone-in pork rib chops", 
                                ["Pork shoulder steak", 
                                "Boneless, skinless chicken thighs", 
                                "Skirt or flank steak cut into 4-inch sections"])
ingredientsList.addIngredient("1 head Treviso or other radicchio (12 to 14 ounces)", 
                                ["Escarole", 
                                "Napa Cabbage", 
                                "Savoy Cabbage"])
ingredientsList.addIngredient("1 Small yellow onion", ["Any onion will do, as long as it's a small one"])
ingredientsList.addIngredient("1 Lemon ")
ingredientsList.addIngredient("4 tablespoons Grapeseed or other neutral oil, divided, plus more if needed")
ingredientsList.addIngredient("Honey, for drizzling")
ingredientsList.addIngredient("Flaky salt, for serving", ["Kosher salt"])
ingredientsList.addIngredient("Dijon mustard, for serving", ["Prepared Horseraddish"])

// create an instructions list and add each step
const instructions = new Instructions(".recipeInstructions", 
    {title: "Recipe Instructions", crossout: true})

instructions.addStep({title: "Season meat", seperator: ": ",
     description: "Mix kosher salt and sugar in a small bowl. Lightly pound the pork chops with a meat mallet, rolling pin, or the heel of your hand until they're about 1 inch thick. Pat dry, then season all over with the salt-sugar mixture. Let chops sit while you prep the radicchio and onion. ", 
    estimatedTime:3})
instructions.addStep({title: "Prep veggie", seperator: ": ", 
    description: "Trim the Treviso and separate it into individual leaves. Cut the leaves into irregular 3- to 4-inch pieces. Thinly slice the onion crosswise, then separate into rings. Cut the lemon in half. ", 
    estimatedTime:4})
instructions.addStep({description: "Heat a large cast-iron skillet over medium-high for 2 minutes. Pour in 3 tablespoons of oil (this should be enough to thoroughly coat the surface, but add more if needed), then carefully slip the pork chops into the pan. ", 
    estimatedTime:2})
instructions.addStep({title: "Cook meat", seperator: ": ",
    description: "Press down to ensure that the center of each chop is making good contact with the hot oil and the pan. Cook, turning every minute, until the chops are very well browned with some charred spots on the fattiest areas, 5 to 6 minutes total. They will still be a little pink—if you like yours well-done, add another 1 or 2 minutes of cooking time. Transfer to a large plate to rest.", 
    estimatedTime:6})

instructions.addStep({title: "Cook onions", seperator: ": ",
    description: "Carefully pour off fat from the skillet and wipe out any burned bits. Return the pan to medium heat and add remaining 1 tablespoon oil. Add the onion and season with kosher salt. Cook, stirring occasionally, until onion rings are Happy and lightly browned, about 4 minutes. ", 
    estimatedTime:4})
instructions.addStep({title: "Cook veggies", seperator: ": ",
    description: "Add the radicchio, tossing and letting the leaves wilt before adding more, until all the radicchio is in the skillet. Season with kosher salt and cook, tossing, just until the leaves are wilted and tender but the thickest port of the rib still has o little bite to it, 3 to 4 minutes", 
    estimatedTime:4})
instructions.addStep({title: "Plate and serve", seperator: ": ",
    description: "Squeeze in juice of one lemon half, then toss to combine; transfer the radicchio to a platter. Drizzle a little honey over radicchio. Slice chops against the groin and add to platter; drizzle with any accumulated juices. Season with flaky salt. Serve with remaining lemon half and some Dijon for dragging the pork through. ", 
    estimatedTime:2})

instructions.addTimeline(".timeline", {width: "900px", height:"30px"})


// EXAMPLE 2 Relay Race

const relayRace = new IngredientList(".RelayRace", "Participants");
relayRace.changeViewAlternativesButtonText("View team members")
relayRace.changeHideAlternativesButtonText("Hide team members")
relayRace.changeSwapButtonText("Pass baton")
relayRace.changeModalSwapText("First Runner:")

relayRace.addIngredient("Ria Frost", ["Jodi Warren", "Shane Powers", "Lidia Raymond", "Cruz O'Doherty", "Saima Dougherty"])

relayRace.addIngredient("Kim Brookes", ["Prisha Wolfe", "Kingston Forster", "Beverley Moran",  "Veronika Enriquez", "Finnian Gordon"])
relayRace.addIngredient("Lacie Phelps", ["Isaak Vincent", "Tayyab Mckinney", "Myra Bond",  "Cheyanne Parrish", "Mahdi Fountain"])
relayRace.addIngredient("Kiri Huerta", ["Trey Mills", "Lisa May", "Zidan Rahman",  "Luisa Rodriguez", "Yannis Mclean"])

// EXAMPLE 3 TODO list

const todo = new Instructions(".todoList", 
    {title: "Eryka's Daily routine", crossout: true,
    description:"Things for me to do today!", stepName:"Item"},)

todo.addStep({title: "Complete CSC384 Assignment", seperator: "- ",
     description: "Debug CSC384 Assignment. Estimated time: 2h", 
    estimatedTime:2})
todo.addStep({title: "Start SOC207 Essay", seperator: "- ",
    description: "Create SOC207 essay outline. Estimated time: 1h", 
   estimatedTime:1})
todo.addStep({title: "Laundry", seperator: "- ",
   description: "Do your laundry!!! Estimated time: 0.5h", 
  estimatedTime:0.5})
todo.addStep({title: "See friend :)", seperator: "- ",
  description: "Go to Cat's Eye to see Grace. Estimated time: 3h", 
 estimatedTime:3})

 todo.addTimeline(".todoTimeline", 
    {width: "900px", height: "50px", 
    inprogressColour: "#fcba03", completedColour:"#ff6ef0", bgColour: "#ffffff"})

