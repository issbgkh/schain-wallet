const schain = require('schain_sdk');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " USERNAME");
    process.exit(-1);
}
const username = process.argv[2];


const CHAINCODE_ID = 'app-d3645cde-bef0-43ee-98e3-caf153de2247'
const APIKEY = '1e955967c9b3c5d2bcf67bce5ac33c6d'

const REGISTER = 0;
const BALANCE_OF = 1;
const TRANSFER = 2;
const APPROVE = 3;
const ALLOWANCE = 4;
const TRANSFER_FROM = 5;
const EXIT = 99;


var recursiveAsyncReadLine = function() {
    readline.question('Welcome to "' + username + '" wallet\n\
        [0] register new user\n\
        [1] show balance\n\
        [2] transfer\n\
        [3] approve (authorise someone transfer token from your account)\n\
        [4] allowance (query approved tokens by the owner)\n\
        [5] transferFrom (withdraw token from authorise account)\n\
        [99] exit\n\
         => ', async function(cmd) {

        let token;
        let confirm;
        let tokenOwner;
        switch (parseInt(cmd)) {
            case REGISTER:
                console.log("press 'q' to exit input");
                let newUser = await askQuestion("please input new user => ") || 'q';

                if (newUser.toLowerCase() !== 'q') {
                    try {
                        let result = await schain.register(newUser, APIKEY);
                        showRep(result);
                    } catch (e) {
                        showError(e);
                    }
                }

                recursiveAsyncReadLine();
                break;

            case BALANCE_OF:
                try {
                    let result = await schain.queryChainCode(APIKEY, CHAINCODE_ID, username, 'balanceOf', '["' + username + '"]');
                    showRep(result);
                } catch (e) {
                    showError(e);
                }
                recursiveAsyncReadLine();
                break;

            case TRANSFER:
                console.log("press 'q' to exit input");
                try {
                    let target = await askTarget();
                    let token = await askToken();
                    await askConfirm("transfer $" + token + " to '" + target);

                    let result = await schain.invokeChainCode(APIKEY, CHAINCODE_ID, username, 'transfer', '["' + target + '","' + token + '"]');
                    showRep(result);
                } catch (e) {
                    if (e.message !== 'quit') {
                        showError(e);
                    }
                }

                recursiveAsyncReadLine();
                break;

            case APPROVE:
                console.log("press 'q' to exit input");

                try {
                    let spender = await askSpender();
                    let token = await askToken();
                    await askConfirm("authorise '" + spender + "' transfer $" + token);

                    let result = await schain.invokeChainCode(APIKEY, CHAINCODE_ID, username, 'approve', '["' + spender + '","' + token + '"]');
                    showRep(result);
                } catch (e) {
                    if (e.message !== 'quit') {
                        showError(e);
                    }
                }

                recursiveAsyncReadLine();
                break;

            case ALLOWANCE:
                console.log("press 'q' to exit input");

                try {
                    let tokenOwner = await askTokenOwner();
                    let result = await schain.queryChainCode(APIKEY, CHAINCODE_ID, username, 'allowance', '["' + tokenOwner + '","' + username + '"]');
                    showRep(result);
                } catch (e) {
                    if (e.message !== 'quit') {
                        showError(e);
                    }
                }
                recursiveAsyncReadLine();

                break;

            case TRANSFER_FROM:
                console.log("press 'q' to exit input");

                try {
                    let tokenOwner = await askTokenOwner();
                    let token = await askToken();
                    let result = await schain.invokeChainCode(APIKEY, CHAINCODE_ID, username, 'transferFrom', '["' + tokenOwner + '","' + username + '","' + token + '"]');
                    showRep(result);
                } catch (e) {
                    if (e.message !== 'quit') {
                        showError(e);
                    }
                }
                recursiveAsyncReadLine();

                break;
            case EXIT:
                process.exit(-1);
                break;
            default:
                try {
                    let result = await schain.queryChainCode(APIKEY, CHAINCODE_ID, username, 'balanceOf', '["' + username + '"]');
                    showRep(result);
                } catch (e) {
                    showError(e);
                }
                recursiveAsyncReadLine();

        }

    })
};

recursiveAsyncReadLine();



async function askTarget() {
    let target = await askQuestion("transfer target? => ") || 'q';
    if (target.toLowerCase() === 'q') {
        throw new Error('quit');
    }
    return target;
}

async function askToken() {
    let token = await askQuestion("token? => ") || 'q';
    if (token.toLowerCase() === 'q') {
        throw new Error('quit');
    } else if (isNaN(parseInt(token)) || parseInt(token) < 0) {
        throw new Error("uncorrect token");
    }
    return token;
}

async function askConfirm(operation) {
    let confirm = await askQuestion(operation + "? [y/N]=> ") || 'N';
    if (confirm.toLowerCase() !== 'y') {
        throw new Error('quit');
    }
}

async function askSpender() {
    let spender = await askQuestion("spender? => ") || 'q';
    if (spender.toLowerCase() === 'q') {
        throw new Error('quit');
    }
    return spender;
}

async function askTokenOwner() {
    let tokenOwner = await askQuestion("tokenOwner? => ") || 'q';
    if (tokenOwner.toLowerCase() === 'q') {
        throw new Error('quit');
    }
    return tokenOwner;
}

function askQuestion(query) {
    return new Promise(resolve => readline.question(query, ans => {
        //rl.close();
        resolve(ans);
    }))
}


function showRep(rep) {
    console.log("\n\nResponse(" + new Date() + "):\n%s\n\n", JSON.stringify(rep, null, 2));
}

function showError(e) {
    console.error("\n\nError:\n%s\n\n", e);
}
