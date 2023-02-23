//<![CDATA[
	// makes sure XML parsers don't read it as XML

"use strict"

// shortcuts
function $(id) {
	return document.getElementById(id);
}
function $$(tag, num) {
	return document.getElementsByTagName(tag)[num];
}




/* 
Data for selects
(Its in JSON now, so I don't really need this)

    let data = {
        init: ['Flavor?', 'chocolate', 'vanilla'],
        chocolate: ['Frosting Color?', 'purple', 'yellow'],
        vanilla: ['Frosting?', 'blue raspberry', 'lime'],
        purple: ['Candy Topping?', 'sprinkles', 'cherry'],
        yellow: ['Ring Topping?', 'crown', 'sword'],
        'blue raspberry': ['Jewlry Topping?', 'pearl', 'gem'],
        lime: ['Flower Topping?', 'sunflower', 'tulip']
    }
*/

var data = {};

/**
 * This will get the data from JSON and build the first select.
 */
const startThePage = function() {
    // start the hit count function to display it
    doHitCount();

    // fetch the data
    fetch('assets/js/data.json')
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("Bad things are happening, respnse status was not 200, it was: " + response.status);
            }
        })
        .then (d => {
            data = d;
            createSelect('init');
        })
        .catch (error => console.log("Error: " + error));

}

/**
 * Builds the select 
 * @param {String} dataPointer the key for the value in the data set that contains the data about the question
 */
const createSelect = function(dataPointer) {
    let newQuestion = document.createElement('span');
    let newSelect = document.createElement('select');
    let newDiv = document.createElement('div');

    // create the question
    newQuestion.appendChild(document.createTextNode(data[dataPointer][0]));

    // create the select
    newSelect.name = dataPointer;
    newSelect.setAttribute('onchange', 'handleSelect(this)');

        // add the starter option
    let blankOption = document.createElement('option');
    blankOption.appendChild(document.createTextNode('select an option'));
    blankOption.disabled = true;
    blankOption.selected = true;
    blankOption.value = true;
    newSelect.appendChild(blankOption);

        // add the options
    for (let i = 1, len = data[dataPointer].length; i < len; i++) {
        let newOption = document.createElement('option');

        let value = data[dataPointer][i];
        newOption.value = value;
        newOption.appendChild(document.createTextNode(value));
        
        newSelect.appendChild(newOption);
    }

    // add them to the div
    newDiv.appendChild(newQuestion);
    newDiv.appendChild(newSelect);

    // add to body
    let section = $$('section', 0);
    section.appendChild(newDiv);
    
}

/**
 * When a select is clicked, this makes sure the right new selects appear/dissapear
 * @param {DOMElement} element the selected element 
 */
const handleSelect = function(element) {
    console.log("Pressed + " + element.value + ", from: " + element.name);
    let section1 = $$('section', 0);

    
    // check it it's the last select element
    let selectLength = section1.getElementsByTagName('select').length - 1;
    let lastSelect = $$('select', selectLength);
    let divParent = lastSelect.parentElement;


    // check if names are not equal and remove them until the last select is this one
    while(lastSelect.name != element.name) {
        divParent.remove();

        selectLength--;
        lastSelect = $$('select', selectLength);
        divParent = lastSelect.parentElement;

    }

    // delete current section 2 and put in a new empty one
    $$('section', 1).remove();
    let section2 = document.createElement('section');
    $$('main', 0).appendChild(section2);


    

    // find if there is a chosen description
    let chosenDesc = $('chosenDesc');
    if (chosenDesc) {
        chosenDesc.remove();
    }

    if (data[element.value]) {
        createSelect(element.value);
    }
    else {
        console.log("End");
        afterCompletedSelects();
    }
}

/**
 * When they have completed the selects, the contact info and the chosen desc are displayed
 */
const afterCompletedSelects = function() {
    const section1 = $$('section', 0);
    const section2 = $$('section', 1);

    // create text to display in p
    let displayText = "";
    let selects = section1.getElementsByTagName('select');

    for ( let i = 0, len = selects.length; i < len; i++) {
        displayText += selects[i].value + ', ';
    }
    displayText = displayText.substring(0, displayText.length - 2);

    // create h2 header
    let header = document.createElement('h2');
    header.appendChild(document.createTextNode('your order'));
    section2.appendChild(header);


    // create a p element with all the selections in it
    let displayChosen = document.createElement('p');
    displayChosen.id = 'chosenDesc';
    displayChosen.appendChild(document.createTextNode("Order Summary: " + displayText));
    section2.appendChild(displayChosen);


    // create a div element to hold cupcake image
    let image = document.createElement('div');
    image.className = "svgDiv";
    image.style.backgroundImage = 'url(\'assets/media/' + displayText + '.svg\')';
    section2.appendChild(image);



    // create title for form
    let formHeader = document.createElement('h2');
    formHeader.appendChild(document.createTextNode('Order Information'));
    section2.appendChild(formHeader);

    // create the user info form
    createGetUserInfo();
}

/**
 * Create the contact form
 */
const createGetUserInfo = function () {
    let form = document.createElement('form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'POST');
    form.setAttribute('onsubmit', 'return validate()');
    
    // add the questions
    form.appendChild(createInputBlock('name', 'text', 'Enter your name', 'Alex Smith', true ));
    form.appendChild(createInputBlock('email', 'email', 'Enter your email', 'alex.smith@gmail.com', false ));
    form.appendChild(createInputBlock('streetAddress', 'text', 'Enter street address', '555 Smith Rd', true ));
    form.appendChild(createInputBlock('zipcode', 'text', 'Enter zipcode', '55555', true ));

    // create submit button
    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.name = 'submit';
    submit.id = 'submit';
    submit.appendChild(document.createTextNode("Order Cupcake"));

    form.appendChild(submit);
    $$('section', 1).appendChild(form);

    // autofill the data from storage
    loadFuncData();
}

/**
 * Creates the specific input for the contact form
 * @param {String} id selector id
 * @param {String} type type of imput
 * @param {String} question prompt
 * @param {String} placeholder placeholder of the input
 * @param {boolean} isRequired if the question is required
 * @returns 
 */
const createInputBlock = function(id, type, question, placeholder, isRequired) {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let input = document.createElement('input');

    // set up p
    p.appendChild(document.createTextNode(question));

    // add required * if needed
    if (isRequired) {
        let required = document.createElement('span');
        // set up span
        required.className = 'required';
        required.appendChild(document.createTextNode("*"));

        // add to p
        p.appendChild(required);

    }

    // set up input
    input.setAttribute('type', type);
    input.name = id;
    input.setAttribute('id', id);
    input.setAttribute('placeholder', placeholder);

    // add div id
    div.setAttribute('id', id + 'Box');
    div.appendChild(p);
    div.appendChild(input);

    return div;
}



// END OF CDATA, END OF FILE
//]]>