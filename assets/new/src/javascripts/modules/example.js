export default class Example {
    constructor(el) {
        this.el = el
        console.log(el.textContent, '- From the example module') // eslint-disable-line no-console
    }
}
