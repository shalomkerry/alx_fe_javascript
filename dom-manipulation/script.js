let quotes = [
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
  if (localStorage.length > 0) {
    quotes = JSON.parse(localStorage.getItem("quotes"));
  }
  let quote = quotes[i].quote;
  let element = document.createElement("p");
  element.textContent = quote;

  showingArea.appendChild(element);
  i++;
}
function clearQuotes() {
  showingArea.innerHTML = "";
}

function createAddQuoteForm() {
  const newQuote = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  let newQuoteText = newQuote.value;
  let categoryText = newQuoteCategory.value;

  if (newQuoteText && categoryText) {
    quotes.push({
      quote: newQuoteText,
      category: categoryText,
    });
    showingArea.innerHTML = `<p>Quote:${newQuoteText}<br> Category:${categoryText}</p>`;
    newQuote.value = "";
    newQuoteCategory.value = "";
    localStorage.setItem("quotes", JSON.stringify(quotes));
  } else {
    alert("Ensure to fill both the inputs");
  }
}

button.addEventListener("click", showRandomQuote);
