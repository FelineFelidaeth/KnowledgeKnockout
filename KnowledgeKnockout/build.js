const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);


if (fs.existsSync(dir + '\\dist')) {
    deleteFolderRecursive(dir + '\\dist');
}

fs.mkdirSync(dir + '\\dist');

fs.copyFileSync(dir + '\\.env', dir + '\\dist\\.env');

copyFolderSync(dir + '\\public', dir + '\\dist\\public');
copyFolderSync(dir + '\\views', dir + '\\dist\\views');

function copyFolderSync(from, to) { // https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js#answer-52338335
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            if (!/^.*\.ts$/.test(path.join(from, element))) fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}


function deleteFolderRecursive(path_) { // https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty#answer-32197381
    if (fs.existsSync(path_)) {
        fs.readdirSync(path_).forEach((file, index) => {
            const curPath = path.join(path_, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path_);
    }
};