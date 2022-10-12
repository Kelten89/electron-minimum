import { ipcRenderer } from "electron";

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof NodeJS.ProcessVersions]
    );
  }

  document
    .getElementsByClassName("sch_ico_aside")[0]
    .addEventListener("click",  (e) => {
      e.preventDefault();
      ipcRenderer.invoke("print");
    });

  document
    .getElementsByClassName("shm_ico_npay")[0]
    .addEventListener("click", (e) => {
      e.preventDefault();
      ipcRenderer.invoke("quit-app");
    });

  document
    .getElementsByClassName("shm_ico_notify")[0]
    .addEventListener("click", (e) => {
      e.preventDefault();
      ipcRenderer.invoke("open-developer-tool");
    });
});
