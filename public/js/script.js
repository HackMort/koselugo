document.addEventListener('DOMContentLoaded', function (event) {
  window.addEventListener('scroll', () => {
    isiHeaderFixed()
  })
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
    const mobileMedia = window.matchMedia('(min-width: 1200px)')
    const isiHeader = document.querySelector('.isi__section_header')
    const isiSection = document.querySelector('.isi')
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    const isiObserver = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!mobileMedia.matches) {
          isiHeader.classList.remove('is--fixed')
          return
        } else {
          isiHeader.classList.add('is--fixed')
        }
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
  const mainNav = document.getElementById('main__navigation')
  if (mobileMenuToogleBtn) {
    mobileMenuToogleBtn.addEventListener('click', () => {
      // console.log('Mobile menu clicked')
      mobileMenuToogleBtn.classList.toggle('is--active')
      mainNav.classList.toggle('is--open')
    })
  }

  const menuItems = document.querySelectorAll('.site__header_nav_menu_list_item_link')
  const mobileQuery = window.matchMedia('(max-width: 1200px)')
  menuItems.forEach((item) => {
    if (item.getAttribute('href') === window.location.pathname) {
      item.classList.add('current-page')
    }
    item.addEventListener('click', (e) => {
      if (!mobileQuery.matches) {
        return
      }
      if (item.classList.contains('has__sub_nav')) {
        e.preventDefault()
        const subNav = item.nextElementSibling
        if (subNav) {
          subNav.classList.toggle('is--active')
        }
      }
    })
  })
})

// Accordion script
const accordion = document.querySelector('.accordion')
if (accordion) {
  const accordionItems = document.querySelectorAll('.accordion__item')
  accordionItems.forEach((accordionItem) => {
    accordionItem.addEventListener('click', (e) => {
      e.preventDefault()
      const expanded = accordionItem.getAttribute('aria-expanded') === 'true' || false
      accordionItem.setAttribute('aria-expanded', !expanded)
      // close all other accordion items... maybe?
      // accordionItems.forEach((accordionItem) => {
      //   if (accordionItem !== e.currentTarget) {
      //     accordionItem.setAttribute('aria-expanded', false)
      //   }
      // })
    })
  })
}
