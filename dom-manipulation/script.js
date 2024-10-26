document.addEventListener("DOMContentLoaded", function () {
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
  const downloadButton = document.getElementById("download");
  const insertButton = document.getElementById("insertBtn");
  const choice = document.getElementById("categoryFilter");

  let i = 0;

  function showRandomQuote() {
    clearQuotes();
    let len = quotes.length;
    console.log(i);

    if (localStorage.length > 0) {
      quotes = JSON.parse(localStorage.getItem("quotes"));
    }
    let quote = quotes[i].quote;
    let element = document.createElement("p");
    element.textContent = quote;

    showingArea.appendChild(element);
    i++;

    if (i >= len) {
      i = 0;
    }
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

  function createDownloadLink() {
    let fetchData = localStorage.getItem("quotes");
    if (fetchData) {
      const jsonBlob = new Blob([fetchData], {
        type: "application/json",
      });
      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data/json";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      console.log("No Data Found in local Storage");
    }
  }

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      let jsonQuotes = JSON.parse(event.target.result);
      quotes.push(...jsonQuotes);
      saveQuotes();
      alert("succesfully imported your files");
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function filterQuotes() {
    let array = JSON.parse(localStorage.getItem("quotes"));
  }

  insertButton.addEventListener("click", createAddQuoteForm);
  downloadButton.addEventListener("click", createDownloadLink);
  button.addEventListener("click", showRandomQuote);
  choice.addEventListener("change", filterQuotes);
});
