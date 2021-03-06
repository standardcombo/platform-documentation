/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

// Manticore JavaScript Helpers
document.addEventListener("DOMContentLoaded", event => {
  // scroll to top button
  const btn = document.getElementById("to-top-button")
  btn.addEventListener("click", e => {
    e.preventDefault()
    e.stopImmediatePropagation()
    window.scroll({ top: 0, left: 0, behavior: "auto" })
  })

  // Add an icon to all external links
  const links = document.querySelectorAll(".md-content a")
  for (let i = 0, length = links.length; i < length; i++) {
    if (links[i].hostname !== window.location.hostname && links[i].title !== "Edit this page" && links[i] !== btn) {
      links[i].target = "_blank"
      links[i].className = "external"
      links[i].rel = "noopener"
    }
  }

  // Load Videos in the Docs
  const elements = document.querySelectorAll("img[alt=\"YOUTUBE\"]")
  const elementsLive = document.querySelectorAll("img[alt=\"YOUTUBELIVE\"]")
  const elementsVimeo = document.querySelectorAll("img[alt=\"VIMEO\"]")
  const elementsVimeoEvent = document.querySelectorAll("img[alt=\"VIMEOEVENT\"]")

  Array.prototype.forEach.call(elements, (el, i) => {
    const id = el.getAttribute("title").split("/")[el.getAttribute("title").split("/").length - 1]
    const oldClass = el.getAttribute("class")
    const iframe = document.createElement("iframe")

    iframe.title = "YouTube"
    iframe.src = `https://www.youtube.com/embed/${id}?modestbranding=1&amp;`

    if (oldClass !== "null") {
      iframe.className = `video-embed ${oldClass}`
    } else {
      iframe.className = "video-embed"
    }

    el.replaceWith(iframe)
  })

  Array.prototype.forEach.call(elementsLive, (el, i) => {
    const id = el.getAttribute("title").split("/")[el.getAttribute("title").split("/").length - 1]
    const oldClass = el.getAttribute("class")
    const iframe = document.createElement("iframe")

    iframe.title = "YouTube Live"
    iframe.src = `https://www.youtube.com/embed/live_stream?channel=${id}?modestbranding=1&amp;`

    if (oldClass !== "null") {
      iframe.className = `video-embed ${oldClass}`
    } else {
      iframe.className = "video-embed"
    }

    el.replaceWith(iframe)
  })

  if (window.location.hostname !== ("localhost")) {
    Array.prototype.forEach.call(elementsVimeo, (el, i) => {
      const id = el.getAttribute("title").split("/")[el.getAttribute("title").split("/").length - 1]
      const oldClass = el.getAttribute("class")
      const iframe = document.createElement("iframe")

      iframe.title = "Vimeo"
      iframe.src = `https://player.vimeo.com/video/${id}`

      if (oldClass !== "null") {
        iframe.className = `video-embed ${oldClass}`
      } else {
        iframe.className = "video-embed"
      }

      el.replaceWith(iframe)
    })

    Array.prototype.forEach.call(elementsVimeoEvent, (el, i) => {
      const id = el.getAttribute("title").split("/")[el.getAttribute("title").split("/").length - 1]
      const oldClass = el.getAttribute("class")
      const iframe = document.createElement("iframe")

      iframe.title = "Vimeo Event"
      iframe.src = `https://vimeo.com/event/${id}/embed`

      if (oldClass !== "null") {
        iframe.className = `video-embed ${oldClass}`
      } else {
        iframe.className = "video-embed"
      }

      el.replaceWith(iframe)
    })
  }

  // Change browser tab title based on header title near scroll position
  window.addEventListener("scroll", event => {
    const yPos = window.pageYOffset || document.documentElement.scrollTop
    let currentTitle = document.title
    const headerlinks = document.getElementsByClassName("headerlink")

    if (document.documentElement.scrollTop > 300) {
      btn.classList.add("show")
    } else {
      btn.classList.remove("show")
    }

    Array.prototype.forEach.call(headerlinks, (el, i) => {
      const rect = el.getBoundingClientRect()
      if (yPos > rect.top + document.documentElement.scrollTop - 90) {
        currentTitle = el.parentElement.textContent.slice(0, -1)
      }
    })

    document.title = currentTitle
  })
});

// Dark mode detection
(function() {
  const darkMode = document.getElementById("dark-mode-toggle")

  if (darkMode) {
    const isDarkSchemePreferred = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

    darkMode.addEventListener("click", e => {
      e.preventDefault()
      e.stopImmediatePropagation()

      const isDark = document.documentElement.classList.contains("dark-mode") ? 0 : 1

      this.href = `?dark=${1 - isDark}`

      // If prefers-color-scheme is dark, and user disables dark mode, we need to keep the local storage as dark-mode = 0
      document.documentElement.classList.toggle("dark-mode", isDark)
      localStorage.setItem("dark-mode", isDark)
    })

    if (isDarkSchemePreferred() && localStorage.getItem("dark-mode") === null) {
      darkMode.click()
    }
  }
}())
