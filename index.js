const btns = document.querySelector("#btns");
const input = document.querySelector("#input");
const output = document.querySelector("#output");

let inputstr = "";
let equalpressed = false;

btns.addEventListener("click", (e) => {
    let c = e.target.innerText;

    if (c.length <= 2) {
        if (c == "=") {
            try {
                let res = eval(inputstr);
                output.value = res;
                equalpressed = true;
            } catch {
                output.value = "Error";
            }
        }
        else if (c == "%") {
            let match = inputstr.match(/(\d+\.?\d*)$/);

            if (match) {
                let num = match[0];
                let percentValue = "(" + num + "/100)";
                inputstr = inputstr.replace(/(\d+\.?\d*)$/, percentValue);
                input.value = inputstr;
            }

            equalpressed = false;
        }
        else if (isoperator(c)) {
            if (inputstr === "") return; // start me operator na lage

            if (!isoperator(inputstr[inputstr.length - 1])) {
                inputstr += c;
                input.value = inputstr;
            } else {
                alert("operator cannot come after operator");
            }
            equalpressed = false;
        }
        else if (c == ".") {
            let i = inputstr.length - 1;
            let decimalfound = false;

            while (i >= 0 && !isoperator(inputstr[i])) {
                if (inputstr[i] == ".") {
                    decimalfound = true;
                }
                i--;
            }

            if (decimalfound) {
                alert("a number cannot have two decimal");
            } else {
                inputstr += c;
                input.value = inputstr;
            }
            equalpressed = false;
        }
        else if (c == "C") {
            inputstr = inputstr.substring(0, inputstr.length - 1);
            input.value = inputstr;
            equalpressed = false;
        }
        else if (c == "CE") {
            inputstr = "";
            input.value = "";
            output.value = "";
            equalpressed = false;
        }
        else {
            if (equalpressed) {
                inputstr = "";
                output.value = "";
                input.value = "";
                inputstr += c;
                input.value = inputstr;
                equalpressed = false;
            } else {
                inputstr += c;
                input.value = inputstr;
            }
        }
    }
});

function isoperator(c) {
    return c == "+" || c == "-" || c == "*" || c == "/";
}
