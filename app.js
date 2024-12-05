import { renderField, renderForm } from "./field.js"

renderForm(
    {
        controls: {
            onSave: (state) => {
                console.log("implement save state: " + state)
            },
            onClear: (state) => {
                state = {
                    nev: "",
                    eletkor: "",
                    email: ""
                }
                document.querySelectorAll('#app input').forEach(input => {
                    input.value = "";
                });
                document.getElementById('state').innerHTML = Object.entries(state).map(([key, value]) => `${key}: ${value}`).join("<br/>");
            }
        },
        showState: true,
        labelOnTop: false,
        fields: [
    {
        id: "nev",
        type: "text",
        label: "Név"
    },
    {
        id: "eletkor",
        type: "number",
        label: "Életkor"
    },
    {
        id: "email",
        type: "email",
        label: "Email"
    }
]})