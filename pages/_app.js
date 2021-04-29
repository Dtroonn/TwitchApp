import '../styles/globals.scss';
import { useRouter } from 'next/router';
import React from 'react';
import App from 'next/app';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { wrapper } from '../redux/store';

import MainLayout from '../layouts/Main';

import { fetchFavorites } from '../redux/actions/favorites';

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useDispatch();
    React.useEffect(async () => {
        await dispatch(fetchFavorites());
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return <div>Загрузка...</div>;
    }
    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    );
}

export default wrapper.withRedux(MyApp);
