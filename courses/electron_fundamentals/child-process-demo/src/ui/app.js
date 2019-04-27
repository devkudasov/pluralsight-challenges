const fs = require('fs');
const exec = require('child_process').exec;
const os = require('os');

function isDir(dir) {
    try {
        return fs.lstatSync(dir).isDirectory();
    } catch (e) {
        return false;
    }
}

function checkGitStatus(dir) {
    exec('git status', {
        cwd: dir
    }, (err, stdout, stderr) => {
        debugger;
        if (err) setStatus('unknown');

        if (/nothing to commit/.test(stdout)) setStatus('clean');
        
        setStatus('dirty');
    });
}

function formatDir(dir) {
    return /^~/.test(dir)
        ? os.homedir() + dir.substr(1).trim()
        : dir.trim();
}

function removeStatus() {
    document.getElementById('status').classList.remove('unknown', 'clean', 'dirty');
}

function setStatus(status) {
    removeStatus();
    document.getElementById('status').classList.add(status);
}

let timer = null;
document.getElementById('input').addEventListener('keyup', event => {
    removeStatus();
    
    clearTimeout(timer);

    setTimeout(_ => {
        const dir = formatDir(event.target.value);

        if (isDir(dir)) {
            checkGitStatus(dir);
        }
    }, 500);
});