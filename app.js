const express = require('express');
const app = express();


// Step 1
app.get('/nextdate/:date/:month/:year', (req, res) => {
    // console.log(`Responding to /nextdate/${req.params.date}/${req.params.month}/${req.params.year}`);
    const date = parseInt(req.params.date);
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);

    if (Number.isNaN(date) || Number.isNaN(month) || Number.isNaN(year)) {
        let response_string = "Invalid Input";
        // console.log("Sent : " + response_string);
        return res.status(400).send(response_string);
    }

    //Leap year
    let leap = false;
    if (year % 400 == 0 && year % 100 == 0) {
        leap = true;
    } else if (year % 4 == 0) {
        leap = true;
    } else {
        leap = false;
    }

    // Validate
    if (date < 1 || date > 31 || month < 1 || month > 12 || year > 2012 || year < 1812) {
        let response_string = "Invalid Input";
        // console.log("Sent : " + response_string);
        return res.status(400).send(response_string);
    }
    let nextdate = date;
    let nextmonth = month;
    let nextyear = year;

    // Step 2
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 ||
        month == 10) {

        // Step 3
        if (date < 31) {

            // Step 4
            nextdate = date + 1;
        }

        // Step 5
        else if (date == 31) {
            nextdate = 1;
            nextmonth = month + 1;
        } else {
            let response_string = "Invalid Input";
            // console.log("Sent : " + response_string);
            return res.status(400).send(response_string);
        }
    }

    // Step 6
    else if (month == 4 || month == 6 || month == 9 || month == 11) {

        // Step 7
        if (date < 30) {

            // Step 4
            nextdate = date + 1;
        } else if (date == 30) {

            // Step 5
            nextdate = 1;
            nextmonth = month + 1;
        } else {
            let response_string = "Invalid Input";
            // console.log("Sent : " + response_string);
            return res.status(400).send(response_string);
        }
    }
    // Step 8
    else if (month == 12) {

        // Step 9
        if (date < 31) {

            // Step 4
            nextdate = date + 1;
        } else {

            // Step 10
            nextdate = 1;
            nextmonth = 1;
            nextyear = year + 1;
        }
    }

    // Step 11
    else if (month == 2) {

        // Step 12
        if (date < 28) {

            // Step 4
            nextdate = date + 1;

        } else {

            // Step 13
            if (date == 28 && leap) {

                // Step 14
                nextdate = 29;

            }

            else {

                // Step 15
                nextdate = 1;
                nextmonth = 3;
            }

            // Step 16
            if (date == 29) {

                // Step 15
                nextdate = 1;
                nextmonth = 3;

            } else {

                // Step 17
                let response_string = "Invalid Input";
                // console.log("Sent : " + response_string);
                return res.status(400).send(response_string);
            }
        }
    }

    let response_string = `Next Date: ${nextdate}\/${nextmonth}\/${nextyear}`;
    // console.log("Sent : " + response_string);
    // Step 18
    return res.status(200).send(response_string);
})

app.get('/names', (req, res) => {
    // console.log("Responding to /names");
    let namelist = {
        61: 'yuktha',
        62: 'yuvika',
        63: 'siddharth',
        64: 'athul krishna',
        65: 'roshan kumar',
        66: 'yash',
        67: 'ritviz',
        404: 'nandini',
        405: 'varun',
        408: 'rahul'

    };
    res.status(200).send(namelist);
})

app.get('/', (req, res) => {
    // console.log("Responding to /");
    res.status(200).send("API Testing server");
})

app.all('*', (req, res) => {
    // console.log("Invalid Request");
    res.status(400).send("Error: Invalid request");
})


port = 4040
const server = app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

module.exports = server;
