/*
 * =========================================================================
 * PART 1: IDENTIFIED ERRORS IN GIVEN CODE
 * =========================================================================
 * Error 1 (grade.html, Line 9): Missing "return" in onsubmit="checkMark()". Without "return false", the form submits and reloads the page, making the result disappear immediately.
 * Error 2 (grade.html, Line 17): Wrong function name capitalization onclick="showtable()". JavaScript is case-sensitive; it must be showTable().
 * Error 3 (grade.html, Line 19): Wrong script filename src="grades.js". The file is named grade.js.
 * Error 4 (grade.js, Line 2): Missing assignment operator (=) when declaring let name.
 * Error 5 (grade.js, Line 3): Missing assignment operator (=) and mismatched bracket ["mark") instead of ["mark"].
 * Error 6 (grade.js, Line 4): Used single equals (=) assignment instead of comparison (=== or ==) in if (name = "").
 * Error 7 (grade.js, Line 8): Wrong capitalization isNan(mark) instead of isNaN(mark).
 * Error 8 (grade.js, Line 11): Missing assignment operator (=) in mark = parseInt(mark).
 * Error 9 (grade.js, Line 13): Used logical AND (&&) instead of OR (||) in if (mark < 0 && mark > 100). A number cannot be both < 0 and > 100 simultaneously.
 * Error 10 (grade.js, Line 23): Missing closing parenthesis ) in else if (mark >= 50.
 * Error 11 (grade.js, Line 24): Lowercase grade = "c" instead of uppercase "C".
 * Error 12 (grade.js, Line 26): Missing assignment operator (=) in grade = "F".
 * Error 13 (grade.js, Line 28): Wrong capitalization getElementByID instead of getElementById, missing assignment operator (=), and unquoted string literal " got grade ".
 * Error 14 (grade.js, Line 29): British spelling style.colour instead of American spelling style.color.
 * Error 15 (grade.js, Line 37): Loop starts at i = 1 instead of i = 0, skipping the first grade ("A").
 * Error 16 (grade.js, Line 39): tableHTML += "</table>"; was placed inside the for loop instead of after it.
 * Error 17 (grade.js, Line 41): Wrong capitalization .innerHtml instead of .innerHTML.
 */

// Function to validate inputs, calculate grade, and display result with date/time
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2: Validate empty mark field
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate numeric value
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    let mark = parseInt(markInput);

    // Validate range (0 to 100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and text colour (Part 2)
    let grade;
    let resultColor;

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Display result with dynamic colour
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = resultColor;

    // Part 2: Display the date and time the grade was checked
    let dateEl = document.getElementById("checkedDate");
    dateEl.innerHTML = "Checked on: " + new Date();
    dateEl.style.color = resultColor;

    // Return false to prevent page reload so result stays visible
    return false;
}

// Part 2: Generates a random whole number from 0 to 100 and puts it in the mark field
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Displays all four grades and mark ranges in a table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}