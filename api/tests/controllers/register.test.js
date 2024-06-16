const { register } = require('./../../controllers/authController');
const User = require('./../../models/User');

jest.mock('./../../models/User')

/** Fake request object */
const request = {
    body: {
        username: 'fake_username',
        password: 'fake_password'
    }
}

it('should send a status code of 400 when user exists', () => {
    register(request);
})