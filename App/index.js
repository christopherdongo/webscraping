let btnscrap = document.getElementById("scrap-profile");

btnscrap.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
});
const scrapingProfile=()=>{
//profile
  const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li");
  const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2");
  const name = elementNameProfile ? elementNameProfile.innerText : "";
  const title = elementNameTitle ? elementNameTitle.innerText : "";
  //ubicacion
  const elementUbicacion = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul:nth-child(3) li");
  const ubicacion = elementUbicacion ? elementUbicacion.innerText : "";
  //resumen
  const elementMoreResume = document.getElementById("line-clamp-show-more-button");
  if (elementMoreResume) elementMoreResume.click();
  const elementResume = document.querySelector("section.pv-about-section > p");
  const resume = elementResume ? elementNameTitle.innerText : "";
  /*experiencia*/
  const elementExperience = document.querySelectorAll("div > section.experience-section ul li section");
    const experience = elementExperience? Array.from(elementExperience).map((item) => {
        let enterprise = item.querySelector("p.pv-entity__secondary-title")?.innerText || "";
        let period = item.querySelector("a h4 :nth-child(2)")?.innerText || "";
        let funct = item.querySelector("div > p.pv-entity__description")?.innerText || "" 
        return { period, enterprise, funct };
      })
    : ""
    ;
  //education
  const elementEducation = document.querySelectorAll("div > section.education-section ul li div.display-flex.flex-column.full-width .pv-entity__summary-info");
  const education = elementEducation? Array.from(elementEducation).map((item) => {
        let college = item.querySelector("div.pv-entity__degree-info h3")?.innerText || " ";
        let period = item.querySelector(".pv-entity__dates :nth-child(2)")?.innerText || " ";
        let nivel_study =item.querySelector("span.pv-entity__comma-item")?.innerText || "";
        return { college, period, nivel_study };
      })
    : ""
    ;

  console.log({ name, title,resume ,ubicacion, education, experience });

   

}