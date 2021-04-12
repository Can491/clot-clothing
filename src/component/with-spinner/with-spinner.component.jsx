import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

export const WithSpinner = WrapedComponent => {
    const spinner = ({ isLoading, ...otherProps }) => {
        return (isLoading ?
            (<SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>) :
            (<WrapedComponent {...otherProps} />))
    }
    return spinner;
}