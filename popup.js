document.getElementById('grabResources').addEventListener('click', async () => {
  console.log('Grab Resources button clicked');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "grabResources" }, (response) => {
    console.log('Response received from content script:', response);
    if (response) {
      document.getElementById('result').textContent = `Found ${response.resourceCount} resources. Processing...`;
    } else {
      document.getElementById('result').textContent = 'Grabbing resources, please wait...';
      console.log('No response from content script');
    }
  });
});

console.log('Popup script loaded');
