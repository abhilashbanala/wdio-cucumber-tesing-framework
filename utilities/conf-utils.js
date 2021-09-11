const {
    dev,
    qa,
    uat
} = require('../test/config/environments.conf.js');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function getTags() {
    if (argv.tags != undefined) {
        return argv.tags
    }
    return 'not @Pending'
}

function getFeatures() {
    if (argv.feature != undefined) {
        return ['./test/features/' + argv.features]
    }
    return ['./test/features/**/*.feature']
}

function getEnvironmentVariables() {
    switch (argv.env) {
        case 'dev':
            return dev;
        case 'qa':
            return qa;
        case 'uat':
            return uat;
        default:
            return dev;
    }
}

module.exports = {
    getTags,
    getFeatures,
    getEnvironmentVariables
}