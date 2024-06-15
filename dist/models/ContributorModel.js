class Contributor {
    constructor(_firstName, _lastName, _email, _password, _institution) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._email = _email;
        this._password = _password;
        this._institution = _institution;
        this._Id = ++Contributor.lastId;
    }
    get institution() {
        return this._institution;
    }
    set institution(value) {
        this._institution = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get Id() {
        return this._Id;
    }
    set Id(value) {
        this._Id = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
}
Contributor.lastId = 0;
export default Contributor;
//# sourceMappingURL=ContributorModel.js.map