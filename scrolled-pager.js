class ScrolledPager extends Pager {
    constructor(dataSource, perPage) {
        super(dataSource, perPage);
        this.onChange = new rxjs.Subject();
    }

    onScroll(data) {
        const {event, direction, scrollTop} = data;
        const hidden = this.getHiddenElements(event.target, direction, scrollTop);
        if (hidden.length < this.perPage && direction === ScrollSpy.DIRECTION_DOWN) {
            this.next();
            this.onChange.next()
        }
    }

    getHiddenElements(el, direction, currentScroll) {
        return Array.from(el.children).filter((child) => {
            if (direction === ScrollSpy.DIRECTION_UP) {
                return child.offsetTop < currentScroll;
            }
            
            return child.offsetTop > el.offsetHeight + el.scrollTop;
        });
    }

}