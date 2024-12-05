function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

let formState = {
    nev: "",
    eletkor: "",
    email: ""
}

export function renderForm({ controls, showState, labelOnTop, fields }) {
    if(!fields) return;

    if(showState) {
        let state = document.createElement('p')
        state.id = "state"
        state.innerHTML = Object.entries(formState).map(([key, value]) => `${key}: ${value}`).join("<br/>");
        document.getElementById('app').appendChild(state);
    }
    let savedFields = [];
    fields.forEach(element => {
        savedFields.push(renderField({ 
            state: formState, 
            id: element.id, 
            type: element.type, 
            label: element.label, 
            labelOnTop 
        }));
    });

    if(controls != null && controls.onSave && controls.onClear) {
        let buttonDiv = document.createElement('div')
        buttonDiv.className = "buttonDiv"

        let save = document.createElement('button');
        save.className = "save"
        save.innerText = "Save"
        buttonDiv.appendChild(save);


        let clear = document.createElement('button');
        clear.className = "clear"
        clear.innerText = "Clear"
        buttonDiv.appendChild(clear);

        save.onclick = () => {
            controls.onSave(formState)
        };

        clear.onclick = () => {
            controls.onClear(formState)
        };

        document.getElementById('app').appendChild(buttonDiv)
    }
}

export function renderField({ state, id, type, label, labelOnTop }) {
    let element = null;

    console.log(type)

    switch(type) {
        case "text":
            element = renderText();
            break;
        case "number":
            element = renderNumber();
            break;
        case "email":
            element = renderEmail(id, state);
            break;
        default:
            element = renderDefault();
            break;
    }
    
    console.log(element)

    element.type = type
    element.id = id

    const newElement = document.createElement('label')
    newElement.htmlFor = id
    newElement.innerText = label

    let holderDiv = document.createElement('div')
    
    holderDiv.appendChild(newElement)
    holderDiv.appendChild(element)
    element = holderDiv

    holderDiv.className = labelOnTop ? "labelOnTop" : "labelInline"
    
    
    element.value = state[id] || "";

    if(type == "number") {
        element.addEventListener('keydown', (event) => {
            if(isNaN(event.key) && event.key != "Backspace") {
                event.preventDefault();
            }
        })
    }

    if(document.getElementsByTagName('input') && type != "email") {
        element.addEventListener('input', (event) => {
            state[id] = event.target.value;
            console.log(`state: ${JSON.stringify(state)}`);
            document.getElementById('state').innerHTML = Object.entries(formState).map(([key, value]) => `${key}: ${value}`).join("<br/>");
        });
    }

    if(holderDiv) {
        document.getElementById('app').appendChild(holderDiv)
    } else {
        document.getElementById('app').appendChild(newElement)
    }

    return element;
}

function renderText() {
    const element = document.createElement('input')
    element.type = "text"
    return element
}

function renderNumber() {
    const element = document.createElement('input')
    element.type = "number"
    return element
}

function renderEmail(id, state) {
    const parentDiv = document.createElement('div')

    const localInput = document.createElement('input')
    localInput.type = "text"

    const at = document.createElement('span');
    at.textContent = '@';

    const domainInput = document.createElement('input')
    domainInput.type = "text"

    const emailParts = state[id] ? state[id].split('@') : [];
    localInput.value = emailParts[0] || "";
    domainInput.value = emailParts[1] || "";

    parentDiv.append(localInput, at, domainInput)

    localInput.addEventListener('input', () => {
        state[id] = `${localInput.value}@${domainInput.value}`;
        console.log(`state: ${JSON.stringify(state)}`);
        document.getElementById('state').innerHTML = Object.entries(formState).map(([key, value]) => `${key}: ${value}`).join("<br/>");
    });

    domainInput.addEventListener('input', () => {
        state[id] = `${localInput.value}@${domainInput.value}`;
        console.log(`state: ${JSON.stringify(state)}`);
        document.getElementById('state').innerHTML = Object.entries(formState).map(([key, value]) => `${key}: ${value}`).join("<br/>");
    });

    return parentDiv
}

function renderDefault() {
    const element = document.createElement('div')
    return element
}