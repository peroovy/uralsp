class i {
    constructor(t, s) {
        (this.status = t), typeof s == "string" ? (this.body = { message: s }) : s ? (this.body = s) : (this.body = { message: `Error: ${t}` });
    }
    toString() {
        return JSON.stringify(this.body);
    }
}
class e {
    constructor(t, s) {
        (this.status = t), (this.location = s);
    }
}
export { i as H, e as R };
