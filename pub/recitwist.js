/* JS Libraries */
"use strict";
console.log('----------')
console.log('SCRIPT: Creating and loading our JS libraries');



(function(global, document, $) { 
    const log = global.console.log

    class IngredientList {
        constructor(querySelector, title = "", list = []) {
            // list is a list of ingredients 
            this.querySelector = querySelector

            this.title = title;
            this.ingredients = list;
            
            this.viewAlternativesText = "View Alternatives"
            this.hideAlternativesText = "Hide Alternatives"
            this.swapText = "Swap"
            this.modalSwapText = "Swap"

            const inBody = document.querySelector(this.querySelector)
            const ingredientList = document.createElement('div');
            ingredientList.classList.add("ingredientList");

            const titleElement = document.createElement("h2");
            const text = document.createTextNode(this.title);
            titleElement.classList.add("ingredientTitle")
            titleElement.appendChild(text);
            
            ingredientList.appendChild(titleElement)
            try{
                inBody.appendChild(ingredientList)
            } catch(e){
                console.error("The className you entered cannot be found"); 
            }
            

        }

        addIngredient(ingredientName, alternatives = [], style={}) {
            const ingredient =  new Ingredient(ingredientName, alternatives, 
                                {viewAlternativesText: this.viewAlternativesText, 
                                    hideAlternativesText: this.hideAlternativesText, 
                                    swapText: this.swapText, 
                                    modalSwapText: this.modalSwapText}, ingredientName, alternatives = [], style={})

            const ingredientElement = ingredient.createElement();
            const inBody = document.querySelector(this.querySelector)
            const ingredientList = inBody.querySelector('.ingredientList')
            ingredientList.appendChild(ingredientElement);
            this.ingredients.push(ingredient);

        }

        changeViewAlternativesButtonText(newText){
            this.viewAlternativesText = newText
        }

        changeHideAlternativesButtonText(newText){
            this.hideAlternativesText = newText
        }

        changeSwapButtonText(newText){
            this.swapText = newText
        }

        changeModalSwapText(newText){
            this.modalSwapText = newText
        }
    }

    class Ingredient {
        constructor(name, alternatives = [], text, style) {
            this.name = name;
            this.alternatives = alternatives;
            this.viewAlternatives = false; 
            this.isChecked = false;
            this.viewAlternativesText = text.viewAlternativesText;
            this.hideAlternativesText = text.hideAlternativesText;
            this.swapText = text.swapText;
            this.modalSwapText = text.modalSwapText;

            if(style.buttonTextColour){ 
                this.buttonTextColour = style.buttonTextColour
            } else {
                this.buttonTextColour = "black"
            }

            if(style.buttonColour){ 
                this.buttonColour = style.buttonColour
            } else {
                this.buttonColour = "transparent"
            }

            if(style.borderRadius){ 
                this.borderRadius = style.borderRadius
            } else {
                this.borderRadius = "5px"
            }

            

        }

        createElement() {
            const self = this;
            const element = document.createElement('div');
            element.classList.add("ingredient");
            
            const ingredientSpan = document.createElement("span");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("ingredientCheckbox");
            checkbox.style.cursor = "pointer"
            
            const ingredientTextSpan = document.createElement("span");
            const text = document.createTextNode(this.name);
            ingredientTextSpan.classList.add("ingredientText")
            ingredientTextSpan.appendChild(text);

            ingredientSpan.appendChild(checkbox)
            ingredientSpan.appendChild(ingredientTextSpan)

            ingredientSpan.style.cursor = "pointer"
            

            ingredientSpan.onclick = function(){
                this.isChecked = !this.isChecked;
                checkbox.checked = this.isChecked;
                if(checkbox.checked){
                    ingredientSpan.classList = "completed"
                } else {
                    ingredientSpan.classList  = "uncompleted"
                }
            
            }
            element.appendChild(ingredientSpan);

            const alternativesButton = document.createElement("button")
            alternativesButton.classList.add("alternativeButton")
            if (this.viewAlternatives){
                alternativesButton.innerHTML = this.hideAlternativesText
                

            } else {
                alternativesButton.innerHTML = this.viewAlternativesText
            }
    
            

            if(this.alternatives.length > 0){
                element.appendChild(alternativesButton);

                const alternativeElements = this.#createAlternativeElements();
                element.appendChild(alternativeElements);
                
                const alternativesModal = this.#createAlternativeModal()
                element.appendChild(alternativesModal)
        
                alternativesButton.onclick = function(){
                    
                    this.viewAlternatives = ! this.viewAlternatives
                    
                    if ( this.viewAlternatives){
                        alternativesButton.innerHTML = self.hideAlternativesText
                        alternativeElements.style.display = "block"
                        alternativesModal.style.display = "none"
            
                    } else {
                        alternativesButton.innerHTML = self.viewAlternativesText
                        alternativeElements.style.display = "none"
                    }
                }

                alternativesButton.onmouseover = function(){
                    if(!this.viewAlternatives){
                        alternativesModal.style.display = "inline-block"
                    }
                    
                }
        
                alternativesButton.onmouseout = function(){
                    alternativesModal.style.display = "none"
                }
            }

    
            return element;

        }



        #createAlternativeElement(alternativeIngredient){
            const element = document.createElement('div');
            element.classList.add("alternativeIngredient");

            const ingredientSpan = document.createElement("span");
            const text = document.createTextNode(alternativeIngredient);
            ingredientSpan.classList.add("ingredientText")
            ingredientSpan.appendChild(text);
            
            const replaceButton = document.createElement("button")
            replaceButton.innerHTML = this.swapText
            replaceButton.classList.add("replaceButton")

            replaceButton.onclick = function(){
    
                this.name = alternativeIngredient
                // parent element x 5 -> spantext -> textNode
                const ingredientName = replaceButton.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].childNodes[1]
                const currentValue = ingredientName.firstChild.textContent
                
                ingredientName.innerHTML = '';
                ingredientName.appendChild(document.createTextNode(this.name))

                const text = document.createTextNode(currentValue);
                ingredientSpan.innerHTML = '';
                ingredientSpan.appendChild(text);
                alternativeIngredient = currentValue

            }

            element.appendChild(ingredientSpan);
            element.appendChild(replaceButton)
            return element;
        }

        #createAlternativeElements(){
            // console.log("here is a list of alt ingredients")
            const element = document.createElement('div');
            element.style.display = "none"
            element.classList.add("alternativeListDiv");

            const list = document.createElement('ul');
            list.classList.add("alternativeList");

            for(let i = 0; i < this.alternatives.length; i ++){
                const listItem = document.createElement('li');
                const altElement = this.#createAlternativeElement(this.alternatives[i])
                listItem.appendChild(altElement)
                list.appendChild(listItem)

            }
            element.appendChild(list)
            return element

        }

        #createAlternativeModal(){
            const element = document.createElement('div');
            element.setAttribute("style", "display:none")
            element.classList.add("alternativeModalListDiv");

            const list = document.createElement('ul');
            list.classList.add("alternativeModalList");

            const header = document.createElement('p');
            const swapText = document.createTextNode(this.modalSwapText + " " + this.name)
            const boldText = document.createElement('strong')
            boldText.appendChild(swapText)
            header.appendChild(boldText)
            header.classList.add("modalHeader")
            element.appendChild(header)

            for(let i = 0; i < this.alternatives.length; i ++){
                const listItem = document.createElement('li');
                const altElement = this.#createAlternativeModalElement(this.alternatives[i])
                listItem.appendChild(altElement)
                list.appendChild(listItem)

            }
            element.appendChild(list)
            element.style.display = "none"
            element.style.maxWidth = "350px"
            element.style.backgroundColor = "White"
            element.style.border = "solid 1px grey"
            element.style.position = "absolute"
            element.style.margin = "-5px 20px"
            element.style.padding = "5px 20px 5px 5px"
            element.style.zIndex = 1
            element.style.overflow = "hidden"
            element.style.borderRadius = "5px"
            // TODO make this changable via variable

            return element

        }

        #createAlternativeModalElement(alternativeIngredient){
            const element = document.createElement('div');
            element.classList.add("alternativeModalIngredient");

            const ingredientSpan = document.createElement("span");
            const text = document.createTextNode(alternativeIngredient);
            ingredientSpan.classList.add("ingredientText")
            ingredientSpan.appendChild(text);
            element.appendChild(ingredientSpan)
            return element
        }

    }


    class Instructions {
        constructor(querySelector, instructions){
            //className, title="", description="" 
            
            this.querySelector = querySelector

            if(instructions.title){
                this.title = instructions.title
            } else {
                this.title = ""
            }

            if(instructions.description){
                this.description = instructions.description
            } else {
                this.description = ""
            }
            
            if(instructions.crossout){
                this.crossout = instructions.crossout
            } else {
                this.crossout = false
            }

            if(instructions.stepName){
                this.stepName = instructions.stepName
            } 

           

            this.timeline = null
            // add title and description to dom

            // add ingredients to dom

            this.steps = []

            this.totalSteps = this.steps.length

            const inBody = document.querySelector(this.querySelector)
            const instructionsList = document.createElement('div');
            instructionsList.classList.add("instructionList");

            const titleElement = document.createElement("h2");
            const text = document.createTextNode(this.title);
            titleElement.classList.add("instructionsTitle")
            titleElement.appendChild(text);

            const pElement = document.createElement("p");
            const p = document.createTextNode(this.description);
            pElement.classList.add("instructionsDesc")
            pElement.appendChild(p);

            
            instructionsList.appendChild(titleElement)
            instructionsList.appendChild(pElement)
            try{
                inBody.appendChild(instructionsList)
            } catch(e){
                console.error("The className you entered cannot be found"); 
            }
            

        }

        #incrementStepCount(){
            this.totalSteps += 1; 
        }

        // add a step to the recipe. this will automatically index it
        addStep(stepInfo){
            this.#incrementStepCount()
            if(! stepInfo.stepName && this.stepName){
                stepInfo.stepName = this.stepName
                
            }            
            const id = `${this.querySelector.slice(1)}-${this.totalSteps}`
            const step = new Step(this.totalSteps, id, stepInfo, this.crossout)
            this.steps.push(step)

            // TODO add this step to the DOM
            const stepElement = step.createElement();
            const inBody = document.querySelector(this.querySelector)
            const instructionsSteps = inBody.querySelector('.instructionList')
            instructionsSteps.appendChild(stepElement);
            

        }

        addTimeline(querySelector, style){
            // this should be called after all of the steps have been added. you can specify where it goes anyways
            const timeline = new Timeline(querySelector, this.steps, style)
            timeline.addTimeline()
            this.steps.map(step => {
                step.addTimeline(timeline)
            })
            this.timeline = timeline
        }

        
    }


    class Step {
        constructor(index, id, step, crossout){
            // index, title="", description, estimatedTime=0, image=""
            this.index = index

            this.id = id

            if(step.stepName){
                this.stepName = step.stepName + " "
            } else {
                this.stepName = "Step "
            }

            if(step.seperator){
                this.seperator = step.seperator 
            } else {
                this.seperator = " "
            }

            if(step.title){
                this.title = step.title 
            } else {
                this.title = ""
            }

            if(step.description){
                this.description = step.description 
            } else {
                this.description = ""
            }

            if(step.estimatedTime){
                this.estimatedTime = step.estimatedTime 
            } else {
                this.estimatedTime = 0
            }   

            this.timeline = null

            // steps start off as false
            this.isComplete = false; 
            this.crossout = crossout;


        }
        addTimeline(timeline){
            this.timeline = timeline
        }

        createElement(){
            const self = this;
            const element = document.createElement('div');
            element.classList.add("instruction");

            const section = document.createElement('section');
            section.classList.add("instruction-section");
            section.setAttribute("id", this.id);

            
            const instructionSpan = document.createElement("span");
            
            const instructionTitleSpan = document.createElement("h3");
            const title = document.createTextNode(this.stepName + this.index + this.seperator + this.title);
            instructionTitleSpan.classList.add("instructionTitle")
            instructionTitleSpan.appendChild(title);

            const instructionTextSpan = document.createElement("span");
            const text = document.createTextNode(this.description);
            instructionTextSpan.classList.add("instructionText")
            instructionTextSpan.appendChild(text);

            // instructionSpan.appendChild(checkbox)
            instructionSpan.appendChild(instructionTitleSpan)
            instructionSpan.appendChild(instructionTextSpan)

            if(this.crossout){
                instructionSpan.style.cursor = "pointer"
            }


            instructionSpan.onclick = function(){
                if(self.crossout){
                    this.isComplete = !this.isComplete;
                    if(this.isComplete){
                        instructionSpan.classList = "completed"
                    } else {
                        instructionSpan.classList  = "uncompleted"
                    }
                    self.setStepAsComplete()
                    
                }
                
            }
            
            section.appendChild(instructionSpan)
            element.appendChild(section);

    
            return element;
        }

        setStepAsComplete(){
            if(this.timeline){
                this.timeline.setBlockAsComplete(this.index - 1)
            }

        }


    }

    class Timeline{
        // consider: different colours for different step types.. ex: prep, cooking, active cooking/non active work

        constructor(querySelector, steps, style={}){
            this.querySelector = querySelector
            this.steps=steps
            this.totalTime = this.#getTotalTime()

            this.style = style


            if(style.padding){ // for timeline
                this.padding = style.padding
            } else {
                this.padding = "0px 2px"
            }

            if(style.bgColour){ // for timeline
                this.bgColour = style.bgColour
            } else {
                this.bgColour = "white"
            }

            if(style.borderRadius){ 
                this.borderRadius = style.borderRadius
            } else {
                this.borderRadius = "5px"
            }

            this.blocks = []
            

        }
        // calculate the total time that the recipe takes -> totalTime

        #getTotalTime(){
            let total = 0;
            this.steps.map(step => total += step.estimatedTime)
            return total
        }


        createTimeline(){
            const self = this;
            const timelineDiv = document.createElement('div');
            timelineDiv.classList.add("timelineDiv");
            timelineDiv.style.display = "inline-block"
            timelineDiv.style.border = this.border
            timelineDiv.style.backgroundColor = this.bgColour
            timelineDiv.style.borderRadius = "5px"       
            timelineDiv.style.padding = this.padding


            this.steps.map((step) => {
                const timeblock = new TimeBlock(step, this.totalTime, this.style)
                const partitionElement = timeblock.createElement()
                timelineDiv.appendChild(partitionElement)
                this.blocks.push(timeblock)

            })
        
            return timelineDiv

        }

        addTimeline(){
            const timelineElement = this.createTimeline()

            const inBody = document.querySelector(this.querySelector)
            inBody.appendChild(timelineElement);

        }

        setBlockAsComplete(index){
            this.blocks[index].setCompleteStatus()

        }
    
    }

    class TimeBlock{
        constructor(step, totalTime, style){
            this.step = step
            this.totalTime = totalTime

            // style = {height, width, inprogressColour, completedColour}
            if(style.height){
                this.height = style.height
            } else {
                this.height = "30px"
            }

            if(style.width){
                this.width = style.width
            } else {
                this.width = "1000px"
            }

            // can be done in the css..
            if(style.maxModalWidth){
                this.maxModalWidth = style.maxModalWidth
            } else {
                this.maxModalWidth = "250px"
            }

            if(style.maxModalHeight){
                this.maxModalHeight = style.maxModalHeight
            } else {
                this.maxModalHeight = "500px"
            }
            
            
            // potential for this to be covered in the css rather than the constructor.. 
            if(style.inprogressColour){
                this.inprogressColour = style.inprogressColour
            } else {
                this.inprogressColour = "red"
            }

            if(style.completedColour){
                this.completedColour = style.completedColour
            } else {
                this.completedColour = "green"
            }

            if(style.border){ // for partitions
                this.border = style.border
            } else {
                this.border = "none"
            }


            if(style.margin){ // for partitions
                this.margin = style.margin
            } else {
                this.margin = "3px"
            }

            if(style.borderRadius){ 
                this.borderRadius = style.borderRadius
            } else {
                this.borderRadius = "5px"
            }

            this.isComplete = false; 

            if(style.descriptionCutoff){
                this.descriptionCutoff = style.descriptionCutoff
            } else {
                this.descriptionCutoff = 150
            }

            this.element = null
            
            

        }

        createElement(){
            const a = document.createElement('a');
            a.href = "#" + this.step.id

            const partitionDiv = document.createElement('div');
            partitionDiv.classList.add("partitionDiv");
            partitionDiv.style.display = "inline-block"
            partitionDiv.style.alignItems = "center"

            const timelineWidth = parseInt(this.width)
            const width = this.step.estimatedTime / this.totalTime * timelineWidth 
            
            partitionDiv.style.width = `${width}px`
            partitionDiv.style.height = this.height
            partitionDiv.style.backgroundColor = this.inprogressColour
            
            // partitionDiv.style.backgroundColor = this.inprogressColour
            partitionDiv.style.border = this.border
            partitionDiv.style.margin = this.margin
            partitionDiv.style.cursor = "pointer"
            partitionDiv.style.borderRadius =this.borderRadius


            const instructionModal = this.#createElementModal()
            partitionDiv.appendChild(instructionModal)



            partitionDiv.onmouseover = function(){
                instructionModal.style.display = "inline-block"
                
            }

            partitionDiv.onmouseout = function(){
                instructionModal.style.display = "none"
            }
            a.appendChild(partitionDiv)

            this.element = partitionDiv
            return a


        } 

        #createElementModal(){
            const element = document.createElement('div');
            element.classList.add("timelineInstructionModal");
            element.style.maxWidth = this.maxModalWidth
            element.style.maxHeight = this.maxModalHeight
            element.style.backgroundColor = this.inprogressColour
            element.style.border = this.border
            element.style.display = "none"
            element.style.backgroundColor = "White"
            element.style.border = "solid 1px grey"
            element.style.position = "absolute"
            

            const height = parseInt(this.height) + 20 
            element.style.margin = `${height}px 0px`
            element.style.padding = "10px"
            element.style.zIndex = 1
            element.style.overflow = "hidden"
            element.style.borderRadius = "5px"
            
            const instructionSpan = document.createElement("span");
            
            const instructionTitleSpan = document.createElement("h3");
            const title = document.createTextNode(this.step.stepName + this.step.index + this.step.seperator + this.step.title);
            instructionTitleSpan.classList.add("timelineInstructionTitle")
            instructionTitleSpan.appendChild(title);

            const instructionTextSpan = document.createElement("span");

            const slicedDescription = this.step.description.slice(0, this.descriptionCutoff)
            let ellipses = ""; 
            if(this.step.description.length > this.descriptionCutoff){
                ellipses = " ..." 
            } 
            const text = document.createTextNode(slicedDescription + ellipses);
            instructionTextSpan.classList.add("timelineInstructionText")
            instructionTextSpan.appendChild(text);

            // instructionSpan.appendChild(checkbox)
            instructionSpan.appendChild(instructionTitleSpan)
            instructionSpan.appendChild(instructionTextSpan)

            instructionSpan.style.cursor = "pointer"
            
            element.appendChild(instructionSpan);
            return element
        }

        setCompleteStatus(){
            this.isComplete = !this.isComplete
            if(this.isComplete){
                this.element.style.backgroundColor = this.completedColour

            } else {
                this.element.style.backgroundColor = this.inprogressColour

            }

        }


    }

    global.IngredientList = global.IngredientList || IngredientList
    global.Ingredient = global.Ingredient || Ingredient

    global.Instructions = global.Instructions || Instructions
    global.Step = global.Step || Step

    global.Timeline = global.Timeline || Timeline
    // global.StTimeBlockep = global.TimeBlock || TimeBlock




})(window, window.document, $);
