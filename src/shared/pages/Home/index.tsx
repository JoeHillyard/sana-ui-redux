import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Features from 'shared/components/Features';
import { setLocale } from 'store/app/actions';
import { addNotification } from 'store/app/test';
import { Locale } from 'store/app/types';
import { Button } from 'semantic-ui-react';

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
            dispatch(addNotification({ test: 'test' }));
        },
        [dispatch]
    );

    return (
        <React.Fragment>
            <Button> Semantic Button</Button>
            <Features />
            <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p>
        </React.Fragment>
    );
};

export default App;
