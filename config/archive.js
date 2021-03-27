// require modules
import { createWriteStream } from 'fs';
import archiver from 'archiver';
import { join, } from 'path';

// create a file to stream archive data to.
const output = createWriteStream(join(process.cwd(), 'objekt', 'sketch.zip'));
const archive = archiver('zip');

output.on('close', function() {
    console.log('Objekt <sketch.zip> created!');
});

// pipe archive data to the file
archive.pipe(output);

archive.directory(join(process.cwd(), 'public'), false);

archive.finalize();
