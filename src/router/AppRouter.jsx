import { Route, Routes } from 'react-router-dom';
import { BroadcastMessage, NSAdmin, NotificationHome } from '../NotificationAdmin';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={ <NotificationHome /> } > </Route>
        <Route path="/broadcastMessage" element={ <BroadcastMessage /> } > </Route>
        <Route path="/NSAdming" element={ <NSAdmin /> } > </Route>
    </Routes>
  )
}
