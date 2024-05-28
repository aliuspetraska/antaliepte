
function createDivWithText(text) {
    const  newElement = document.createElement("div");
    newElement.innerHTML += `${text}<br/>`;

    return newElement
}

function outputToId(text, id) {
    id = id || 'body'
    document.getElementById(id).append(createDivWithText(text));
}

function outputToBody(text) {
    outputToId(text, 'body')
}

function outputToError(text) {
    outputToId(text, 'error')
}
