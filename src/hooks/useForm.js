import React, { useEffect, useMemo, useState } from 'react'

export const useForm = ( initialForm = {}, initialValidations = [] ) => {

    const [formState, setFormState] = useState( initialForm );
    const [formValidation, setformValidation] = useState({});

    useEffect(() => {
      createValidators();
    }, [formState]);
    
    useEffect(() => {
      setFormState( initialForm );
    }, [initialForm]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formValidation]);
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ 
            ...formState,
            [name]: value 
        });
    };

    const createValidators = () => {
        const formCheckedValues = {};
        
        initialValidations.map( validation => {
            
            const { formField, fn, message } = validation;
            
            if ( !fn( formState[formField] ) ){
                formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : message;
            }
        });
        setformValidation(formCheckedValues);
    }

  return {
    ...formState,
    formState,
    setFormState,
    onInputChange,
    ...formValidation,
    isFormValid
  }
}
