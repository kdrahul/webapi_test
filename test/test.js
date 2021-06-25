const server = require('../app');
const desc = require('mocha').describe;
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

desc('Boundary Value Analysis', () => {
    dates = [06];
    it('Case 1: 15/aa/1900', (done) => {
        chai.request(server)
            .get("/nextdate/15/aa/1900")
            .end((err, response) => {
                response.should.have.status(400);
                done()
            });
    });
    it('Case 5: 30/3/2000', (done) => {
        chai.request(server)
            .get("/nextdate/30/3/2000")
            .end((err, response) => {
                response.should.have.status(200);
                done()
            });
    })
});
