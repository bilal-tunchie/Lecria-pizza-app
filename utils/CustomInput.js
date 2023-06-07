"use client"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCreditCard, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik';
import CardValidator from 'card-validator';
import Image from "next/image"
import * as Yup from 'yup';
import { Box, Modal, TextField, Button, Select, MenuItem, InputAdornment } from '@mui/material';
import visa from "@public/images/visa.svg";
import master_card from "@public/images/master_card.svg";
import mada from "@public/images/mada.svg";


export function EditName({open, setOpen, profileData, setProfileData,}){

    const { details } = profileData
    const [value, setValue] = useState(details[0].ans);

    const onSave = () => {
        if (value.trim() !== '') {

            setProfileData(prev => {

                const updatedOtherDetails = details.map((detail) => {
                    if (detail.que === 'الاسم') {
                        return {
                            ...detail,
                            ans: value,
                        };
                    }
                    return detail;
                });
    
                return {
                    ...prev,
                    details: updatedOtherDetails,
                };
            })
            setOpen(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='dough-image edit' >
                <h3 className='txt-c'>الاسم</h3>
                <TextField 
                    id="standard-basic" 
                    label="الاسم" 
                    variant="standard"
                    defaultValue={value}
                    helperText={value.length ?  null : "الاسم مطلوب."}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    onClick={onSave}
                    sx={{fontSize: '15px'}} 
                >حفظ</Button>
            </Box>
        </Modal>
    )
}

export function EditPhoneEmail({ phoneEmailModal, setPhoneEmailModal, setAuthentication, email, phone, setProfileData }){

    const PHONE_REGEX = /^(\+966|00966|966|\+0966|00966|0)?5[0-9]{8}$|^(\+965|00965|965|\+0965|00965|0)?[569][0-9]{7}$|^(\+971|00971|971|\+0971|00971|0)?5[024568][0-9]{7}$|^(\+974|00974|974|\+0974|00974|0)?[3567][0-9]{7}$/;

    const SignupSchema = Yup.object().shape({
        phone: Yup.string()
        .matches(PHONE_REGEX, 'يجب أن يكون رقم هاتف صالحًا من المملكة العربية السعودية أو الكويت أو الإمارات العربية المتحدة أو قطر.')
        .required('الهاتف مطلوب'),

        email: Yup.string().email('بريد إلكتروني خاطئ').required('مطلوب'),
    });

    const formik = useFormik({
        initialValues: {
            email: email,
            phone: phone,
        },
        validationSchema: SignupSchema,
        onSubmit: values => {

            setAuthentication(prev => ({
                ...prev,
                phone: values.phone, 
                email: values.email,
            }))

            setProfileData(prevData => ({
                ...prevData,
                details: prevData.details.map(detail => {
                    if (detail.que === 'رقم الجوال') {
                        return { ...detail, ans: values.phone };
                    } else if (detail.que === 'البريد الالكتروني') {
                        return { ...detail, ans: values.email };
                    }
                    return detail;
                })
            }));

            setPhoneEmailModal(false)
        }
    });
    
    return (
        <Modal
            open={phoneEmailModal}
            onClose={() => setPhoneEmailModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='dough-image edit edit-auth' >
                <h4 className='txt-c'>البريد الالكتروني و رقم الجوال</h4>
                <form onSubmit={formik.handleSubmit} >
                    <TextField
                        label="البريد الالكتروني"
                        type="email"
                        variant="standard"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="رقم الجوال"
                        type="tel"
                        variant="standard"
                        autoComplete="tel"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps('phone')}
                        pattern= "[0-9]+"
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <Button 
                        variant="contained" 
                        type="submit" 
                        sx={{fontSize: '15px'}} 
                    >حفظ</Button>
                </form>
            </Box>
        </Modal>
    )
}

export function EditPassword({ passwordModal, setPasswordModal, setAuthentication, password, setProfileData }){

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    
    const handleToggleOldPassword = () => {
        setShowOldPassword(prev => !prev);
    };

    const handleToggleNewPassword = () => {
        setShowNewPassword(prev => !prev);
    };
    

    const SignupSchema = Yup.object().shape({

        newPassword: Yup.string()
        .min(8, 'قصير جدًا على الأقل 8 أحرف')
        .required('مطلوب')
        .max(15, '15 حرفًا كحد أقصى')
        .test('passwords-match', 'يجب ألا تكون نفس كلمة المرور القديمة ', function (value) {
            return value !== password.toString();
        }),

        oldPassword: Yup.string()
        .min(8, 'قصير جدًا على الأقل 8 أحرف')
        .required('مطلوب')
        .max(15, '15 حرفًا كحد أقصى')
        .test('passwords-match', 'كلمة المرور القديمة غير صحيحة', function (value) {
            return value === password.toString();
        }),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            oldPassword: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            setAuthentication(prev => ({
                ...prev, 
                password: values.newPassword,
            }))

            setProfileData(prevData => ({
                ...prevData,
                details: prevData.details.map(detail => {
                    if (detail.que === 'كلمة المرور') {
                        return { ...detail, ans: values.newPassword };
                    } 

                    return detail;
                })
            }));

            setPasswordModal(false)
        }
    });

    return (
        <Modal
            open={passwordModal}
            onClose={() => setPasswordModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='dough-image edit edit-auth edit_password' >
                <h3 className='txt-c'>كلمة المرور </h3>
                <form onSubmit={formik.handleSubmit} >
                    <div>
                    <TextField
                        label="كلمة المرور السابقة"
                        type={showOldPassword ? "text" : "password"}
                        variant="standard"
                        autoComplete="current-password" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps('oldPassword')}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FontAwesomeIcon 
                                        className='cursor-p'
                                        onClick={handleToggleOldPassword}
                                        icon={showOldPassword ? faEyeSlash : faEye} 
                                        size="sm"
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="كلمة المرور"
                        type={showNewPassword ? "text" : "password"}
                        variant="standard"
                        autoComplete="current-password" 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...formik.getFieldProps('newPassword')}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FontAwesomeIcon 
                                        className='cursor-p'
                                        onClick={handleToggleNewPassword}
                                        icon={showNewPassword ? faEyeSlash : faEye} 
                                        size="sm"
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    </div>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        sx={{fontSize: '16px'}} 
                    >حفظ</Button>
                </form>
            </Box>
        </Modal>
    )
}

