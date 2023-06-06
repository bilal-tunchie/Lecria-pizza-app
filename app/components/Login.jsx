"use client"

import 'react-telephone-input/css/default.css'

import { useState, useEffect } from 'react'
import Image from "next/image"
import ReactTelInput  from "react-telephone-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../context/StateContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import logo  from "@public/images/logo.png";
import flags  from "@public/images/flags.png";

export default function Login() {

    const { authentication, setAuthentication, customOrderContainer, setLoading, setDisplayCart } = useStateContext();
    const [login, setLogin] = useState('تسجيل الدخول');
    
    useEffect( () => {
        localStorage.setItem('authentication', JSON.stringify(authentication))
    } , [authentication])
    
    useEffect( () => {
        setDisplayCart(false)
        customOrderContainer.current.classList.remove('pop-up')
    } , [])

    const phoneLogin = "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/images/phoneLogin.svg"

    return (
        <div className='login-page'>
            <div className='sign-in-out'>
                <Image src={phoneLogin} alt="login" width={100} height={100} />
                <div className='links'>
                    <span 
                        onClick={ (e) => setLogin(e.target.innerText)} 
                        className={ login === 'تسجيل الدخول' ? 'active' : '' } 
                    >
                        تسجيل الدخول
                    </span>
                    <span 
                        onClick={ (e) => setLogin(e.target.innerText)} 
                        className={ login === 'ما عندك حساب؟ سجل معنا' ? 'active' : '' } 
                    >
                        ما عندك حساب؟ سجل معنا
                    </span>
                </div>
                <div>
                    {login === 'تسجيل الدخول' ? 
                    <SignIn 
                        authentication={authentication}  
                        setLoading={setLoading} 
                    /> 
                    :
                    <Register 
                        authentication={authentication} 
                        setAuthentication={setAuthentication} 
                        setLoading={setLoading} 
                    />}
                </div>
            </div>
            <div className='image'>
                <Image src={logo} alt="Login" width={500} height={500} />
            </div>
        </div>
    )
}


function Register({ authentication, setAuthentication, setLoading }) {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const SignupSchema = Yup.object().shape({
        phone: Yup.string()
        .matches(/^(\+966|00966|966|\+0966|00966|0)?5[0-9]{8}$|^(\+965|00965|965|\+0965|00965|0)?[569][0-9]{7}$|^(\+971|00971|971|\+0971|00971|0)?5[024568][0-9]{7}$|^(\+974|00974|974|\+0974|00974|0)?[3567][0-9]{7}$/, 'Must be a valid phone number from Saudi Arabia, Kuwait, UAE, or Qatar')
        .required('Phone is required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Too short min 8 character').required('Required').max(15, 'max 15 character'),
    });

    const submit = values => {

        const { email, phone } = authentication
        
        if(email?.toLowerCase() !== values.email.toLowerCase() || phone !== values.phone) {
            setAuthentication(values)
            setLoading(true)
            toast.success('قمت بالتسجيل بنجاح')
            setTimeout(()=> {
                window.location.pathname !== '/login' ? 
                window.location.href = window.location.pathname : window.location.href = "/"
                setLoading(false)
            }, 2500)
        } else {
            toast.error("حساب مستخدم")
        }
    }

    const formik = useFormik({
        initialValues: {
            phone: '',
            email: '',
            password: ''
        },
        validationSchema: SignupSchema,
        onSubmit: submit
    });
    
    const inputProps = {
        autoFocus: true,
        maxLength: 15,
        minLength: 9,
        placeholder: '+966512345678',
        onChange:formik.handleChange,
        onBlur:formik.handleBlur,
        ...formik.getFieldProps('phone'),
        pattern: "[0-9]+"
    }

    const onlyCountries = [
        {
            name: "Saudi Arabia (العربية السعودية)", 
            iso2: "sa", 
            dialCode: "966", 
            priority: 0, 
            format: "+...-...-...-..."
        },
        {name: "Kuwait (الكويت)", iso2: "kw", dialCode: "971", priority: 0, format: "+...-.-...-...."},
        {name: "Qatar (قطر)", iso2: "qa", dialCode: "974", priority: 0, format: "+...-....-...."},
        {name: "United Arab Emirates (الامارات العربية المتحدة)", iso2: "ae", dialCode: "971", priority: 0, format: "+...-.-...-...."},
    ]

    return (
        <div className='form'>
            <h3>إنشاء حساب جديد</h3>
            <form onSubmit={formik.handleSubmit} >
                <ReactTelInput
                    defaultCountry="sa"
                    flagsImagePath={flags}
                    classNames='tele-input'
                    inputProps={inputProps}
                    onlyCountries={onlyCountries}
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className='handle-input-error'>{formik.errors.phone}</div>
                ) : null}
                <input 
                    type="email" 
                    placeholder='البريد الالكتروني' 
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className='handle-input-error'>{formik.errors.email}</div>
                ) : null}
                <div className='password'>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password" 
                        placeholder='الرقم السري'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength='16'
                        {...formik.getFieldProps('password')}
                    />
                    <span onClick={toggleShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <div className='handle-input-error' >{formik.errors.password}</div>
                ) : null}
                <button type="submit">تسجيل</button>
            </form>
        </div>
    )
}

function SignIn({ authentication, setLoading }) {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = values => {
        const { email, password } = authentication
        
        if(email?.toLowerCase() === values?.email.toLowerCase() && password === values?.password) {
            console.log(email?.toLowerCase(), values.email.toLowerCase(), password, values?.password)
            setLoading(true)
            toast.success('قمت بالتسجيل بنجاح')
            setTimeout(()=> {
                window.location.href = "/";
                setLoading(false)
            }, 1500)
        } else {
            console.log(email?.toLowerCase() === values.email.toLowerCase(), password === values?.password)
            toast.error("حساب عير صحيح")
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: onSubmit
    });

    return (
        <div className='form'>
            <h3>ادخل معلوماتك</h3>
            <form onSubmit={formik.handleSubmit}>
                <input
                type='email'
                placeholder='البريد الالكتروني'
                autoComplete='email'
                {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                <div className='handle-input-error' >{formik.errors.email}</div>
                ) : null}
                <div className='password'>
                    <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='الرقم السري'
                    {...formik.getFieldProps('password')}
                    />
                    <span onClick={toggleShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                <div className='handle-input-error' >{formik.errors.password}</div>
                ) : null}
                <button type='submit'>ارسال</button>
            </form>
        </div>
    );
}

