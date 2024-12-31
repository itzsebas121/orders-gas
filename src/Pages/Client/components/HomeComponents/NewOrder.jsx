import React, { Suspense, lazy } from 'react'
import ComponentLoading from "/src/components/ComponentLoading";
const Form = lazy(() => import("../../mini-components/Form"));

const NewOrder = () => {

    
    return (

        <div className="new-order">
            <Suspense fallback={   <ComponentLoading />}>
               <Form></Form>
            </Suspense>
        </div >
    );
}
export default NewOrder;