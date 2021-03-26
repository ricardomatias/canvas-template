import random from 'canvas-sketch-util/random';

export const settings = {
    animate: true
};

export const sketch = ({ creator, viewer, width, height, context }) => {
    // RUNS ONCE
    random.setSeed(`${creator}-${viewer}`);

    const count = 200;
    const theta = (random.range(Math.PI, Math.PI * 4.0)) / count;

    const size = Math.min(width, height) / 2;

    context.globalCompositeOperation = 'source-over';

    context.globalAlpha = 1.0;
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    return ({ context, seconds, width, height }) => {
        // RUNS CONTINUOUSLY
        context.globalCompositeOperation = 'lighter';

        context.strokeStyle = '#5a2e2e';
        context.lineWidth = 4.0;
        context.globalAlpha = 0.1;

        for (let i = 0; i < count; i++) {
            const s = size - (i * size /count);

            context.save();
            context.translate(width / 2, height / 2);
            context.rotate(seconds + theta * i);
            context.translate(-s / 2, -s / 2);

            context.strokeRect(0, 0, s, s);

            context.restore();
        }

        context.globalCompositeOperation = 'source-over';
        context.globalAlpha = 0.2;

        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
    };
}

