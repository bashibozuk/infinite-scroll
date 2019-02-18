class DataSource {
    constructor(data) {
        this.data = data;
    }
    get(index, limit) {
        return this.data.slice(index, index + limit);
    }

    getTotal() {
        return this.data.length;
    }
}