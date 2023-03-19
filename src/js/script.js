// Put your custom javascript here.
document.addEventListener('DOMContentLoaded', function (event) {
  // Listen for scroll event
  window.addEventListener('scroll', () => {
    isiHeaderFixed()
  })
  // Listen for resize event
  window.addEventListener('resize', () => {
    isiHeaderFixed()
  })

  /**
   * isiHeaderFixed
   * @description
   * - Add class is--fixed to isi__section_header when isi__section is not in viewport
   * - Add class is--open to isi__section_header when isi__section is not in viewport
   * - Remove class is--fixed and is--open to isi__section_header when isi__section is in viewport
   * It requires IntersectionObserver API
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   * @see https://caniuse.com/#feat=intersectionobserver
  */
  function isiHeaderFixed () {
    // const mobileMedia = window.matchMedia('(min-width: 768px)')
    const isiHeader = document.querySelector('.isi__section_header')
    const isiSection = document.querySelector('.isi')
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    const isiObserver = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // if (!mobileMedia.matches) return
        if (entry.isIntersecting) {
          isiHeader.classList.remove('is--fixed', 'is--open')
        } else {
          if (entry.boundingClientRect.top < 0) {
            isiHeader.classList.add('is--fixed')
          }
          isiHeader.classList.add('is--fixed')
        }
      })
    }
    , observerOptions)
    if (isiSection) {
      isiObserver.observe(isiSection)
    }
  }
  const toggleIsiSection = document.querySelector('.isi__section_toggle')
  if (toggleIsiSection) {
    toggleIsiSection.addEventListener('click', () => {
      const isiHeader = document.querySelector('.isi__section_header.is--fixed')
      isiHeader.classList.toggle('is--open')
    })
  }

  const mobileMenuToogleBtn = document.getElementById('toggle-menu-button')
  if (mobileMenuToogleBtn) {
    mobileMenuToogleBtn.addEventListener('click', () => {
      const mobileMenu = document.getElementById('main__navigation')
      console.log('Mobile menu clicked')
      mobileMenu.classList.toggle('is--open')
    })
  }
})
