class Pager {
    constructor(dataSource, perPage) {
        this.dataSource = dataSource; 
        this.currentPage = 1;
        this.perPage = perPage;
        this.total = 0;
    }
    next() {
        this.currentPage++;
    }

    hasNext() {
        this.dataSource.getTotal() > this.perPage * this.currentPage;
    }

    prev(){
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    reset ()  {
        this.currentPage = 1;
    }

    last ()  {
        const lastPage = Math.ceil(this.dataSource.getTotal() / this.perPage);
        this.currentPage = lastPage;   
    }

    current() {
        return this.currentPage;
    }

    items() {
        const index = (this.currentPage - 1) * this.perPage;
        return this.dataSource.get(index, this.perPage);
    }

    getNextPageStart() {
        return this.currentPage * this.perPage;
    }

    getPrevPageStart() {
        return Math.max((this.currentPage - 2) * this.perPage, 0);
    }
}