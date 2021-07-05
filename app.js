const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
            else if (date == 28 && leap) {

                // Step 15
                nextdate = 1;
                nextmonth = 3;
            }

            // Step 16
            else if (date == 29 && leap) {

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

let namelist = [
    {'id': 61, 'name': 'yuktha', 'age': 20, 'marks': [29, 28, 30, 29, 29]},
    {'id': 62, 'name': 'yuvika', 'age': 20, 'marks': [30, 30, 29, 27, 25]},
    {'id': 63, 'name': 'siddharth', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 64, 'name': 'athul krishna', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 65, 'name': 'roshan kumar', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 66, 'name': 'yash', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 67, 'name': 'ritviz', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 404, 'name': 'nandini', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
    {'id': 405, 'name': 'varun', 'age': 20, 'marks': [25, 28, 29, 30, 26]},
];

app.route('/names')
    // Get request for Names
    .get((req, res) => {
        // console.log("Responding to /names");
        // Setting header
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(namelist);
    })

    .post((req, res) => {
        console.log(req.body);
        namelist.push(req.body);
        return res.status(200).json(namelist);
    });

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
