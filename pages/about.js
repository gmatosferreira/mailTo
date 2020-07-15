// Images
document.getElementById("icon").src = browser.runtime.getURL("images/icon.png");
document.getElementById("print1").src = browser.runtime.getURL("images/print_box.png");
document.getElementById("emailShareSapo").src = browser.runtime.getURL("images/sapomail.png")
document.getElementById("emailShareGmail").src = browser.runtime.getURL("images/gmail.png")
document.getElementById("emailShareOutlook").src = browser.runtime.getURL("images/outlook.png");
document.getElementById("emailShareDefault").src = browser.runtime.getURL("images/outro.png");

// Height
document.getElementById("icon").height = document.getElementById("title").clientHeight;