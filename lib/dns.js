
function isIPv6(addr) {
    // TODO: This is stupid
    return addr.indexOf(':') > -1;
}

async function lookup(host, options, cb) {
    if (!cb) {
        cb = options;
        options = {};
    }
    const all = !!options.all;
    const opts = [];
    if (options.family === 4) {
        opts.push('disable_ipv6')
    } else if (options.family === 6) {
        opts.push('disable_ipv4')
    }
    try {
        const result = await browser.dns.resolve(host, opts);
        if (all) {
            cb(null, result.addresses.map(address => ({ address, family: isIPv6(address) ? 6 : 4 })));
        } else {
            cb(null, resultaddresses[0], isIPv6(result));
        }
    } catch (e) {
        cb(e);
    }
}

async function resolve4(hostname, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    const address = await lookup(hostname, { family: 4, all: true });
    callback(null, address);
}

async function resolve6(hostname, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    const address = await lookup(hostname, { family: 6, all: true });
    callback(null, address);
}

async function resolveAny(hostname, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    const address = await lookup(hostname, { all: true });
    callback(null, address.map(addr => ({ address: addr })));
}

function resolve(hostname, rrtype, callback) {
    if (!callback) {
        callback = rrtype;
        rrtype = 'A';
    }
    const returnFirstResult = (err, r) => callback(err, r && r[0]);
    switch(rrtype) {
        case 'A':
            resolve4(hostname, returnFirstResult);
            break;
        case 'AAAA':
            resolve6(hostname, returnFirstResult);
            break;
        case 'ANY':
            resolveAny(hostname, returnFirstResult);
            break;
    }
}

module.exports = {
    resolve,
    lookup,
    resolveAny,
    resolve4,
    resolve6,
};
