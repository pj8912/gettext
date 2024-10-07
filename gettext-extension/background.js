chrome.action.onClicked.addListener((tab) => {
  // First, show the modal immediately
  chrome.tabs.sendMessage(tab.id, { action: "showModal" });

  // Then, get the URL and start the spinner
  chrome.tabs.sendMessage(tab.id, { action: "getUrl" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    // Start the spinner
    chrome.tabs.sendMessage(tab.id, { action: "startSpinner" });
    
    // Now fetch the data
    fetch('http://localhost:5000/siteurl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: response.url }),
    })
    .then(response => response.json())
    .then(data => {
      // Update the modal content with the received data
      chrome.tabs.sendMessage(tab.id, { action: "updateContent", data: data.response });
    })
    .catch(error => {
      console.error('Error:', error);
      // Update the modal content with the error message
      chrome.tabs.sendMessage(tab.id, { action: "updateContent", data: "An error occurred while fetching the data." });
    });
  });
});
