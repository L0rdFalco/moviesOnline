'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});


// search on home page
const el = document.getElementById("box");

if (el) el.addEventListener("keyup", async function (e) {
  e.preventDefault()
  if (e.key === "Enter") {
    console.log(el.value.trim());

    const searchText = el.value.trim()

    if (!searchText.length) return

    window.open(`/results/${searchText}`, '_self').focus();

  }

})


const ids = ["playBtn", "watchBtn"]

for (const id of ids) {
  let titleEl = document.getElementById("titleDisplay")
  const currEL = document.getElementById(id);


  if (currEL) {

    currEL.addEventListener("click", async function (e) {

      if (titleEl) {
        let titleVal = titleEl.textContent
        titleVal = titleVal.replace(/\s+/g, '-').toLowerCase();

        const res = await fetch(`/stories/${titleVal}`)

        const res2 = await res.json()

        if (res2.status !== "success") return


        const parentEL = document.getElementById("movieListParent")

        let html = ""
        parentEL.innerHTML = ""

        for (const storyData of res2.data) {
          html += `
          <li>
            <div class="movie-card" id="downloadStoryBtn">
                <a href=https://myflixer.pw${storyData.link}>
                  <figure class="card-banner"><img src=${storyData.poster} alt="${storyData.title} movie poster"></figure>
                </a>
                <div class="title-wrapper">
                  <a href=https://myflixer.pw${storyData.link}>
                      <h3 class="card-title">${storyData.title}</h3>
                  </a>
                  <time datetime="2022">2022</time>
                </div>
                <div class="card-meta">
                  <div class="badge badge-outline">HD</div>
                  <div class="duration">
                      <ion-icon name="time-outline" role="img" class="md hydrated" aria-label="time outline"></ion-icon>
                      <time datetime="PT47M">153 min</time>
                  </div>
                  <div class="rating">
                      <ion-icon name="star" role="img" class="md hydrated" aria-label="star"></ion-icon>
                      <data>8.6</data>
                  </div>
                </div>
            </div>
          </li>
  
        `

        }

        parentEL.insertAdjacentHTML("beforeend", html)
        window.scrollTo(0, document.body.scrollHeight);


      }


    })

  }

}


document.addEventListener("click", function (e) {
  const target = e.target.closest("#downloadStoryBtn"); // Or any other selector.

  if (target) {
    window.open('https://gigainstall.com/1321534', '_blank')

  }
});

const nameEl = document.getElementById("name")
const emailEl = document.getElementById("email")
const submitBtn = document.getElementById("submitBtn")


if (submitBtn) submitBtn.addEventListener("click", async function (e) {

  e.preventDefault()

  const nameVal = nameEl.value.trim()
  const emailVal = emailEl.value.trim()

  if (nameVal && emailVal) {

    const res1 = await fetch("/users/register", {
      method: "POST",
      headers: { 'Content-type': "application/json" },
      body: JSON.stringify({
        name: nameVal,
        email: emailVal
      })
    })

    const res2 = await res1.json()

    if (res2.status.includes("success")) {
      document.getElementById("succesText").innerText = "you have been registered!"

    }
  }



})

const modalSubmitBtn = document.getElementById("modalSubmitBtn")

if (modalSubmitBtn) modalSubmitBtn.addEventListener("click", async function (e) {
  e.preventDefault()
  const nameVal = document.getElementById("modalName").value.trim()
  const emailVal = document.getElementById("modalEmail").value.trim()


  const res1 = await fetch("/users/register", {
    method: "POST",
    headers: { 'Content-type': "application/json" },
    body: JSON.stringify({
      name: nameVal,
      email: emailVal
    })
  })

  const res2 = await res1.json()

  if (res2.status.includes("success")) {
    document.getElementById("messageModal").innerText = "you have been registered!"
    localStorage.setItem('registered', true);

  }
})


