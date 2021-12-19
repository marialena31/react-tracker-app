/* eslint-disable no-unused-vars */
import * as React from 'react'
import {FilterTrackers} from './FilterTrackers'
import {TrackersTable} from './TrackersTable'
// 🐶 importe TrackerEditForm
import {TrackerEditForm} from './TrackerEditForm'
import db from '../data'

function TrackersApp() {
  const [allTrackers, setAllTrackers] = React.useState(db)
  const [filterText, setFilterText] = React.useState('')
  const [selectedTracker, setSelectedTracker] = React.useState({})

  const handleTextChange = text => {
    setFilterText(text)
    const filteredTracker = db.filter(
      track => track.name.toLowerCase().indexOf(text) !== -1,
    )
    setAllTrackers(filteredTracker)
  }

  // 🐶 créé une fonctions 'handleAddTracker' qui prend en paramètre un 'tracker'
  // et qui ajoute ce 'tracker' dans 'allTrackers' avec 'setAllTrackers'
  // tu peux utiliser un spread opérator (ou solution équivalente) :
  // 🤖 [...arrayExistant, nouvelElement]
    const handleAddTracker = (tracker) => {
        if (!tracker.id) {
            alert ('il manque le tracker id')
        } else if(!tracker.name) {
            alert('veuillez renseigner le nom du tracker')
        } else if (!tracker.starttime) {
            alert('veuillez renseigner la date de début')
        } else if(!tracker.category)  {
            alert( 'veuillez renseigner la catégori')
        }else {
            setAllTrackers([...allTrackers, tracker])
        }
    }

  // 🐶 créé une fonctions 'handleDeleteTracker' qui prend en paramètre un 'tracker'
  // et qui supprime ce 'tracker' de 'allTrackers' en se basant dur l'id
  // utilise 'filter' (ou solution équivalente) :
  // 🤖 arrayExistant.filter((item) => item.id !== elementASupprimer.id)
const handleDeleteTracker = (deletedTracker) => {
    if (!deletedTracker.id) {
        alert ('il manque le tracker id')
    } else {
        const filteredTrackers = allTrackers.filter(tracker => tracker.id !== deletedTracker.id)
        setAllTrackers(filteredTrackers)
    }
}

  // 🐶 créé une fonctions 'handleUpdateTracker' qui prend en paramètre un 'tracker'
  // et qui met à jour ce 'tracker' dans 'allTrackers' en se basant dur l'id
  // utilise 'map' (ou solution équivalente):
  // 🤖 updatedArray = arrayExistant.map(item => item.id === elementAMaj.id ? elementAMaj : item)
    const handleUpdateTracker = (updateTracker) => {
        if (!updateTracker.id) {
            alert ('il manque le tracker id')
        } else if(!updateTracker.name) {
            alert('veuillez renseigner le nom du tracker')
        } else if (!updateTracker.starttime) {
            alert('veuillez renseigner la date de début')
        } else if(!updateTracker.category)  {
            alert( 'veuillez renseigner la catégori')
        }else {
            const updatedTrackers = allTrackers.map(tracker => tracker.id === updateTracker.id ? updateTracker : tracker)
            setAllTrackers(updatedTrackers)
        }
    }

  return (
    <div>
      <FilterTrackers onTextChange={handleTextChange} />
      {/* 🐶 appelle <TrackerEditForm> avec les 4 props utiles */}
        <TrackerEditForm selectedTracker={selectedTracker} onAddTracker={handleAddTracker} onDeleteTracker={handleDeleteTracker} onUpdateTracker={handleUpdateTracker}/>
      <TrackersTable
        trackers={allTrackers}
        selectedTracker={selectedTracker}
        onSelectedTracker={setSelectedTracker}
      />
    </div>
  )
}
export {TrackersApp}
