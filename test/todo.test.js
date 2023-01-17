const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const app = 'http://localhost:' + process.env.TEST_PORT;

let userToken;
let userId;
let todoId;

describe('Todo - API\'s', () => {

    before((done) => {
        let User = mongoose.model('User');
        let userDetails = {
            'email': 'test@test.com',
            'username': 'tester',
            'password': '123test',
            'role': 'user'
        }

        const user = new User(userDetails);
        user.save((err, createdUser) => {
            if (err) {
                console.log('error while saving', err);
            }
            // console.log('Data Saved Success', createdUser);
            done();
        });
    });

    it('should login and return an user object with tokens', (done) => {
        request(app).post('/v1/auth/login')
        .send({
            "email": "test@test.com",
            "password": "123test"
        })
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
            expect(res.body.status_code).equal(200);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data.tokens.access.token).to.be.a('string');
            userToken = res.body.data.tokens.access.token;
            userId = res.body.data.user.id;
            done();
        });
    });

    it('should create a todo', (done) => {
        request(app)
        .post('/v1/todo/' + userId)
        .set('Authorization', 'Bearer ' + userToken)
        .send({
            "title": "test",
            "body": "test",
        })
        .expect(200)
        .end((err, res) => {
            if (err) throw new Error(err);
            expect(res.body.status_code).equal(200);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.have.property('id');
            done();
        });
    });

    it('should get todo list', (done) => {
        request(app)
        .get('/v1/todo/' + userId)
        .set('Authorization', 'Bearer ' + userToken)
        .expect(200)
        .end((err, res) => {
            if (err) throw new Error(err);
            expect(res.body.status_code).equal(200);
            todoId = res.body.data[0].id;
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data[0]).to.have.property('id');
            done();
        });
    });

    it('should update a todo by id', (done) => {
        request(app)
        .patch('/v1/todo/' + todoId)
        .set('Authorization', 'Bearer ' + userToken)
        .send({
            "body": "test 2"
        })
        .expect(200)
        .end((err, res) => {
            if (err) throw new Error(err);
            expect(res.body.status_code).equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object');
            done();
        });
    });

    it('should delete a todo by id', (done) => {
        request(app)
        .delete('/v1/todo/' + todoId)
        .set('Authorization', 'Bearer ' + userToken)
        .expect(200)
        .end((err, res) => {
            if (err) throw new Error(err);
            expect(res.body.status_code).equal(200);
            expect(res.body).to.be.an('object');
            done();
        });
    });

    after((done) => {
        let todo = mongoose.model('todo-list');
        todo.deleteMany({}).then((res) => {
            done();
        });
    });

    after((done) => {
        let User = mongoose.model('User');
        User.deleteMany({}).then((res) => {
            done();
        });
    });

});