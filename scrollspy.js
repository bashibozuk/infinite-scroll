class ScrollSpy {
    
    constructor(el, callbackDebounceTime) {
        this.el = el;
        this.currentScroll = this.el.scrollTop;
        this.direction = ScrollSpy.DIRECTION_DOWN;
        this.callbackDebounceTime = callbackDebounceTime || 200;
        this.subscription = null;

        this.onScroll = new rxjs.Subject();
    }
    
    start() {
        const map = rxjs.operators.map;
        const debounceTime = rxjs.operators.debounceTime;
        this.subscription = rxjs
            .fromEvent(this.el, 'scroll')
            .pipe(map((e) => {
                this.setDirection(e);

                return e;
            }),
            debounceTime(this.callbackDebounceTime))
            .subscribe((e) => {
                this.onScroll.next({
                    event: e,
                    direction: this.direction,
                    scrollTop: this.currentScroll
                });
            });
    }

    stop() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    setDirection(e) {
        this.direction = this.el.scrollTop > this.currentScroll ?
            ScrollSpy.DIRECTION_DOWN : ScrollSpy.DIRECTION_UP;
        this.currentScroll = this.el.scrollTop;
        if (this.currentScroll === 0) {
            this.direction = ScrollSpy.DIRECTION_DOWN;
        } else if (this.currentScroll === this.el.scrollTopMax) {
            this.direction = ScrollSpy.DIRECTION_UP;
        }
    }
}

ScrollSpy.DIRECTION_UP = 1;

ScrollSpy.DIRECTION_DOWN = 2;