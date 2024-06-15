export default class Contributor {
    private static lastId: number = 0;

    constructor(
        private _firstName: string,
        private _lastName: string,
        private _email: string,
        private _password: string,
        private _institution: string
    ) {
        this._Id = ++Contributor.lastId;
    }

    private _Id: number;

    public get institution(): string {
        return this._institution;
    }
    public set institution(value: string) {
        this._institution = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get Id(): number {
        return this._Id;
    }
    public set Id(value: number) {
        this._Id = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
}
