const quotes = [
  {
    quote:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    category: "programming",
  },
  {
    quote: "Inspiring.",
    category: "inspiring",
  },
  {
    quote: "spiritual",
    category: "spiritual",
  },
];

const button = document.getElementById("newQuote");
const showingArea = document.getElementById("quoteDisplay");

function showRandomQuote() {
  clearQuotes();
  let len = quotes.length;
  let i = Math.floor(Math.random() * len);
  console.log(i);
  let quote = quotes[i].quote;
  let element = document.createElement("p");
  element.textContent = quote;

  showingArea.appendChild(element);
  i++;
}
function clearQuotes() {
  showingArea.innerHTML = "";
}

function addQuote() {
  const newQuote = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuote && newQuoteCategory) {
    quotes.push({
      quote: newQuote,
      category: newQuoteCategory,
    });
    showingArea.innerHTML = `<p>${newQuote}~${newQuoteCategory}</p>`;
  } else {
    alert("Ensure to fill both the inputs");
  }
}
