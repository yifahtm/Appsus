const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"

import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"

import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'
import { Vision } from './cmps/Vision.jsx'
import { Team } from './cmps/Team.jsx'

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} >
                    <Route path="/about/vision" element={<Vision/>}/>
                    <Route path="/about/team" element={<Team/>}/>
                 </Route>

                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/mail/:list" element={<MailList />} />
                </Route>

                <Route path="/note" element={<NoteIndex />}>
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />
                </Route>
            </Routes>

            <UserMsg />
            <AppFooter />
        </section>
    </Router>
}
