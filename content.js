let resources = new Set();
let observer;

function addResource(type, content) {
  resources.add(JSON.stringify({ type, content }));
}

function grabResources() {
  let resources = [];

  // Get HTML
  resources.push({
    type: 'text/html',
    content: document.documentElement.outerHTML
  });

  // Get CSS
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    resources.push({
      type: 'text/css',
      content: link.href
    });
  });

  // Get JavaScript
  document.querySelectorAll('script[src]').forEach(script => {
    resources.push({
      type: 'application/javascript',
      content: script.src
    });
  });

  console.log('Resources grabbed:', resources.length);
  return resources;
}

function startObserving() {
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        grabResources();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function stopObserving() {
  if (observer) {
    observer.disconnect();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === "grabResources") {
    const resources = grabResources();
    console.log('Sending response with resource count:', resources.length);
    sendResponse({ resourceCount: resources.length });
    console.log('Sending message to background script');
    chrome.runtime.sendMessage({ 
      action: "processResources", 
      resources: resources 
    });
  }
  return true; // Keep the message channel open for asynchronous response
});

console.log('Content script loaded');
