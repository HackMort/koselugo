document.addEventListener('DOMContentLoaded', function (event) {
  window.addEventListener('scroll', () => {
    isiHeaderFixed()
  })
  window.addEventListener('resize', () => {
    isiHeaderFixed()
    changeScrollMarginTopVariable()
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
  const root = document.documentElement
  if (mobileMenuToogleBtn) {
    mobileMenuToogleBtn.addEventListener('click', () => {
      mobileMenuToogleBtn.classList.toggle('is--active')
      root.classList.toggle('is--menu-open')
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

  document.querySelectorAll('.sub__nav_menu_item_link').forEach(linkElement => {
    linkElement.addEventListener('click', (e) => {
      if (!mobileQuery.matches) {
        return
      }

      document.querySelector('.site__header_nav_menu_list .sub__nav_menu.is--active').classList.toggle('is--active')
      root.classList.toggle('is--menu-open')
      mainNav.classList.toggle('is--open')
      mobileMenuToogleBtn.classList.toggle('is--active')
    })
  })

  changeScrollMarginTopVariable()

  window.addEventListener('hashchange', function (event) {
    if (mobileQuery.matches) {
      event.preventDefault()
      internalNavigationScroll()
    }
  })
})

// Accordion script
const accordion = document.querySelector('.accordion')
if (accordion) {
  const accordionItems = document.querySelectorAll('.accordion__item')
  accordionItems.forEach((accordionItem) => {
    accordionItem.addEventListener('click', () => {
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

// basic form code
const form = document.querySelector('.form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
  })
}

// -----------------------------anchor-pop-up-------------------------------------

/* const externalLinks = document.querySelectorAll('a[target="_blank"])')

if (externalLinks && externalLinks.length > 0) {
  externalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      const href = link.getAttribute('href')
      const continueButton = document.querySelector('.modal--continue')
      const stayButton = document.querySelector('.modal--stay')
      const modalClose = document.querySelector('.modal__close')

      continueButton.setAttribute('href', href)

      stayButton.addEventListener('click', () => {
        Fancybox.close()
      })
      modalClose.addEventListener('click', () => {
        Fancybox.close()
      })

      if (link.classList.contains('button--continue')) {
        stayButton.click()
        setTimeout(() => {
          window.open(href, '_blank')
        }, 100)
        return
      }
      Fancybox.show(
        [
          {
            src: '#modal',
            type: 'inline',
            // dragToClose: false,
            autoFocus: true,
            placeFocusBack: true,
            trapFocus: true
          }
        ],
        {
          on: {
            closing: () => {
              continueButton.setAttribute('href', '')
            }
          }
        }
      )
    })
  })
} */

// -----------------------------anchor-pop-up-------------------------------------

/* This function get the height of the Header
  and the margin-top of a custom-section (there is at least 1 section with ID
  for internal navigation in all the pages that requires internal navigation).
  Then calculates the sum of margin-top plus height and assign that total as
  margin-scroll-top variable */
function changeScrollMarginTopVariable () {
  const siteHeader = document.querySelector('.site__header')
  const rootElement = document.querySelector(':root')
  const customSection = document.querySelector('.custom-section')

  const siteHeaderStyles = getComputedStyle(siteHeader)
  const siteHeaderHeight = parseInt(siteHeaderStyles.getPropertyValue('height').slice(0, -2))

  let sectionMarginTop = 0
  if (customSection) {
    const customSectionStyles = getComputedStyle(customSection)
    sectionMarginTop = parseInt(customSectionStyles.getPropertyValue('margin-top').slice(0, -2))
  }

  const marginScrollTop = sectionMarginTop + siteHeaderHeight
  rootElement.style.setProperty('--margin-top-scroll-var', marginScrollTop + 'px')
}

/* Function that will be executed when the hash change  */
function internalNavigationScroll () {
  const internalSection = document.querySelector(document.location.hash)

  if (internalSection) {
    const mainContainer = document.querySelector('main')
    const siteHeader = document.querySelector('.site__header')
    const scrollPosition = internalSection.offsetTop - mainContainer.scrollTop - siteHeader.scrollHeight
    window.scroll({ top: scrollPosition, left: 0, behavior: 'smooth' })
  }
}
