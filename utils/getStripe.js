import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51MsMgSG8ubawlCYPU9Ppq0rHvEHPiJRyuSH1V49PFjmdKPiD0vnYsrxfeJVDg9MhF6FMSgBH5ZRsLHW2KEnqXA5h00wp9jdgNQ');
    }

    return stripePromise;
}

export default getStripe;