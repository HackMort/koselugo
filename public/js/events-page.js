/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

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
  const title = event.querySelector('.event__title').innerText.trim()
  const presenter = event.querySelector('.event__presenter').innerText.trim()
  const description = event.querySelector('.event__description').innerText.trim()

  let type = event.querySelector('.event__type')
  if (type) {
    type = type.innerText.trim()
  }

  let location = event.querySelector('.event__location')
  if (location) {
    location = location.innerHTML.trim()
  }

  return {
    id: eventId,
    type: eventType,
    date,
    hour,
    typeString: type,
    location,
    title,
    description,
    presenter
  }
}

/**
 * Updates event form container with data from an event object
 * @param {{id: string, type: string, date: string, hour: string, typeString: string, location: string, title: string, description: string, presenter: string}} eventData
 * @param {HTMLDivElement} form
*/
const addEventDataToForm = (eventData, form) => {
  const eventTitleEl = form.querySelector('.events-form__title')
  const eventDateEl = form.querySelector('.events-form__date')
  const eventHourEl = form.querySelector('.events-form__hour')
  const eventLocationEl = form.querySelector('.events-form__location')
  const eventIdInputEl = form.querySelector('.input-hidden')

  eventTitleEl.innerText = eventData.title
  eventDateEl.innerText = eventData.date
  eventHourEl.innerText = eventData.hour
  eventIdInputEl.value = eventData.id

  if (eventData.location) {
    eventLocationEl.innerHTML = eventData.location
    eventLocationEl.removeAttribute('style')
  }
}

/**
 * This function filters form controls based on the event type and removes those that are not
 * applicable.
 * @param {string} eventType - a string representing the type of event for which the form needs to be prepared.
 * @param {HTMLFormElement} form - The `form` parameter is a reference to an HTML form element that will be modified
 * based on the `eventType` parameter.
 */
const prepareFormAccordingEventType = (eventType, form) => {
  const filterableControls = Array.from(form.querySelectorAll('.form__control[data-only-for-types]'))

  filterableControls.forEach((control) => {
    const onlyForTypes = [].concat(control.dataset.onlyForTypes.split(','))

    const deleteControl = !onlyForTypes.includes(eventType)

    if (deleteControl) {
      control.parentElement.removeChild(control)
    }
  })
}

/**

Scrolls to the top of the view by creating an anchor element, adding it to the body, clicking it, and removing it from the body.
*/
const scrollToViewTop = () => {
  const a = document.createElement('a')
  const body = document.querySelector('body')

  a.href = '#upcoming-events'
  a.setAttribute('style', 'display: none;')

  body.appendChild(a)
  a.click()

  body.removeChild(a)
}

/**

Removes the event registration form from the DOM and returns its parent element.
@returns {HTMLElement} The parent element of the removed form.
*/
const destroyForm = () => {
  const form = document.querySelector('.events-form__container')
  const parent = form.parentElement
  parent.removeChild(form)
  return parent
}

/**

Displays a confirmation view with event and registration data.
@param {HTMLDivElement} container - The container where the confirmation view will be appended.
@param {{id: string, type: string, date: string, hour: string, typeString: string, location: string, title: string, description: string, presenter: string}} eventData - The data of the selected event.
@param {{firstName: string, email: string}} formData - The registration data entered by the user.
@returns {void}
*/
const showConfirmationView = (container, eventData, formData) => {
  const confirmationView = document.querySelector('#confirmation-view-template').content.cloneNode(true)

  const firstNameEl = confirmationView.querySelector('.confirmation__firstname')
  const eventTypeEl = confirmationView.querySelector('.event__type')
  const eventTitleEl = confirmationView.querySelector('.confirmation__event-title')
  const eventDateEl = confirmationView.querySelector('.event__date')
  const eventHourEl = confirmationView.querySelector('.event__hour')
  const eventLocationEl = confirmationView.querySelector('.confirmation__location')
  const confirmationEmailEl = confirmationView.querySelector('.confirmation__email')

  firstNameEl.innerText = formData.firstName
  eventTypeEl.innerText = eventData.type
  eventTitleEl.innerText = eventData.title
  eventDateEl.innerText = eventData.date
  eventHourEl.innerText = eventData.hour
  confirmationEmailEl.innerText = formData.email

  if (eventData.location) {
    // eventLocationEl.innerHTML = eventData.location
  }

  container.appendChild(confirmationView)

  scrollToViewTop()
}

/**
  * Returns an array of HTML elements representing the form steps.
  * @returns An array of HTML elements representing the form steps.
  * @returns {HTMLElement[]}
  */
const getSteps = function () {
  const steps = Array.from(document.querySelectorAll('.form__steps .step'))
  return steps
}

/**

Marks a given step as visible by setting the data-visible attribute to 'true'
and adding the class step__visible, while removing the class step__hidden.
@param {HTMLElement} step - The step to mark as visible.
*/
const markStepAsVisible = function (step) {
  step.dataset.visible = 'true'
  step.classList.add('step__visible')
  step.classList.remove('step__hidden')
}

