module.exports = {
    green,
    IS_ACCESSIBLE: green('is accessible'),
    EXPECTS: green('expects'),
    WORKS: green('works'),
    SENDS: green('sends'),
    CALLS: green('calls'),
    DELIVERS: green('delivers'),
    RETURNS: green('returns'),
    RESOLVES: green('resolves'),

    red,
    FAILS: red('FAILS'),
    REJECTS: red('REJECTS'),

    bold,
    ASYNC: bold('async'),
};

// See https://en.wikipedia.org/wiki/ANSI_escape_code#Select_Graphic_Rendition_parameters

function green(text) {
    return `\x1b[0;92m${text}\x1b[0;90m`;
}

function red(text) {
    return `\x1b[0;91m${text}\x1b[0;90m`;
}

function bold(text) {
    return `\x1b[1;93m${text}\x1b[0;90m`;
}
