'use client'
import { AppProvider } from '@/store/context/AppContext'
import store from '@/store/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const Wrappper = ({ children }) => {
    return (
        <Provider store={store}>
            <AppProvider>
                {children}
            </AppProvider>
        </Provider>

    )
}

export default Wrappper;