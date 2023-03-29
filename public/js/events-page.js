document.addEventListener('DOMContentLoaded', function () {
  // Event list expander
  const toggler = document.querySelector('.event-list__toggler')
  const eventListWrapper = document.querySelector('.events-list__wrapper')
  const togglerArrow = document.querySelector('.event-list__toggler-arrow')

  const expandedClass = 'events-list__wrapper--expanded'
  const arrowExpandedClass = 'event-list__toggler-arrow--expanded'

  if (toggler) {
    toggler.addEventListener('click', function () {
      if (eventListWrapper) { eventListWrapper.classList.toggle(expandedClass) }
      if (togglerArrow) { togglerArrow.classList.toggle(arrowExpandedClass) }
    })
  }
  // Event list expander
})