/**

Marks a given step as hidden by setting the data-visible attribute to 'false'
and adding the class step__hidden, while removing the class step__visible.
@param {HTMLElement} step - The step to mark as hidden.
*/
const markStepAsHidden = function (step) {
  step.dataset.visible = 'false'
  step.classList.remove('step__visible')
  step.classList.add('step__hidden')
}

/**

Navigates to the first step of a two-step process by marking the first step as visible
and the second step as hidden.
*/
function goToFirstStep () {
  const [step1, step2] = getSteps()

  markStepAsVisible(step1)
  markStepAsHidden(step2)

  scrollToViewTop()
}

/**

Navigates to the last step of a two-step process by marking the first step as hidden
and the second step as visible.
*/
function goToLastStep () {
  const [step1, step2] = getSteps()

  markStepAsHidden(step1)
  markStepAsVisible(step2)

  scrollToViewTop()
}

/**

Removes the event form container and shows the events list container
*/
function goToEventList () {
  const eventListContainer = document.querySelector('.events-list__container')
  const eventFormContainer = document.querySelector('.events-form__container')

  if (eventFormContainer) {
    eventFormContainer.parentElement.removeChild(eventFormContainer)
    eventListContainer.removeAttribute('style')
  }

  // scrollToViewTop()
}

/**

Checks the validity of the current step in a multi-step form and enables/disables the "Next" button accordingly.
@param {Event} event - The event object for the input event that triggered this function.
@returns {void}
*/
function checkStepValidity (event) {
  const step = getParent(event.target, 'step')

  // Get an array of all required controls in the current step.
  const stepRequiredControls = Array.from(step.querySelectorAll('.form__control[data-required="true"]'))

  // Check if any required control is invalid or not yet touched.
  const isInvalid = stepRequiredControls.some((control) => control.classList.contains('form__control--invalid') || control.dataset.touched === 'false')

  // Get the "Next" button for the current step.
  const nextButton = step.querySelector('.button--next')

  // If any required control is invalid or not yet touched, disable the "Next" button.
  if (isInvalid) {
    nextButton.setAttribute('disabled', 'true')
  } else {
    if (nextButton) {
      nextButton.removeAttribute('disabled')
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Event list expander
  const toggler = document.querySelector('.event-list__toggler')
  const eventListWrapper = document.querySelector('.events-list__wrapper')

  function scrollToBottomOfWrapper (element) {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' })
  }

  function scrollToTopOfTheWrapper (element) {
    element.scroll({ top: 0, behavior: 'smooth' })
  }

  const expandedClass = 'events-list__wrapper--expanded'
  const togglerExpandedClass = 'event-list__toggler--expanded'

  /* Checking if the toggler is there, if it is, it adds an event listener to it. */
  if (toggler) {
    toggler.addEventListener('click', function () {
      if (eventListWrapper) {
        if (toggler.classList.contains('event-list__toggler--expanded')) {
          scrollToTopOfTheWrapper(eventListWrapper)
          toggler.classList.remove(togglerExpandedClass)
          return
        }
        toggler.classList.add(togglerExpandedClass)
        eventListWrapper.classList.add(expandedClass)
        scrollToBottomOfWrapper(eventListWrapper)
      }
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

  /**

  Registers click events on each button in the registerButtons array.
  Upon clicking a button, it retrieves event data from the parent event element, and then
  uses that data to populate the registration form. Upon submission of the form, it
  retrieves user data from the form, destroys the form, and shows the confirmation view
  with both the event and user data.
  @param {NodeList} registerButtons - An array of HTML button elements to register click events on.
  @param {HTMLDivElement} eventListContainer - A container for the event list.
  @param {HTMLDivElement} container - A container for the registration form and confirmation view.
  @param {HTMLTemplateElement} registerFormTemplate - A template for the registration form.
  @param {Function} getParent - A function to retrieve a parent element based on a provided class.
  @param {Function} eventToJSON - A function to convert an event element to JSON format.
  @param {Function} addEventDataToForm - A function to populate the registration form with event data.
  @param {Function} destroyForm - A function to remove the registration form from the container.
  @param {Function} showConfirmationView - A function to show the confirmation view with event and user data.
  @returns {void}
  */
  registerButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const eventElement = getParent(button, 'event')
      const eventData = eventToJSON(eventElement)

      if (eventListContainer) {
        eventListContainer.setAttribute('style', 'display: none;')
        const form = registerFormTemplate.content.cloneNode(true)
        addEventDataToForm(eventData, form)
        prepareFormAccordingEventType(eventData.type, form)

        container.appendChild(form)

        scrollToViewTop()

        const registerToEventFormSubmit = document.querySelector('.input__submit')

        registerToEventFormSubmit.addEventListener('click', (event) => {
          event.preventDefault()
          const form = getParent(event.target, 'form')

          const formIsValid = checkFormValidity(form)

          if (formIsValid) {
            const data = new FormData(form)

            const formData = {
              firstName: data.get('first-name'),
              email: data.get('email')
            }

            destroyForm()
            showConfirmationView(container, eventData, formData)
            scrollToViewTop()
          }
        })
      }
    })
  })
  // Register event
})
