const server = require('../app');
const desc = require('mocha').describe;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


desc('Boundary Value Analysis', () => {
    desc.only('Valid Values', () => {
        let expected_values = [
            "31/3/2000",
            "3/3/2000",
            "16/11/2000",
            "16/2/2000",
            "16/3/2011",
            "16/3/1913",
        ];
        let valid_dates = [
            "30/3/2000",
            "2/3/2000",
            "15/11/2000",
            "15/2/2000",
            "15/3/2011",
            "15/3/1913",
        ];

        for (let i = 0; i < valid_dates.length; i++) {
            it(`${valid_dates[i]}`, (done) => {
                let req_string = "/nextdate/" + valid_dates[i];
                chai.request(server)
                    .get(req_string)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.text.should.equals("Next Date: " + expected_values[i]);
                        done()
                    });
            });

        }
    });
    desc('Invalid Values', () => {
        let invalid_dates = [
            "15/aa/1900",
            "dd/06/1901",
            "15/06/196y",
            "00/03/2000",
            "15/13/2000",
            "15/03/1811",
            "15/03/2013",
        ];

        for (let i = 0; i < invalid_dates.length; i++) {
            it(`${invalid_dates[i]}`, (done) => {
                chai.request(server)
                    .get(`/nextdate/${invalid_dates[i]}`)
                    .end((err, response) => {
                        response.should.have.status(400);
                        done()
                    });
            });

        }
    });
});
