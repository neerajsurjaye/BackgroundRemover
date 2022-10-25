const jimp = require('jimp');

let scripts = (() => {

    const getCss = (req, res) => {
        res.sendfile('./style.css', { root: __dirname });
    }

    const handleFile = async (req, res) => {
        console.log("ran handlefile");
        // console.log(req.file.buffer);

        if (!req.file) {
            res.send("Error : contact developer");
            return;
        }

        const buffer = req.file.buffer;
        let image = await jimp.read(buffer);
        // console.log(image);

        let width = image.getWidth();
        let height = image.getHeight();

        // console.log({ width, height });

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {

                // console.log({ x, y }, image.getPixelColour(x, y).toString(16));
                let color = image.getPixelColor(x, y).toString(16);

                if (color == "ffffffff") {
                    image.setPixelColor(0xffff0000, x, y);
                }

            }
        }

        const imageBuffer = await image.getBufferAsync(jimp.AUTO);
        await image.writeAsync("./image.png");

        // console.log(imageBuffer);

        res.set({
            "Content-Type": "file",
            "Content-Disposition": "attachment; filename=image.png"
        });
        res.end(imageBuffer);



    }

    const home = (req, res) => {
        res.sendFile('home.html', { root: __dirname });
    }


    return { handleFile, home, getCss }

})();

module.exports = scripts;