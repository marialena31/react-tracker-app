/* eslint-disable no-unused-vars */
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import {getDateTimeForPicker} from '../helper'

// 🐶 complete ce reducer pour coller au specification de hugo 👨‍✈️
const reducer = (state, action) => {
  switch (action.type) {
    case 'new':
      // 🐶 l'état 'new' est déjà géré, ne pas modifier
      return {
        status: 'new',
        tracker: action.payload,
        activeButtons: {btnSave: true, btnUp: false, btnDel: false},
        activeInput: true,
        error: null,
      }
    case 'edit':
      // 🐶 change les valeurs suivantes
      return {
        status: 'edition',
        tracker: action.payload,
        activeButtons: {btnSave: false, btnUp: true, btnDel: true},
        activeInput: true,
        error: null,
      }
    case 'save':
      // 🐶 change les valeurs suivantes
      return {
        ...state,
        status: 'saved',
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'update':
      // 🐶 change les valeurs suivantes
      return {
        status: 'saved',
        tracker: action.payload,
        activeButtons: {btnSave: true, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'delete':
      // 🐶 change les valeurs suivantes
      return {
        status: 'deleted',
        tracker: action.payload,
        activeButtons: {btnSave: true, btnUp: false, btnDel: false},
        activeInput: false,
        error: null,
      }
    case 'fail':
      // 🐶 change les valeurs suivantes
      return {
        status: 'fail',
        tracker: null,
        activeButtons: {btnSave: false, btnUp: false, btnDel: false},
        activeInput: false,
        error: action.error,
      }
    // 🐶 continue pour 'update' 'delete' et 'fail'

    // 🐶 reprend tous les etats precedents et met à jour uniquement 'tracker' et error
    case 'trackerChange':
      return {
        ...state,
        tracker: action.payload,
        error: null,
      }
    default:
      throw new Error('Action non supporté')
  }
}

function useEditTracker(defaultTracker) {
  const [state, dispatch] = React.useReducer(reducer, {
    tracker: defaultTracker,
    error: null,
    status: 'idle',
    activeInput: false,
    activeButtons: {btnSave: false, btnUp: false, btnDel: false},
  })
  const {tracker, error, status, activeButtons, activeInput} = state

  const saveTracker = () => {
    dispatch({type:'save'})
  }

  const setTracker = tracker => {
    dispatch({type:'trackerChange', payload: tracker})
  }

  const editTracker = tracker => {
    dispatch({type:'edit', payload: tracker})
  }

  const updateTracker = () => {
    dispatch({type:'update', })
  }

  const deleteTracker = tracker => {
    dispatch({type:'delete', payload: tracker})
  }

  const newTracker = tracker => {
    dispatch({type:'new', payload: tracker})
  }

  return {
    tracker,
    error,
    status,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    saveTracker,
    updateTracker,
    deleteTracker,
    newTracker,
  }
}


const newDefaultTracker = () => ({
  id: uuidv4(),
  category: 'Défaut',
  starttime: getDateTimeForPicker(),
  endtime: '',
  name: '',
})

const TrackerEditForm = ({
  selectedTracker = {...newDefaultTracker(), id: ''},
  onAddTracker,
  onDeleteTracker,
  onUpdateTracker,
}) => {
  // ⛏️ supprimer le state 'tracker'

  const {
    tracker,
    activeButtons,
    activeInput,
    setTracker,
    editTracker,
    saveTracker,
    updateTracker,
    deleteTracker,
    newTracker,
  } = useEditTracker(selectedTracker)

  const handleTrackerName = e => {
    // ⛏️ supprime 'setTracker'
    setTracker({...tracker, name: e.target.value})
    // 🐶 A la place utilise 'dispatch' de type 'trackerChange'
    // la valeur en payload est le nouveau tracker
    // 🤖 dispatch({type:...,payload:...})
  }
  const handleTrackerStartTime = e => {
    // ⛏️ supprime 'setTracker' et remplace par 'dispatch' de type 'trackerChange'
    setTracker({...tracker, starttime: e.target.value})
  }
  const handleTrackerEndTime = e => {
    // ⛏️ supprime 'setTracker' et remplace par 'dispatch' de type 'trackerChange'
    setTracker({...tracker, endtime: e.target.value})
  }
  const handleTrackerCategory = e => {
    // ⛏️ supprime 'setTracker' et remplace par 'dispatch' de type 'trackerChange'
    setTracker({...tracker, category: e.target.value})
  }

  React.useEffect(() => {
    if (selectedTracker?.id !== '') {
      // ⛏️ supprime 'setTracker' et remplace par 'dispatch' type : 'edit'

      editTracker(selectedTracker)
    }
  }, [selectedTracker])

  const handleOnSubmit = e => {
    e.preventDefault()
    // 🐶 utilise 'state.tracker' au lieu de 'tracker'
    onAddTracker(tracker)
    saveTracker()// 🐶 fais un 'disptach' de type 'save'
  }

  const handleUpdateTracker = () => {
    // 🐶 utilise 'state.tracker' au lieu de 'tracker'
    onUpdateTracker(tracker)
   updateTracker()
    // 🐶 fais un 'disptach' de type 'update'
  }

  const handleDeleteTracker = () => {
    // 🐶 utilise 'state.tracker' au lieu de 'tracker'
    onDeleteTracker(tracker)
    deleteTracker(newDefaultTracker())
    // 🐶 fais un 'disptach' de type 'delete' vec comme payload : newTracker()
  }

  const handleNewTracker = () => {
    // ⛏️ supprime 'setTracker' et remplace par 'dispatch' type : 'new'
    // avec comme payload : newTracker()
    newTracker(newDefaultTracker())
  }

  // ⛏️ supprime ce boolean
  return (
    <>
      {/* 🐶 pour tous les champs 'disabled' utilise 'state.activeInput' ou 'state.activeButtons.xxx' */}
      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="trackerName">Nom du tracker : </label>
          <input
    disabled={!activeInput}
    type="text"
    id="trackerName"
    placeholder="tracker name..."
    onChange={handleTrackerName}
    value={tracker.name}
    />

          <label htmlFor="trackerDateStart">Date de début : </label>
          <input
              disabled={!activeInput}
            id="trackerDateStart"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerStartTime}
            value={tracker.starttime}
            step="2"
          ></input>

          <label htmlFor="trackerDateEnd">Date de fin : </label>

          <input
              disabled={!activeInput}
            id="trackerDateEnd"
            type="datetime-local"
            placeholder="durée..."
            onChange={handleTrackerEndTime}
            value={tracker.endtime}
            step="2"
          ></input>

          <label>
            Categorie:
            <select
                disabled={!activeInput}
              value={tracker.category}
              onChange={handleTrackerCategory}
            >
              <option value="Sport">Sport</option>
              <option value="Code">Code</option>
              <option value="Perso">Perso</option>
              <option value="Défaut">Défaut</option>
            </select>
          </label>

          <label>Actions</label>
          <div className="Action">
            <input
              type="button"
              value="Nouveau Tracker"
              onClick={handleNewTracker}
            ></input>
            <input disabled={!activeButtons.btnSave} type="submit" value="Ajouter"></input>
            <input
                disabled={!activeButtons.btnDel}
              type="button"
              value="Supprimer"
              onClick={handleDeleteTracker}
            ></input>
            <input
                disabled={!activeButtons.btnUp}
              type="button"
              value="Mettre à jour"
              onClick={handleUpdateTracker}
            ></input>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export {TrackerEditForm}
