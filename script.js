// Get references to DOM elements
const iconUrlInput = document.getElementById('icon-url');
const iconLabelInput = document.getElementById('icon-label');
const addIconButton = document.getElementById('add-icon-button');
const iconsContainer = document.getElementById('icons-container');
const backgroundInput = document.getElementById('background-url');
const setBackgroundButton = document.getElementById('set-background-button');
const toggleContainerButton = document.getElementById('toggle-container-button');
const container = document.querySelector('.container');

// Load icons from localStorage
function loadIcons() {
  const icons = JSON.parse(localStorage.getItem('icons')) || [];
  console.log('Loaded icons:', icons); // Debugging line
  icons.forEach(icon => {
    const iconElement = createIconItem(icon.url, icon.label, icon.favicon);
    iconsContainer.appendChild(iconElement);
  });
}

// Save icons to localStorage
function saveIcons(icons) {
  localStorage.setItem('icons', JSON.stringify(icons));
}

// Get current icons from localStorage
function getStoredIcons() {
  return JSON.parse(localStorage.getItem('icons')) || [];
}

// Function to create a new icon item
function createIconItem(url, label, favicon) {
  const iconItem = document.createElement('div');
  iconItem.classList.add('icon-item');

  const img = document.createElement('img');
  img.src = favicon || `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
  img.alt = label;

  const caption = document.createElement('p');
  caption.textContent = label;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.innerHTML = '&times;';
  removeButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to the iconItem
    iconsContainer.removeChild(iconItem);

    // Update localStorage after removal
    let icons = getStoredIcons();
    icons = icons.filter(icon => icon.url !== url);
    saveIcons(icons);
  });

  iconItem.appendChild(img);
  iconItem.appendChild(caption);
  iconItem.appendChild(removeButton);

  // Add click event to open URL in a new tab
  iconItem.addEventListener('click', () => {
    window.open(url, '_blank');
  });

  return iconItem;
}

// Event listener for adding new icons
addIconButton.addEventListener('click', () => {
  const url = iconUrlInput.value.trim();
  const label = iconLabelInput.value.trim();

  if (url && label) {
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
    const newIcon = createIconItem(url, label, favicon);
    iconsContainer.appendChild(newIcon);

    // Save to localStorage
    const icons = getStoredIcons();
    icons.push({ url, label, favicon });
    saveIcons(icons);

    // Clear input fields
    iconUrlInput.value = '';
    iconLabelInput.value = '';
  } else {
    alert('Please enter both a URL and a label.');
  }
});

// Load icons from localStorage on page load
loadIcons();

// Load background from localStorage on page load
function loadBackground() {
  const backgroundUrl = localStorage.getItem('backgroundUrl');
  if (backgroundUrl) {
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
  }
}

// Save background to localStorage
function saveBackground(url) {
  localStorage.setItem('backgroundUrl', url);
}

// Event listener for setting the background image
setBackgroundButton.addEventListener('click', () => {
  const url = backgroundInput.value.trim();
  if (url) {
    document.body.style.backgroundImage = `url(${url})`;
    saveBackground(url);
    backgroundInput.value = ''; // Clear input field
  } else {
    alert('Please enter a valid image URL.');
  }
});

// Load background on page load
loadBackground();

// Toggle container visibility
toggleContainerButton.addEventListener('click', () => {
  container.style.display = container.style.display === 'none' || container.style.display === '' ? 'flex' : 'none';
});
