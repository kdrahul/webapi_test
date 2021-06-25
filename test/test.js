const server = require('../app');
const desc = require('mocha').describe;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


desc('Boundary Value Analysis', () => {
    desc('Valid Values', () => {
        dates = [
            "30/03/2000",
            "02/03/2000",
            "15/11/2000",
            "15/2/2000",
            "15/3/2011",
            "15/03/1913",
        ];

        for (let i = 0; i < dates.length; i++) {
            it(`${dates[i]}`, (done) => {
                chai.request(server)
                    .get(`/nextdate/${dates[i]}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        done()
                    });
            });

        }
    });
    desc('Invalid Values', () => {
        dates = [
            "15/aa/1900",
            "dd/06/1901",
            "15/06/196y",
            "00/03/2000",
            "15/13/2000",
            "15/03/1811",
            "15/03/2013",
        ];

        for (let i = 0; i < dates.length; i++) {
            it(`${dates[i]}`, (done) => {
                chai.request(server)
                    .get(`/nextdate/${dates[i]}`)
                    .end((err, response) => {
                        response.should.have.status(400);
                        done()
                    });
            });

        }
    });
});
