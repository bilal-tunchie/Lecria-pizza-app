"use client"

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { offerData } from "@utils/menuData";;
import { useStateContext } from '../context/StateContext';
import { EditName, EditPhoneEmail, EditPassword, ContactLanguage, EditCardDetails } from "@utils/CustomInput";
import { ThemeProvider } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { toast } from 'react-hot-toast';

export default function Account() {

    const router = useRouter()
    // const [isLoading, setIsLoading] = useState(true);

    const { 
        authentication, 
        setAuthentication, 
        profileData, 
        setProfileData, 
        theme, 
        setDisplayCart 
    } = useStateContext();

    const [open, setOpen] = useState(false);
    const [phoneEmailModal, setPhoneEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [cardDetailsModal, setCardDetailsModal] = useState(false);
    const { email, phone, password } = authentication
    const { details, otherDetails } = profileData

    useEffect(() => {
    
        if (router.pathname !== "/login" && !Object.keys(authentication).length) {
            router.push("/login");
            toast.error("يجب عليك تسجيل دخول اولا")
        } 
    
        setProfileData( prev => ({
            ...prev,
            details : prev.details.map( details => {
                
                if (details.que === 'رقم الجوال') {
                    return { ...details, ans: phone };
                } else if (details.que === 'البريد الالكتروني') {
                    return { ...details, ans: email };
                } else if (details.que === 'كلمة المرور') {
                    return { ...details, ans: password };
                }
    
                return details;
            })
        }))
    }, [])


    useEffect(() => {
		if (Object.keys(authentication).length) {
			localStorage.setItem('profile', JSON.stringify(profileData));
		}
	}, [authentication, profileData]);
    
    useEffect( () => {
        setDisplayCart(Object.keys(authentication).length)
    } , [authentication])

    function layout( details ) {
        return (
            <ul>
                {details.map( ( {id, que, ans}) => {
                    return <li key={id}>
                        <div className="label">
                            <span className='que'>{que} : </span>
                            <span className='ans'>
                                {ans === password ? "*".repeat(ans?.length) : ans}
                            </span>
                        </div>
                        <span className='edit'>
                            <ThemeProvider theme={theme}>
                                {edit(que, profileData, setProfileData, open, setOpen, phoneEmailModal, setPhoneEmailModal, passwordModal, setPasswordModal, cardDetailsModal, setCardDetailsModal, setAuthentication, email, phone, password )}
                            </ThemeProvider>
                        </span>
                    </li>
                })}
            </ul>
        )
    }

    return (
        <>
            <div className='account-page'>
                <h2>حسابك الشخصي</h2>
                <div className="account-container">
                    <div className="det details">
                        <h3>التفاصيل</h3>
                        {layout( details )}
                    </div>
                    <div className="det other-details">
                        <h3>تفاصيل اخرى</h3>
                        {layout( otherDetails )}
                    </div>
                    <div className="offers-in-account">
                        <h3>العروض</h3>
                        <div className="banner">
                            {offerData.map( ({ id, img} ) => {
                                return <Link className='offer-banner' key={id} href={'/offers'}>
                                    <div>
                                        <div className='image'>
                                            <Image src={img} alt="offer_1" />
                                        </div>
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function edit( que, profileData, setProfileData, open, setOpen, phoneEmailModal, setPhoneEmailModal, passwordModal, setPasswordModal, cardDetailsModal, setCardDetailsModal, setAuthentication, email, phone, password ) {

    const { otherDetails } = profileData

    const handleSubscription = () => {
        setProfileData(prev => {

            const updatedOtherDetails = otherDetails.map((detail) => {
                if (detail.que === 'اشترك وتجيك آخر العروض') {
                    return {
                        ...detail,
                        ans: !detail.ans,
                    };
                }
                return detail;
            });

            return {
            ...prev,
            otherDetails: updatedOtherDetails,
            };
        })
    }

    switch (que) {
        case 'لغة التواصل':

            return <ContactLanguage profileData={profileData} setProfileData={setProfileData} />

        case 'اشترك وتجيك آخر العروض':

            return <Switch  checked={otherDetails[0].ans} onClick={handleSubscription} />

        case 'الاسم':

            return <>
                <EditName open={open} setOpen={setOpen} profileData={profileData} setProfileData={setProfileData} />
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setOpen(true)} />
            </>
            
        case 'رقم الجوال' || 'البريد الالكتروني':

            return <>
                <EditPhoneEmail phoneEmailModal={phoneEmailModal} setPhoneEmailModal={setPhoneEmailModal} setAuthentication={setAuthentication} email={email} phone={phone} setProfileData={setProfileData}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setPhoneEmailModal(true)} />
            </>

        case 'كلمة المرور':

            return <>
                <EditPassword passwordModal={passwordModal} setPasswordModal={setPasswordModal} setAuthentication={setAuthentication} password={password} setProfileData={setProfileData}/>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setPasswordModal(true)} />
            </>

        case 'بطاقات الائتمانية':

            return <>
                <EditCardDetails cardDetailsModal={cardDetailsModal} setCardDetailsModal={setCardDetailsModal} setProfileData={setProfileData} />
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setCardDetailsModal(true)} />
            </>

        default:
            return null;
    }
}


