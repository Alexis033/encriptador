const $form = document.querySelector("form");
const $input = document.querySelector(".input-text");
const $resultDefault = document.querySelector(".result-default");
const $result = document.querySelector(".result-text");
const $buttonCopy = document.querySelector("#button-copy");
const $buttonClose = document.querySelector(".button-close");

function encriptar(text) {
  text = text.toLowerCase();
  let secretText = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "e") {
      secretText[i] = "enter";
    } else if (text[i] === "i") {
      secretText[i] = "imes";
    } else if (text[i] === "a") {
      secretText[i] = "ai";
    } else if (text[i] === "o") {
      secretText[i] = "ober";
    } else if (text[i] === "u") {
      secretText[i] = "ufat";
    } else {
      secretText[i] = text[i];
    }
  }
  secretText = secretText.join("");
  return secretText;
}

function desencriptar(code) {
  let text = code;

  if (text.includes("enter")) {
    text = text.replace(/enter/g, "e");
  }
  if (text.includes("imes")) {
    text = text.replace(/imes/g, "i");
  }
  if (text.includes("ai")) {
    text = text.replace(/ai/g, "a");
  }
  if (text.includes("ober")) {
    text = text.replace(/ober/g, "o");
  }
  if (text.includes("ufat")) {
    text = text.replace(/ufat/g, "u");
  }

  return text;
}

function copyText() {
  navigator.clipboard
    .writeText($result.textContent)
    .then(() => {
      $buttonCopy.classList.add("copied");
      setTimeout(() => {
        $buttonCopy.classList.remove("copied");
      }, 1000);
    })
    .catch(() => {});
}
function deleteText() {
  $input.value = "";
  $input.focus();
  $buttonClose.classList.add("hiden");
}
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $input.value;
  let action = e.submitter.value;
  let result = "";

  if (text === "") {
    $resultDefault.classList.remove("hiden");
    $buttonCopy.classList.add("hiden");
    $result.classList.add("hiden");
    return;
  } else if (action === "Encriptar") {
    const encryptedText = encriptar(text);
    result = encryptedText;
  } else if (action === "Desencriptar") {
    const decryptedText = desencriptar(text);
    result = decryptedText;
  }
  $resultDefault.classList.add("hiden");
  $buttonCopy.classList.remove("hiden");
  $result.classList.remove("hiden");
  $result.innerHTML = result;
});

$buttonCopy.addEventListener("click", copyText);

$buttonClose.addEventListener("click", deleteText);

$input.addEventListener("input", () => {
  if ($input.value !== "") {
    $buttonClose.classList.remove("hiden");
    console.log($input.value);
  } else {
    $buttonClose.classList.add("hiden");
    console.log("$input.value");
  }
});
