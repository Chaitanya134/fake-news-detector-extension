(initExtension)();

function initExtension() {
    const container = document.createElement('div');
    container.id = 'extension-container';
    container.className = 'extension-container';
    const fakeMetric = document.createElement('span');
    fakeMetric.id = 'fake-metric';
    fakeMetric.className = 'fake-metric';
    fakeMetric.textContent = "";
    const removeTextBtn = document.createElement('button');
    removeTextBtn.id = 'remove-text-btn';
    removeTextBtn.className = 'remove-text-btn';
    removeTextBtn.textContent = 'Remove text';
    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-btn';
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'Close';
    closeBtn.onclick = function () {
        container.style.display = "none";
    }
    container.append(fakeMetric, removeTextBtn, closeBtn);
    document.body.append(container);
}

function replaceText(element, text) {
    if (element.hasChildNodes()) {
        element.childNodes.forEach((child) => replaceText(child, text));
    } else if (element.nodeType === Text.TEXT_NODE) {
        const regex = new RegExp(text, 'gi');
        console.log(text);
        element.textContent = element.textContent.replace(regex, '');
    }
}

let prevText = "";

document.addEventListener('mouseup', (e) => {
    const [selectedText, selectedElement] = getSelectedText();
    if (!selectedText || selectedText.length < 10 || prevText === selectedText) return;
    document.getElementById("extension-container").style.transform = `translateX(-50%)`;
    document.getElementById("extension-container").style.display = "flex";

    const fake = Math.floor(Math.random() * 100);
    document.getElementById("fake-metric").textContent = `This text is ${fake}% Fake!`;
    // remove selected text
    document.getElementById("remove-text-btn").onclick = function (e) {
        replaceText(document.body, selectedText);
    }
    prevText = selectedText;
});

function getSelectedText() {
    if (window.getSelection().toString().length){
        let selectedText = window.getSelection().toString();
        selectedText = selectedText.replace(/\n/g, ' ');
        selectedText = selectedText.trim();
        const selectedElement = window.getSelection().anchorNode.parentElement;
        return [selectedText ?? "", selectedElement];
    }
    return ["", ""]
}