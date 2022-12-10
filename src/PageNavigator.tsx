import { Routes, Route } from 'react-router-dom';
import { PokeCardList } from './List/PokeCardList';
import { Description } from './Detail/Description';

export const PageNavigator = () => {
    return (
        <Routes>
            <Route path='/' element={<PokeCardList />} />
            <Route path='/pokemon/:name' element={<Description />} />
        </Routes>
    )
}

