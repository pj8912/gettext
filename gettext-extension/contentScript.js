function createModal() {
  const modal = document.createElement('div');
  modal.className = 'extension-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button id="closeButton" class="close-button">&times;</button>
      <div id="spinner" class="spinner" style="display: none;"></div>
      <p id="responseText"></p>
      <button id="copyButton" style="display: none;">Copy Text</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('closeButton').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  return modal;
}

function showSpinner() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
}

function hideSpinner() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
}

function updateModalContent(text) {
  const responseText = document.getElementById('responseText');
  responseText.textContent = text;

  const copyButton = document.getElementById('copyButton');
  copyButton.style.display = 'block';
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    });
  });

  hideSpinner();
}

function closeModal() {
  const modal = document.querySelector('.extension-modal');
  if (modal) {
    document.body.removeChild(modal);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUrl") {
    sendResponse({ url: window.location.href });
  } else if (request.action === "showModal") {
    closeModal(); // Close any existing modal before creating a new one
    createModal();
  } else if (request.action === "startSpinner") {
    showSpinner();
  } else if (request.action === "updateContent") {
    updateModalContent(request.data);
  }
});
