/* eslint-disable no-unused-vars */
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'
import {getDateTimeForPicker} from '../helper'

// 🐶 Décommente la fontion "newTracker" qui te crée un objet tracker avec un
// 'id' généré automatiquement et un 'starttime '

const newTracker = () => ({
  id: uuidv4(),
  category: 'Défault',
  starttime: getDateTimeForPicker(),
  endtime: '',
  name: '',
})

// 🐶 créé les 4 props 'selectedTracker', 'onAddTracker', 'onDeleteTracker' et 'onUpdateTracker'
// initalise par défaut 🤖 `selectedTracker avec newTracker()` et surchage pour que l'id soit une string vide ""
const TrackerEditForm = ({selectedTracker = {...newTracker(), id:''}, onAddTracker, onDeleteTracker, onUpdateTracker}) => {
  // 🐶 créé un state 'tracker' initialisé avec 'selectedTracker'
const [tracker, setTracker] = React.useState(selectedTracker)
  // 🐶 les 4 fonctions qui suivent sont appelé sur un changement de valeur dans le formulaire
  // met à jour le state 'tracker' avec les nouvelle valeur du formulaire
  const handleTrackerName = e => {
    setTracker({...tracker, name: e.target.value})
  }
  const handleTrackerStartTime = e => {
    setTracker({...tracker, starttime: e.target.value})
  }
  const handleTrackerEndTime = e => {
    setTracker({...tracker, endtime: e.target.value})
  }
  const handleTrackerCategory = e => {
    setTracker({...tracker, category: e.target.value})
  }

  // 🐶 créé une fonction 'handleOnSubmit' qui va appeler 'onAddTracker'
  // ps : n'oublie pas le  e.preventDefault()
  const handleOnSubmit = e => {
    e.preventDefault()
    onAddTracker(tracker)
  }

  // 🐶 créé une fonction 'handleUpdateTracker' qui va appeler 'onUpdateTracker'
  const handleUpdateTracker = e => {
    e.preventDefault()
    onUpdateTracker(tracker)
  }
  // 🐶 créé une fonction 'handleDeleteTracker' qui va appeler 'onDeleteTracker'
  const handleDeleteTracker = e => {
    e.preventDefault()
    onDeleteTracker(tracker)
  }
  // 🐶 créé une fonction 'handleNewTracker' qui va mettre à jour le state tracker
  // avec newTracker()
  const handleNewTracker = e => {
    e.preventDefault()
    setTracker(newTracker)

  }
  // 🐶 met à jour le state tracker quand 'selectedTracker' change de valeur.
  // ceci ce produit lors d'un clique sur le tableau par exemple, une nouvelle
  // valeur de 'selectedTracker' arrive et il faut mettre à jour le state.
  // 🤖 utilise 'useEffect'
  // conditionne la mise à jour du tracker si les ids sont differents et non vide
  // 🤖 selectedTracker?.id !== '' && selectedTracker?.id !== tracker.id

  React.useEffect(() => {
    if(selectedTracker?.id !== '' && selectedTracker?.id !== tracker.id ) {
      setTracker(selectedTracker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedTracker])

  // 🐶 On veut maintenant activer / desactiver les boutons / Champs input en fonction
  // de l'état du tracker (pas de tracker à editer / tracker à editer )
  // on se base sur l'id
  // 🤖 créée const disabled
  // si id vide 'disabled' est à true, false sinon
  // met `disabled={disabled}` sur tous les champs <input< et <button> (sauf le boutton 'Nouveau Tracker')
const disabled = tracker.id === ''
  return (
    <>

      <form className="Form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Gestion des Trackers</legend>
          <label htmlFor="name">Nom du tracker :
            <input type="text" name="name" value={tracker.name} disabled={disabled} onChange={handleTrackerName}/>
          </label>
          <label htmlFor="starttime">
            <input type="datetime-local" name="starttime" value={tracker.starttime} disabled={disabled} onChange={handleTrackerStartTime}/>
          </label>
          <label htmlFor="endtime">
            <input type="datetime-local" name="endtime" value={tracker.endtime} disabled={disabled} onChange={handleTrackerEndTime}/>
          </label>
          <label htmlFor="category">
            <input type="select" name="category" value={tracker.category} disabled={disabled} onChange={handleTrackerCategory}/>
                      </label>

          <label>Actions</label>
          <div className="Action">
            <input type="button" onClick={handleNewTracker} value="Nouveau Tracker"/>
            <input type="submit" value="Ajouter" disabled={disabled}/>
            <input type="button" onClick={handleDeleteTracker} value="Supprimerr" disabled={disabled}/>
            <input type="button" onClick={handleUpdateTracker} value="Mettre à jourr" disabled={disabled}/>

          </div>
        </fieldset>
      </form>
    </>
  )
}

export {TrackerEditForm}
