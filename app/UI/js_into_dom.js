export const create_HTML = (obj, parent) => {
    const element = document.createElement(obj['html']);
    for (const key in obj) {
        if (key === 'textContent') {
            element.textContent = obj['textContent'];
        }
        if (key !== 'html' && key !== 'textContent' && key !== 'children' && key !== 'style') {
            element.setAttribute(key, obj[key]);
        }
        if (key === 'children') {
            for (const child_key in obj['children']) {
                create_HTML(obj['children'][child_key], element);
            }
        }
    }
    parent.appendChild(element);
}