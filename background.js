importScripts('jszip.min.js');

function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

function getFileExtension(type) {
  const extensions = {
    'text/html': 'html',
    'text/css': 'css',
    'application/javascript': 'js'
  };
  return extensions[type] || 'txt';
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);
  if (request.action === "processResources") {
    processResources(request.resources).then(() => {
      sendResponse({ message: "Resources processing completed" });
    });
    return true; // Keep the message channel open for asynchronous response
  }
});

async function processResources(resources) {
  console.log(`Received ${resources.length} resources`);
  
  const zip = new JSZip();
  const downloadedUrls = new Set();
  const fetchPromises = [];

  resources.forEach((resource, index) => {
    console.log(`Processing resource ${index}:`, resource);
    if (resource.content.startsWith('http') && !downloadedUrls.has(resource.content)) {
      downloadedUrls.add(resource.content);
      const filename = sanitizeFilename(resource.content.split('/').pop() || `resource_${index}.${getFileExtension(resource.type)}`);
      const fetchPromise = fetch(resource.content)
        .then(response => response.blob())
        .then(blob => zip.file(filename, blob))
        .catch(error => console.error(`Error fetching ${resource.content}: ${error}`));
      fetchPromises.push(fetchPromise);
    } else if (!resource.content.startsWith('http')) {
      const filename = `resource_${index}.${getFileExtension(resource.type)}`;
      zip.file(filename, resource.content);
    }
  });

  console.log('All resources added to zip, starting Promise.all');
  await Promise.all(fetchPromises);
  console.log('All fetch promises resolved, generating zip');
  const content = await zip.generateAsync({type:"blob"});
  console.log('Zip generated, initiating download');
  
  const reader = new FileReader();
  reader.onload = function() {
    chrome.downloads.download({
      url: reader.result,
      filename: 'resources.zip',
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
      } else {
        console.log('Download started with ID:', downloadId);
      }
    });
  };
  reader.readAsDataURL(content);
}

console.log('Background script loaded');
