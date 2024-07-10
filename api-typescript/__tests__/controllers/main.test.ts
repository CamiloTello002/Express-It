import { mockRequest, mockResponse } from "../../__mocks__"
import { getUsers } from "../../src/controllers/main.controller"

describe('get users', () => {
    it('should return an array of users', () => {
        getUsers(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith([]);
    })
})