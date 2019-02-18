class DataDrawer {
    constructor(el, pager) {
        this.el = el;
        this.pager = pager;
        this.pager.onChange.subscribe(() => this.draw());
    }

    draw() {
        console.log('draw')
        for (let item of this.pager.items()) {
            const tr = document.createElement('tr');
            for (let key in item) {
                const td = document.createElement('td');
                td.innerHTML = item[key];
                tr.appendChild(td);
            }
            this.el.appendChild(tr);
        }
    }
}