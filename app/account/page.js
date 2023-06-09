import Account from '../components/Account'
import { Suspense } from 'react';

export function generateMetadata() {

    return {
        title: 'حسابك الشخصي',
    }
}

export default function AccountPage() {
    // return <Suspense fallback={<Loading />} >
    //     <Account />
    // </Suspense>

    return <Account />
}