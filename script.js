const form = document.getElementById("imcForm");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const resultSection = document.getElementById("result");
const imcValue = document.getElementById("imcValue");
const imcText = document.getElementById("imcText");
const clearBtn = document.getElementById("clearBtn");

// Carregar último resultado salvo
window.addEventListener("load", () => {
  const savedIMC = JSON.parse(localStorage.getItem("lastIMC"));
  if (savedIMC) showResult(savedIMC.value, savedIMC.text, savedIMC.color);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value) / 100; // converter cm para m

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert("Por favor, insira valores válidos!");
    return;
  }

  const imc = (weight / (height ** 2)).toFixed(1);
  let text = "";
  let color = "";

  if (imc < 18.5) {
    text = "Abaixo do peso";
    color = "#3b82f6";
  } else if (imc < 24.9) {
    text = "Peso normal";
    color = "#4ade80";
  } else if (imc < 29.9) {
    text = "Sobrepeso";
    color = "#f59e0b";
  } else {
    text = "Obesidade";
    color = "#ef4444";
  }

  showResult(imc, text, color);

  // Salvar localmente
  localStorage.setItem("lastIMC", JSON.stringify({ value: imc, text, color }));
});

function showResult(imc, text, color) {
  imcValue.textContent = imc;
  imcText.textContent = text;
  resultSection.classList.remove("hidden");
  resultSection.style.border = `2px solid ${color}`;
  imcValue.style.color = color;
  imcText.style.color = color;
}

clearBtn.addEventListener("click", () => {
  form.reset();
  resultSection.classList.add("hidden");
  localStorage.removeItem("lastIMC");
});