export function ContactLanguage({ profileData, setProfileData }){

    const { otherDetails } = profileData

    const handleChange = (e) =>  {
        setProfileData(prev => {

            const updatedOtherDetails = otherDetails.map((detail) => {
                if (detail.que === 'لغة التواصل') {
                    return {
                        ...detail,
                        ans: e.target.value,
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
    
    return <div className='contact-language'>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={otherDetails[2].ans}
            onChange={(e) => handleChange(e)}
            >
            <MenuItem value={'العربية'}>العربية</MenuItem>
            <MenuItem value={'English'}>English</MenuItem>
        </Select>
    </div>
}

export function EditCardDetails({ cardDetailsModal, setCardDetailsModal, setProfileData }){

    const [cardTypeImage, setCardTypeImage] = useState(faCreditCard);

    const validationSchema = Yup.object().shape({
        card_holderName: Yup.string()
        .required('اسم حامل البطاقة مطلوب'),

        card_number: Yup.string()
        .required('رقم البطاقة مطلوب')
        .test('valid-card-number', 'رقم البطاقة غير صالحة', value => CardValidator.number(value).isValid),

        CVC: Yup.string()
        .required('رمز التحقق من البطاقة (CVC) مطلوب')
        .test('valid-cvc', 'رمز التحقق من البطاقة (CVC) غير صالح', value => CardValidator.cvv(value).isValid),

        card_exp_month: Yup.string()
        .required('مطلوب شهر انتهاء الصلاحية')
        .test('valid-expiry-month', 'شهر انتهاء الصلاحية غير صالح', value => CardValidator.expirationMonth(value).isValid),

        card_exp_year: Yup.string()
        .required('مطلوب سنة انتهاء الصلاحية')
        .test('valid-expiry-year', 'سنة انتهاء غير صالحة', value => CardValidator.expirationYear(value).isValid),
    });

    const onSubmit = values => {
        const { card_holderName, card_number, CVC, card_exp_month, card_exp_year} = values
        const cardType = CardValidator.number(card_number).card.type;

        function cardNumberDisplay(){

            if (card_number !== '') {
                const cardNumber = card_number;
                const lastFourDigits = cardNumber.slice(-4);
                const maskedNumber = cardNumber.slice(0, -4).replace(/\d/g, 'X'); 
                const formattedNumber = `${maskedNumber}${lastFourDigits}`;
                return `${cardType} | ${formattedNumber}` 
            }
            return ''
        }

        setProfileData(prev => {
            const updatedOtherDetails = prev.otherDetails.map((detail) => {
                if (detail.que === 'بطاقات الائتمانية') {
                    return {
                        ...detail,
                        ans: cardNumberDisplay(),
                    };
                }
                return detail;
            });
            return {
                ...prev,
                card : {
                    cardType: cardType,
                    card_holderName: card_holderName,
                    card_number: card_number,
                    CVC: CVC,
                    card_exp_month: card_exp_month,
                    card_exp_year: card_exp_year,
                },
                otherDetails: updatedOtherDetails
            }
        })

        setCardDetailsModal(false)
    }

    const formik = useFormik({
        initialValues: {
            card_holderName: '',
            card_number: '',
            CVC: '',
            card_exp_month: '',
            card_exp_year: '',
        },
        validationSchema,
        onSubmit: onSubmit,
    });

    const formatCardNumber = (value) => {

        const formattedValue = value.replace(/\D/g, '');

        const parts = [];
        for (let i = 0; i < formattedValue.length; i += 4) {
            parts.push(formattedValue.substring(i, i + 4));
        }

        return parts.join(' ');
    };

    function cardType(card_type) {
        switch(card_type) {
            case 'visa':
                setCardTypeImage(visa)
                break;
            case 'mastercard':
                setCardTypeImage(master_card)
                break;
            case 'mada':
                setCardTypeImage(mada)
                break;

            default:
                setCardTypeImage(faCreditCard)
        }
    }

    const handleChange = (event) => {

        const { value } = event.target;
        const formattedValue = formatCardNumber(value);
        
        formik.setFieldValue('card_number', formattedValue);

        const validation = CardValidator.number(value);
        cardType(validation.card.type); 
    };

    return (
        <Modal
            open={cardDetailsModal}
            onClose={() => setCardDetailsModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='dough-image card-datials edit-auth' >
                <h3 className='txt-c mb-20'>  خيارات الدفع المتاحة </h3>
                <div className='payment-options'>
                    {[visa, master_card, mada].map( (option, i) => {
                        return <Image src={option} alt={option} key={i}/>
                    })}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="card_holderName"
                        name="اسم حامل البطاقة"
                        label="اسم حامل البطاقة"
                        value={formik.values.card_holderName}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('card_holderName')}
                        error={formik.touched.card_holderName && Boolean(formik.errors.card_holderName)}
                        helperText={formik.touched.card_holderName && formik.errors.card_holderName}
                        inputProps={{ autoComplete: 'off' }}
                    />
                    <div className='card-number-container'>
                        <TextField
                            fullWidth
                            id="card_number"
                            name="رقم البطاقة"
                            label="رقم البطاقة"
                            value={formik.values.card_number}
                            onChange={(e) => handleChange(e)}
                            onBlur={formik.handleBlur}
                            error={formik.touched.card_number && Boolean(formik.errors.card_number)}
                            helperText={formik.touched.card_number && formik.errors.card_number}
                            inputProps={{ maxLength: 19, autoComplete: 'off' }}
                        />
                        <div className='card-type'>
                            <div>
                                {cardTypeImage === faCreditCard 
                                ? <FontAwesomeIcon icon={faCreditCard} flip size='2xl'/> 
                                : 
                                <Image src={cardTypeImage} alt={cardTypeImage} width="70"  />}
                            </div>
                        </div>
                    </div>
                    <div>
                    <TextField
                        fullWidth
                        id="CVC"
                        name="رمز التحقق (CVV)"
                        label="رمز التحقق (CVV)"
                        value={formik.values.CVC}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('CVC')}
                        error={formik.touched.CVC && Boolean(formik.errors.CVC)}
                        helperText={formik.touched.CVC && formik.errors.CVC}
                        inputProps={{ maxLength: 3, autoComplete: 'off' }}
                    />
                    <TextField
                        fullWidth
                        id="card_exp_month"
                        name=" الشهر"
                        label=" الشهر"
                        value={formik.values.card_exp_month}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('card_exp_month')}
                        error={formik.touched.card_exp_month && Boolean(formik.errors.card_exp_month)}
                        helperText={formik.touched.card_exp_month && formik.errors.card_exp_month}
                        inputProps={{ maxLength: 2, autoComplete: 'off' }}
                    />
                    <TextField
                        fullWidth
                        id="card_exp_year"
                        name="السنة"
                        label="السنة"
                        value={formik.values.card_exp_year}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('card_exp_year')}
                        error={formik.touched.card_exp_year && Boolean(formik.errors.card_exp_year)}
                        helperText={formik.touched.card_exp_year && formik.errors.card_exp_year}
                        inputProps={{ maxLength: 2, autoComplete: 'off' }}
                        />
                    </div>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        sx={{fontSize: '16px'}} 
                    >حفظ</Button>
                </form>
            </Box>
        </Modal>
    );
};