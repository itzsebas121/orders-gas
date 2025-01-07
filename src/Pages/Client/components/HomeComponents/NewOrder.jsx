import React, { Suspense, lazy } from 'react'
import ComponentLoading from "/src/components/ComponentLoading";
const Form = lazy(() => import("../../mini-components/Form"));

const NewOrder = (props) => {
    const { user } = props
    
    return (

        <div className="new-order">
            <Suspense fallback={   <ComponentLoading />}>
               <Form user={user}></Form>
            </Suspense>
        </div >
    );
}
export default NewOrder;