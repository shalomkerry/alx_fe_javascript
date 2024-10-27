document.addEventListener("DOMContentLoaded", function () {
  let quotes = [
    {
      quote:
        "Programs must be written for people to read, and only incidentally for machines to execute.",
      category: "programming",
    },
    {
      quote: "Inspiring.",
      category: "spiritual",
    },
    {
      quote: "spiritual",
      category: "spiritual",
    },
    {
      quote: "amazing",
      category: "spiritual",
    },
  ];

  Window.quotes = quotes;
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
  const browse = document.getElementById("importFile");
  browse.addEventListener("change", importFromJsonFile);
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

  function filterQuotes(event) {
    let currentCategory = event.target.value;

    let array = JSON.parse(localStorage.getItem("quotes"));

    function filterArray(arra, key, value) {
      return arra.filter((ele) => ele[key] === value);
    }
    let filtered = filterArray(array, "category", `${currentCategory}`);
    filtered.forEach((ele) => {
      let string = document.createElement("p");
      string.textContent = ele.quote;
      document.body.appendChild(string);
    });
  }
  function populateCategories() {
    quotes = JSON.parse(localStorage.getItem("quotes"));

    const allCategory = [...new Set(quotes.map((quote) => quote.category))];

    allCategory.forEach((ele) => {
      const option = new Option(`${ele}`, `${ele}`);
      choice.add(option);
    });
  }

  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((quote) => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
    filteredQuotes.forEach((quote) => {
      const quoteElement = document.createElement("div");
      quoteElement.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
      quoteDisplay.appendChild(quoteElement);
    });
    localStorage.setItem("selectedCategory", selectedCategory); // Save selected category
  }

  // Function to load the last viewed quote from session storage
  function loadLastViewedQuote() {
    const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
    if (lastViewedQuote) {
      const quote = JSON.parse(lastViewedQuote);
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
    }
  }

  // Function to restore the last selected category from local storage
  function restoreLastSelectedCategory() {
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
      document.getElementById("categoryFilter").value = lastSelectedCategory;
    }
  }

  // Function to fetch quotes from a server using a mock API
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ); // Replace with actual API URL
      const data = await response.json();
      quotes = data.map((item) => ({
        text: item.title,
        category: item.body.substring(0, 10),
      })); // Adapt mapping as necessary
      saveQuotes();
      populateCategoryFilter();
      filterQuotes();
    } catch (error) {
      console.error("Error fetching quotes from server:", error);
    }
  }

  // Function to post a new quote to a server using a mock API
  async function postQuoteToServer(quote) {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        // Replace with actual API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quote),
      });
    } catch (error) {
      console.error("Error posting quote to server:", error);
    }
  }

  // Function to sync quotes with the server and handle conflicts
  async function syncQuotes() {
    try {
      await fetchQuotesFromServer(); // Fetch new data from the server
      // Implement conflict resolution logic here (e.g., compare timestamps)
      // Example conflict resolution (simple version):
      const serverQuotes = quotes; // This should come from the server response
      const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

      // Simple conflict resolution: Server data overwrites local data
      if (serverQuotes.length > 0) {
        localStorage.setItem("quotes", JSON.stringify(serverQuotes));
        quotes = serverQuotes;
        populateCategoryFilter();
        filterQuotes();
        console.log("Quotes synced with server!");
      }
    } catch (error) {
      console.error("Error syncing quotes:", error);
    }
  }

  setInterval(syncQuotes, 60000);
  insertButton.addEventListener("click", createAddQuoteForm);
  downloadButton.addEventListener("click", createDownloadLink);
  button.addEventListener("click", showRandomQuote);
  choice.addEventListener("change", filterQuotes);
});
