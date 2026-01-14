export const Eraser = {
    GOAWAY() {
        const things = document.querySelector(
            ".col-lg-4.mt-2.mt-lg-0.order-2.order-lg-1"
        );
        Object.assign(things.style, {
            display: 'none'
        });
    }
};