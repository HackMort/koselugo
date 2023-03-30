/* It takes a list of events, and allows you to filter them by type */
class EventList {
  constructor (eventList) {
    this.eventList = eventList
  }

  filter (type) {
    this.eventList.forEach(function (event) {
      const { eventType } = event.dataset
      if (eventType !== type) {
        event.classList.add('event--hidden')
        event.classList.remove('event--showed')
      } else {
        event.classList.remove('event--hidden')
        event.classList.add('event--showed')
      }
    })
  }

  clearFilter () {
    this.eventList.forEach(function (event) {
      event.classList.remove('event--hidden')
    })
  }
}

const filterTypes = {
  ALL: 'all',
  VIRTUAL: 'virtual',
  IN_PERSON: 'in-person'
}

document.addEventListener('DOMContentLoaded', function () {
  // Event list expander
  const toggler = document.querySelector('.event-list__toggler')
  const eventListWrapper = document.querySelector('.events-list__wrapper')

  const expandedClass = 'events-list__wrapper--expanded'
  const togglerExpandedClass = 'event-list__toggler--expanded'

  /* Checking if the toggler is there, if it is, it adds an event listener to it. */
  if (toggler) {
    toggler.addEventListener('click', function () {
      toggler.classList.toggle(togglerExpandedClass)
      if (eventListWrapper) { eventListWrapper.classList.toggle(expandedClass) }
    })
  }
  // Event list expander

  // Events filter
  const filterButtons = document.querySelectorAll('.events-filter')
  const eventsListContainer = document.querySelector('.events-list')
  const activeFilterClass = 'events-filter--active'
  /* Adding an event listener to each button in the filterButtons array. */
  filterButtons.forEach(function (button) {
    if (button) {
      button.addEventListener('click', function () {
        const { filter } = button.dataset
        const elements = eventsListContainer.querySelectorAll('.event')
        const eventList = new EventList(elements)

        /* Checking if the filter is set to all, if it is, it clears the filter, if it is
        not, it filters the list. */
        if (filter === filterTypes.ALL) {
          eventList.clearFilter()
          toggler.removeAttribute('style')
        } else {
          eventList.filter(filter)
          toggler.setAttribute('style', 'display:none;')
        }

        /* Removing the active class from all the buttons and then adding it to the button
        that was clicked. */
        filterButtons.forEach((button) => { button.classList.remove(activeFilterClass) })
        button.classList.add(activeFilterClass)
      })
    }
  })
})
