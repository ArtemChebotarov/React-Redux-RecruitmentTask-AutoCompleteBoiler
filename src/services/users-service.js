import axios from 'axios';

export default class UsersService {
    _apiBase = 'https://jsonplaceholder.typicode.com/users';

    async getUsers() {
        const users = await axios
            .get(`${this._apiBase}`)
            .catch((err) => console.error(err));

        return users.data;
    }
}
