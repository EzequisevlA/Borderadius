const box = document.getElementById('box');
const cssCode = document.getElementById('cssCode');
const svg = document.getElementById('svg');
const handles = {
    tl: document.getElementById('tl'),
    tr: document.getElementById('tr'),
    br: document.getElementById('br'),
    bl: document.getElementById('bl')
};

const boxSize = 200;
let selectedHandle = null;

// Detecta qual handle está sendo arrastado
for (const key in handles) {
    handles[key].addEventListener('mousedown', () => {
        selectedHandle = key;
    });
}

document.addEventListener('mousemove', (e) => {
    if (!selectedHandle) return;
    const rect = svg.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Limitar o ponto dentro do SVG
    x = Math.max(0, Math.min(boxSize, x));
    y = Math.max(0, Math.min(boxSize, y));

    handles[selectedHandle].setAttribute('cx', x);
    handles[selectedHandle].setAttribute('cy', y);

    updateBorderRadius();
});

document.addEventListener('mouseup', () => {
    selectedHandle = null;
});

function updateBorderRadius() {
    // Pegar posição dos 4 pontos
    const tlX = parseFloat(handles.tl.getAttribute('cx'));
    const tlY = parseFloat(handles.tl.getAttribute('cy'));

    const trX = parseFloat(handles.tr.getAttribute('cx'));
    const trY = parseFloat(handles.tr.getAttribute('cy'));

    const brX = parseFloat(handles.br.getAttribute('cx'));
    const brY = parseFloat(handles.br.getAttribute('cy'));

    const blX = parseFloat(handles.bl.getAttribute('cx'));
    const blY = parseFloat(handles.bl.getAttribute('cy'));

    // Calcular valores relativos para border-radius (X e Y separados)
    const topLeftY = Math.round(tlY);
    const topRightY = Math.round(trY);
    const bottomRightY = Math.round(boxSize - brY);
    const bottomLeftY = Math.round(boxSize - blY);

    const topLeftX = Math.round(tlX);
    const topRightX = Math.round(boxSize - trX);
    const bottomRightX = Math.round(boxSize - brX);
    const bottomLeftX = Math.round(blX);

    const borderRadius = `${topLeftY}px ${topRightY}px ${bottomRightY}px ${bottomLeftY}px / ${topLeftX}px ${topRightX}px ${bottomRightX}px ${bottomLeftX}px`;

    box.style.borderRadius = borderRadius;
    cssCode.textContent = `border-radius: ${borderRadius};`;
}
