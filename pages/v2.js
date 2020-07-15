// Images
document.getElementById("icon").src = browser.runtime.getURL("images/icon.png");
document.getElementById("print1").src = browser.runtime.getURL("images/print_box.png");

// Height
document.getElementById("icon").height = document.getElementById("title").clientHeight;
console.log(document.getElementById("title").clientHeight);
