let apiHostName;

if (window.location.hostname === "localhost") {
  apiHostName = "http://localhost:5000/api"; // Set your local API URL here
} else {
  apiHostName = "https://books-collections.vercel.app/api"; // Set your Vercel API URL here
}

export default apiHostName;
