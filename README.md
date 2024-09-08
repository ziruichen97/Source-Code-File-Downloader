# Source Code File Downloader

## Description
Source Code File Downloader is a Chrome extension that allows users to download source code files from web pages. It collects HTML, CSS, and JavaScript resources from the current page and packages them into a convenient ZIP file for download.

## Features
- Automatically detects and collects source code files from the current web page
- Packages collected files into a ZIP archive
- Supports HTML, CSS, and JavaScript files
- Easy-to-use popup interface

## Installation
1. Clone this repository or download the ZIP file and extract it
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files

## Usage
1. Navigate to a web page you want to download source files from
2. Click the Source Code File Downloader icon in your Chrome toolbar
3. Click the "Download Source Files" button in the popup
4. The extension will collect the files and initiate a download of the ZIP archive

## Files
- `manifest.json`: Extension configuration
- `background.js`: Background script for processing resources
- `content.js`: Content script for collecting resources from web pages
- `popup.html` and `popup.js`: User interface for the extension
- `jszip.min.js`: Library for creating ZIP archives

## Permissions
This extension requires the following permissions:
- `activeTab`: To access the current tab's content
- `downloads`: To initiate file downloads

## Privacy Policy
For information about data collection and usage, please refer to our [Privacy Policy](privacy-policy.md).

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For support or inquiries, please open an issue on this GitHub repository.