import * as React from 'react'
import './Trackers.final.css'

const TrackersTable = ({trackers}) => {
  return (
    <> 
      <h2>Liste des trackers</h2>
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              <th>Nom du Tracker</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            {trackers.map(tracker => (
              <tr>
                <td>{tracker.name}</td>
                <td>{tracker.starttime}</td>
                <td>{tracker.endtime}</td>
                <td>{tracker.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export {TrackersTable}
