const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

import { NoteEdit } from "./NoteEdit.jsx";

export function NoteVideo({ note, onUpdateNote }) {

    return <div className="video-container">
        <iframe src={note.info.src} width="250" height="150"></iframe>
    </div>
}