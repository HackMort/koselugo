/**
     * If the parent element of the child element has the class name, return the parent
     * element, otherwise, call the function again with the parent element as the child
     * element.
     * @param child {HTMLElement} - the child element that you want to find the parent of
     * @param className {string} - The class name of the parent element you're looking for.
     * @returns {HTMLElement} The parent element of the child element.
     */
const getParent = function (child, className) {
  const parent = child.parentElement
  const isControlParent = parent.classList.contains(className)

  if ((parent === null) || isControlParent) {
    return parent
  } else {
    return getParent(parent, className)
  }
}

/**

Represents a list of events with filtering functionality.
/
class EventList {
/*
Creates an instance of the EventList class.
@param {NodeList} eventList - The list of events to filter.
*/
class EventList {
  constructor (eventList) {
    this.eventList = eventList
  }

  hideBorderBottom (event) {
    event.setAttribute('style', 'border-bottom: none; margin-bottom: 0; padding-bottom: 0')
  }

  resetBorderBottom (event) {
    event.removeAttribute('style')
  }

  /**
 * It loops through all the events and if the event type is not the same as the
 * type passed in, it adds the class event--hidden and removes the class
 * event--showed. If the event type is the same as the type passed in, it removes
 * the class event--hidden and adds the class event--showed
 * @param type - the type of event you want to filter
 */
  filter (type) {
    this.eventList.forEach((event) => {
      const { eventType } = event.dataset
      if (eventType !== type) {
        event.classList.add('event--hidden')
        event.classList.remove('event--showed')
      } else {
        event.classList.remove('event--hidden')
        event.classList.add('event--showed')
      }
    })

    const showedList = Array.from(this.eventList)
      .filter((event) => { return event.classList.contains('event--showed') })

    if (showedList && showedList.length > 0) {
      const lastShowedEvent = showedList[showedList.length - 1]

      showedList.forEach((event) => { this.resetBorderBottom(event) })

      if (lastShowedEvent) {
        this.hideBorderBottom(lastShowedEvent)
      }
    }
  }

  /**
 * It removes the class `event--hidden` from each event in the event list
 */
  clearFilter () {
    this.eventList.forEach((event) => {
      event.classList.remove('event--hidden')
      this.resetBorderBottom(event)
    })
  }
}

/**

Enum for filter types.
@readonly
@enum {string}
@property {string} ALL - Show all events.
@property {string} VIRTUAL - Show virtual events only.
@property {string} IN_PERSON - Show in-person events only.
*/
const filterTypes = {
  ALL: 'all',
  VIRTUAL: 'virtual',
  IN_PERSON: 'in-person'
}

/**
 * It returns an object with the event's data
 * @param {HTMLElement} event - The event object that was passed to the handler.
 * @returns An object with the event's id, type, date, hour, typeString, title,
 * description, and presenter.
 * @returns {
  *  id: string,
  *  type: string,
  *  date: string,
  *  hour: string,
  *  typeString: string,
  *  title: string,
  *  description: string,
  *  presenter: string
  * }
  */
const eventToJSON = function (event) {
  const { eventId, eventType } = event.dataset
  const date = event.querySelector('.event__date').innerText.trim()
  const hour = event.querySelector('.event__hour').innerText.trim()
  const type = event.querySelector('.event__type').innerText.trim()
  const title = event.querySelector('.event__title').innerText.trim()
  const presenter = event.querySelector('.event__presenter').innerText.trim()
  const description = event.querySelector('.event__description').innerText.trim()

  return {
    id: eventId,
    type: eventType,
    date,
    hour,
    typeString: type,
    title,
    description,
    presenter
  }
}

// Form steps

/**
  * Returns an array of HTML elements representing the form steps.
  * @returns An array of HTML elements representing the form steps.
  * @returns {HTMLElement[]}
  */
const getSteps = function () {
  const steps = Array.from(document.querySelectorAll('.form__steps .step'))
  return steps
}

const markStepAsVisible = function (step) {
  step.dataset.visible = 'true'
  step.classList.add('step__visible')
  step.classList.remove('step__hidden')
}

const markStepAsHidden = function (step) {
  step.dataset.visible = 'false'
  step.classList.remove('step__visible')
  step.classList.add('step__hidden')
}

function goToFirstStep () {
  const [step1, step2] = getSteps()

  markStepAsVisible(step1)
  markStepAsHidden(step2)
}

function goToLastStep () {
  const [step1, step2] = getSteps()

  markStepAsHidden(step1)
  markStepAsVisible(step2)
}

// Form steps

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
  // Events filter

  // Register event
  const eventListContainer = document.querySelector('.events-list__container')
  const registerButtons = document.querySelectorAll('.register-event')

  const registerFormTemplate = document.querySelector('#register-form-template')

  const container = document.querySelector('.events-form')

  registerButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const eventElement = getParent(button, 'event')
      const eventData = eventToJSON(eventElement)
      if (eventListContainer) {
        eventListContainer.setAttribute('style', 'display: none;')
        const form = registerFormTemplate.content.cloneNode(true)
        container.appendChild(form)
      }
    })
  })
})
