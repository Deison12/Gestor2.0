import React, { useState, useEffect } from 'react';

export interface Content {
    children: JSX.Element;
    message: string | string[] | undefined;
    inputFocus: boolean;
}

export const InputErrorMessage: React.FC<Content> = ({ message, children, inputFocus }) => {
    // Initialize the validation status as "unchecked" (0), "success" (1), or "error" (2)
    const [validationStatus, setValidationStatus] = useState(0);
    // Function to handle form validation based on the message
    const validateForm = () => {
        if (message) {
            // Set as error when there is a message
            setValidationStatus(2);
        } else {
            if (inputFocus) {
                // Set as success when there is no message
                setValidationStatus(1);
            } else {
                setValidationStatus(0)
            }
        }
    };

    // Call the validation function when the component renders initially or when the message changes
    useEffect(() => {
        validateForm();
    }, [message]);

    return (
        <div className="d-flex flex-column align-items-start mb-0 w-100">
            <div className="d-flex align-items-center w-100">
                {children}
            </div>
            {/* Add a line break if there is a message */}
            {message && (
                <span className="tag-outline-danger opacity-75 mt-1" style={{ lineHeight: '15px' }}>
                    {Array.isArray(message) ? (
                        message.map((item, index) => (
                            <React.Fragment key={index}>
                                <i className={`h6 ms-2 mb-0 bi me-2 ${validationStatus === 2 ? 'bi-x-circle-fill text-danger opacity-75' : ''}`} ></i>
                                {item}
                                <br />
                            </React.Fragment>
                        ))
                    ) : (
                        <React.Fragment>
                            <i className={`h6 ms-2 mb-0 bi me-2 ${validationStatus === 2 ? 'bi-x-circle-fill text-danger opacity-75' : ''}`} ></i>
                            {message}
                            <br />
                        </React.Fragment>
                    )}
                </span>
            )}
        </div>
    );
};