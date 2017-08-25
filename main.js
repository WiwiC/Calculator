var result = $('.result')			//we set up the var result as the div with the class .result
var first_number_string = "";		
var second_number_string = "";
var current_number_string = "";
var current_operator = "";
var should_clear = "false";

function add(first, second) {
    var result = 0.0; 
    first = parseFloat(first);
    second = parseFloat(second);
    result = first + second;
    return result;
}

function multiply(first, second) {
    var result = 0.0;
    first = parseFloat(first);
    second = parseFloat(second);
    result = first * second;
    return result;
}

function divide(first, second) {
    if (parseFloat(second) === 0) {
        alert("Impossible de diviser par 0 !")
        return null;
    } else {
        var result = 1.0;
        first = parseFloat(first);
        second = parseFloat(second);
        result = first / second;
        return result;
    }
}

function substract(first, second) {
    var result = 0;
    first = parseFloat(first);
    second = parseFloat(second);
    result = first - second;
    return result;
}

function clear() {
    current_number_string = "";
    result.text(current_number_string);
}

function clearAll() {
    first_number_string = "";
    second_number_string = "";
    current_operator = "";
    clear();
}

function operate() {
    switch (current_operator) {
        case "/":
            current_number_string = divide(first_number_string, second_number_string);
            result.text(current_number_string);
            break;
        case "*":
            current_number_string = multiply(first_number_string, second_number_string);
            result.text(current_number_string);
            break;
        case "+":
            current_number_string = add(first_number_string, second_number_string);
            result.text(current_number_string);
            break;
        case "-":
            current_number_string = substract(first_number_string, second_number_string);
            result.text(current_number_string);
            break;
    }
}

function equal() {
    second_number_string = current_number_string;
    clear();
    //alert(first_number_string + " " + current_operator + " " + second_number_string );
    operate();
    second_number_string = "";
    first_number_string = "";
}

$('.number').on('click', function() {
    var current_button = $(this);		//We set the var current_button as the selected element
    shadow_effect(current_button);		//Call shadow_effect function with the current_button as paramter

    if (should_clear) {		//If the var should_clear is true, then we call the function clear
        clear();			//The function clear set the current_number at "" and display current_number which means ""
        should_clear = false; // We put should_clear at false, then if we keep going clicking on a number, the whole number displays on the screen.
    };
    var number = this.innerHTML;
    current_number_string += number;
    result.text(current_number_string);
})


$('.clear').on('click', function() {
    var current_button = $(this);
    shadow_effect(current_button);
    clearAll();
})

//When we click on a button with the class .operator
$('.operator').on('click', function() {
    var current_button = $(this);		//We set the var current_button as the selected element
    shadow_effect(current_button);		//Call shadow_effect function with the current_button as paramter

    if (first_number_string === "") {
        first_number_string = current_number_string;
        current_operator = this.innerHTML;
        clear();
    } 
    else if (isNaN(parseFloat(current_number_string))) { 
        current_number_string = current_number_string.slice(0, -1);
    }
    else {
        second_number_string = current_number_string;
        operate();
        first_number_string = current_number_string;
        //var temporary_number = current_number_string;
        should_clear = true;
        // clear(); 
        //first_number_string = temporary_number;
    }
})

$('.equal').on('click', function(){
    shadow_effect($(this));
    equal();
    should_clear = true;
})

// Function to add an effect when click on a button
function shadow_effect(button){
	button.addClass('shadow');
  	setTimeout(function(){
    	button.removeClass('shadow');
    	}, 100);
}