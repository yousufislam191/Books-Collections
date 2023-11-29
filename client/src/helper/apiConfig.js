let apiHostName;

if (window.location.hostname === "localhost") {
  apiHostName = "http://localhost:5000/api"; // Set your local API URL here
} else {
  apiHostName =
    "https://books-collections-pi17g9rzc-yousufislam191.vercel.app/api"; // Set your Vercel API URL here
}

export default apiHostName;
