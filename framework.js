import db from 'just-debounce';

export const render = (sketch, settings = { animate: false }) => {
    // ** CANVAS SETUP **/
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const creator = new URLSearchParams(window.location.search).get('creator') || 'creator';
    const viewer = new URLSearchParams(window.location.search).get('viewer') || 'viewer';

    const start = new Date().getTime();

    let parameters = { canvas, context, width: 0, height: 0, creator, viewer, seconds: 0, millis: 0 };

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        parameters.width = window.innerWidth;
        parameters.height = window.innerHeight;
    };

    const onResize = db(function() {
        resize();

        if (!settings.animate) {
            const draw = sketch(parameters);

            draw(parameters);
        }
    }, 100, false, true);

    resize();

    window.addEventListener('resize', onResize);

    // ** RUN SETUP **/
    const draw = sketch(parameters);

    // ** RUN DRAW **/
    const drawLoop = () => {
        const elapsed = new Date().getTime() - start;

        parameters.seconds = elapsed / 1000;
        parameters.millis = elapsed;

        draw(Object.assign(parameters));

        window.requestAnimationFrame(drawLoop);
    }

    if (settings.animate) {
        drawLoop(parameters);
    } else {
        draw(parameters);
    }
}
